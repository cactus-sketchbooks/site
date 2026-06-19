import React, { useState, useEffect, useCallback } from 'react';
import './style.scss';

import firebase from 'firebase/app';
import 'firebase/database';

import firebaseConfig from '../../../FirebaseConfig.js';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Lista global de todos os formatos possíveis somando todos os produtos
const todosTamanhosPossiveis = [
    'A4',
    'A5',
    'A6',
    'A7',
    '5X15',
    '10X10',
    '14X14',
    '15X15',
    '20X20',
    '21X21',
    'Colegial',
];

const papeis_miolo_disponíveis = [
    { value: 'sertao', name: 'Sertão' },
    { value: 'baiao', name: 'Baião' },
    { value: 'carcara', name: 'Carcará' },
    { value: 'mandacaru', name: 'Mandacaru' },
    { value: 'facheiro', name: 'Facheiro' },
];

const formInicial = {
    name: '',
    active: true,
    prices: todosTamanhosPossiveis.reduce(
        (acc, tamanho) => ({ ...acc, [tamanho]: '' }),
        {}
    ),
};

const ManageInnerPaper = () => {
    // Estado para saber qual produto será gerenciado
    const [produtoSelecionado, setProdutoSelecionado] = useState('sertao');
    const [papeis, setPapeis] = useState({});
    const [form, setForm] = useState(formInicial);
    const [editandoId, setEditandoId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Busca os dados dependendo do produto selecionado (sertao, mandacaru, etc.)
    const carregarPapeis = useCallback(async () => {
        setLoading(true);
        try {
            const snapshot = await firebase
                .database()
                .ref(`innerPaper/${produtoSelecionado}`)
                .once('value');
            if (snapshot.exists()) {
                setPapeis(snapshot.val());
            } else {
                setPapeis({}); // Se o produto for novo ou não tiver papéis ainda
            }
        } catch (error) {
            console.error(
                `Erro ao buscar papéis de ${produtoSelecionado}:`,
                error
            );
        } finally {
            setLoading(false);
        }
    }, [produtoSelecionado]);

    useEffect(() => {
        carregarPapeis();
        // Sempre que mudar de produto, limpa o formulário de edição por segurança
        setForm(formInicial);
        setEditandoId(null);
    }, [produtoSelecionado, carregarPapeis]);

    // CREATE / UPDATE
    const salvarPapel = async (e) => {
        e.preventDefault();

        // Gera o ID baseado no nome digitado (ex: "Papel Teste 150g" -> "papel_teste_150g")
        const id =
            editandoId ||
            form.name
                .toLowerCase()
                .replace(/ /g, '_')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');

        try {
            const precosLimpos = {};

            // A MÁGICA ACONTECE AQUI:
            // Em vez de depender do 'todosTamanhosPossiveis', nós pegamos
            // absolutamente TUDO que estiver dentro do estado do formulário.
            Object.entries(form.prices).forEach(([tamanho, preco]) => {
                if (preco !== '' && preco !== null && preco !== undefined) {
                    precosLimpos[tamanho] = Number(preco);
                }
            });

            const dadosParaSalvar = {
                name: form.name,
                active: form.active,
                prices: precosLimpos,
            };

            // O uso do .set() aqui está corretíssimo, pois ele vai sobrescrever
            // o nó antigo inteiro com o nosso novo 'dadosParaSalvar', deletando o lixo.
            await firebase
                .database()
                .ref(`innerPaper/${produtoSelecionado}/${id}`)
                .set(dadosParaSalvar);

            setForm(formInicial);
            setEditandoId(null);
            carregarPapeis();

            alert(
                `Papel salvo com sucesso no modelo ${produtoSelecionado.toUpperCase()}!`
            );
        } catch (error) {
            console.error('Erro ao salvar:', error);
            alert('Erro ao salvar o papel.');
        }
    };

    const handlePrecoChange = (tamanho, valor) => {
        setForm((prevForm) => ({
            ...prevForm,
            prices: { ...prevForm.prices, [tamanho]: valor },
        }));
    };

    const editarPapel = (id, dados) => {
        setEditandoId(id);

        // Mapeia os preços vindos do banco para o formato do formulário
        const precosFormulario = {};
        todosTamanhosPossiveis.forEach((t) => {
            precosFormulario[t] =
                dados.prices && dados.prices[t] !== undefined
                    ? dados.prices[t]
                    : '';
        });

        setForm({
            name: dados.name,
            active: dados.active,
            prices: precosFormulario,
        });
    };

    const excluirPapel = async (id, nomeDoPapel) => {
        const confirmacao = window.confirm(
            `Tem certeza que deseja excluir definitivamente o papel "${nomeDoPapel}"?`
        );

        if (confirmacao) {
            try {
                // Exclui do banco de dados
                await firebase
                    .database()
                    .ref(`innerPaper/${produtoSelecionado}/${id}`)
                    .remove();

                alert('Papel excluído com sucesso!');

                setPapeis((papeisAtuais) => {
                    const novaLista = { ...papeisAtuais }; // Cria uma cópia da lista atual
                    delete novaLista[id]; // Deleta o papel específico da cópia
                    return novaLista; // Entrega a lista nova pro React, forçando a tela a atualizar
                });

                // limpa o formulário se o item excluído for o mesmo que estava sendo editado
                if (editandoId === id) {
                    setEditandoId(null);
                    setForm(formInicial);
                }
            } catch (error) {
                console.error('Erro ao excluir papel:', error);
            }
        }
    };

    // SOFT DELETE (Ativar / Desativar)
    const alternarStatus = async (id, statusAtual) => {
        try {
            await firebase
                .database()
                .ref(`innerPaper/${produtoSelecionado}/${id}`)
                .update({ active: !statusAtual });
            carregarPapeis();
        } catch (error) {
            console.error('Erro ao alterar status:', error);
        }
    };

    return (
        <div className='crud-container'>
            <div className='crud-header'>
                <h2 className='crud-title'>Gerenciar Papéis de Miolo</h2>

                {/* SELECT COMPONENTE: O coração da dinâmica multi-produtos */}
                <div className='select-product-group'>
                    <label htmlFor='product-select'>
                        Selecione o Modelo de Produto:
                    </label>
                    <select
                        id='product-select'
                        value={produtoSelecionado}
                        onChange={(e) => setProdutoSelecionado(e.target.value)}
                    >
                        {papeis_miolo_disponíveis.map((papel) => {
                            return (
                                <option value={papel.value}>
                                    {papel.name}
                                </option>
                            );
                        })}
                        {/* Você pode adicionar novos modelos aqui direto, ex: <option value="caatinga">Caatinga</option> */}
                    </select>
                </div>
            </div>

            {/* FORMULÁRIO */}
            <form className='crud-form' onSubmit={salvarPapel}>
                <h3 className='form-subtitle'>
                    {editandoId
                        ? `Editando papel em [${produtoSelecionado.toUpperCase()}]`
                        : `Novo papel para [${produtoSelecionado.toUpperCase()}]`}
                </h3>

                <div className='input-group'>
                    <label>Nome do Papel</label>
                    <input
                        type='text'
                        required
                        value={form.name}
                        onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                        }
                        placeholder='Ex: Papel Reciclado Liso 150g'
                    />
                </div>

                <p className='prices-tip'>
                    Preencha os valores apenas para os tamanhos que este papel
                    possui:
                </p>
                <div className='prices-grid'>
                    {todosTamanhosPossiveis.map((tamanho) => (
                        <div key={tamanho} className='input-group minor'>
                            <label>{tamanho} (R$)</label>
                            <input
                                type='number'
                                min='0'
                                step='any'
                                value={form.prices[tamanho]}
                                onChange={(e) =>
                                    handlePrecoChange(tamanho, e.target.value)
                                }
                                placeholder='--'
                            />
                        </div>
                    ))}
                </div>

                <div className='form-actions'>
                    <button type='submit' className='btn btn-save'>
                        {editandoId ? 'Atualizar Papel' : 'Criar Papel'}
                    </button>
                    <button
                        type='button'
                        className='btn btn-secondary'
                        onClick={() => (window.location.href = '/admin')}
                    >
                        Voltar
                    </button>
                    {editandoId && (
                        <button
                            type='button'
                            className='btn btn-cancel'
                            onClick={() => {
                                setForm(formInicial);
                                setEditandoId(null);
                            }}
                        >
                            Cancelar Edição
                        </button>
                    )}
                </div>
            </form>

            <hr />

            {/* LISTA / TABELA */}
            <h3 className='table-subtitle'>
                Papéis Cadastrados no {produtoSelecionado.toUpperCase()}
            </h3>

            {loading ? (
                <p className='loading-text'>Carregando dados do banco...</p>
            ) : Object.keys(papeis).length === 0 ? (
                <p className='empty-text'>
                    Nenhum papel cadastrado para este modelo ainda.
                </p>
            ) : (
                <table className='crud-table'>
                    <thead>
                        <tr>
                            <th>Nome do Papel (ID)</th>
                            <th>Tamanhos e Preços Configurados</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(papeis).map(([id, dados]) => (
                            <tr
                                key={id}
                                className={dados.active ? '' : 'inativo'}
                            >
                                <td>
                                    <strong className='paper-name'>
                                        {dados.name}
                                    </strong>
                                    <span className='id-hint'>{id}</span>
                                </td>
                                <td>
                                    <div className='table-prices-list'>
                                        {dados.prices &&
                                            Object.entries(dados.prices).map(
                                                ([tam, preco]) => (
                                                    <span
                                                        key={tam}
                                                        className='price-tag'
                                                    >
                                                        <strong>{tam}:</strong>{' '}
                                                        R$ {preco}
                                                    </span>
                                                )
                                            )}
                                    </div>
                                </td>
                                <td>
                                    <span
                                        className={`status-badge ${
                                            dados.active
                                                ? 'ativo'
                                                : 'desativado'
                                        }`}
                                    >
                                        {dados.active ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td className='actions-cell'>
                                    <button
                                        className='btn btn-edit'
                                        onClick={() => editarPapel(id, dados)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className='btn btn-cancel'
                                        onClick={() =>
                                            excluirPapel(id, dados.name)
                                        }
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        className={`btn ${
                                            dados.active
                                                ? 'btn-danger'
                                                : 'btn-activate'
                                        }`}
                                        onClick={() =>
                                            alternarStatus(id, dados.active)
                                        }
                                    >
                                        {dados.active
                                            ? 'Desativar'
                                            : 'Reativar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageInnerPaper;
