import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Style.scss';
import '../manageModels/Style.scss';
import Header from '../../../components/header';

const ManagePappers = () => {
    const [modelos, setModelos] = useState({});
    const [modeloSelecionado, setModeloSelecionado] = useState('');

    // Estado do formulário de Papéis
    const formInicial = {
        name: '',
        active: true,
        prices: {},
        mesclaPrices: {},
    };
    const [form, setForm] = useState(formInicial);
    const [editandoId, setEditandoId] = useState(null);

    const carregarDados = async () => {
        try {
            const snapshot = await firebase
                .database()
                .ref('models')
                .once('value');
            if (snapshot.exists()) {
                const data = snapshot.val();
                setModelos(data);
                if (!modeloSelecionado) {
                    setModeloSelecionado(Object.keys(data)[0]);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    // Manipula nome e status ativo
    const handleChangeBasic = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Manipula os preços dinâmicos (Criação e Mescla)
    const handlePriceChange = (formatName, priceType, value) => {
        setForm((prev) => ({
            ...prev,
            [priceType]: {
                ...prev[priceType],
                [formatName]: Number(value),
            },
        }));
    };

    const salvarPapel = async (e) => {
        e.preventDefault();

        // Limpa preços vazios ou zerados para não sujar o banco
        const limparPrecos = (obj) => {
            const novoObj = {};
            Object.keys(obj).forEach((key) => {
                if (obj[key] > 0) novoObj[key] = obj[key];
            });
            return novoObj;
        };

        const papelProntoParaSalvar = {
            name: form.name,
            active: form.active,
            prices: limparPrecos(form.prices),
            mesclaPrices: limparPrecos(form.mesclaPrices),
        };

        const paperId =
            editandoId ||
            form.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9]/g, '_')
                .replace(/_+/g, '_')
                .replace(/^_|_$/g, '');

        try {
            await firebase
                .database()
                .ref(`models/${modeloSelecionado}/innerPapers/${paperId}`)
                .set(papelProntoParaSalvar);

            alert('Papel salvo com sucesso!');
            setForm(formInicial);
            setEditandoId(null);
            carregarDados();
        } catch (error) {
            console.error('Erro ao salvar papel:', error);
            alert('Erro ao salvar.');
        }
    };

    const editarPapel = (paperId, papelData) => {
        // Garante que os objetos de preço existam para não quebrar os inputs
        setForm({
            ...papelData,
            prices: papelData.prices || {},
            mesclaPrices: papelData.mesclaPrices || {},
        });
        setEditandoId(paperId);
    };

    const excluirPapel = async (paperId) => {
        if (
            window.confirm(
                'Tem certeza que deseja excluir este papel definitivamente?'
            )
        ) {
            try {
                await firebase
                    .database()
                    .ref(`models/${modeloSelecionado}/innerPapers/${paperId}`)
                    .remove();
                alert('Papel excluído!');
                carregarDados();
            } catch (error) {
                console.error('Erro ao excluir:', error);
            }
        }
    };

    // Pega a lista de formatos do modelo selecionado para montar os inputs de preço
    const formatosDoModelo = modelos[modeloSelecionado]?.formats
        ? Object.values(modelos[modeloSelecionado].formats)
        : [];

    return (
        <>
            <Header />
            <div className='admin-container'>
                <h2 className='admin-title'>Gerenciar Papéis (Miolo)</h2>

                <div className='selector-group'>
                    <label>Selecione o Modelo:</label>
                    <select
                        value={modeloSelecionado}
                        onChange={(e) => {
                            setModeloSelecionado(e.target.value);
                            setForm(formInicial);
                            setEditandoId(null);
                        }}
                    >
                        {Object.entries(modelos).map(([key, modelo]) => {
                            if (modelo.name == 'Buriti') return;

                            return (
                                <option key={key} value={key}>
                                    {modelo.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <hr className='divider' />

                <h3 className='admin-subtitle'>
                    {editandoId ? 'Editar Papel' : 'Adicionar Novo Papel'}
                </h3>
                <form onSubmit={salvarPapel} className='admin-form-papers'>
                    {/* Informações Básicas */}
                    <div className='paper-basic-info'>
                        <input
                            required
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChangeBasic}
                            placeholder='Nome do Papel (ex: Canson 140g)'
                        />
                        <label>
                            <input
                                type='checkbox'
                                name='active'
                                checked={form.active}
                                onChange={handleChangeBasic}
                            />
                            Papel Ativo na Loja
                        </label>
                    </div>

                    {/* Preços Dinâmicos baseados nos Formatos */}
                    {formatosDoModelo.length > 0 ? (
                        <div>
                            <h4 style={{ color: 'var(--dark-green)' }}>
                                Tabela de Preços
                            </h4>
                            <div className='price-grid'>
                                {formatosDoModelo.map((formato) => (
                                    <div
                                        key={formato.name}
                                        className='format-price-card'
                                    >
                                        <h5>Tamanho: {formato.name}</h5>
                                        <div className='price-inputs'>
                                            <label>
                                                Criação (Bloco Cheio):
                                                <input
                                                    type='number'
                                                    step='0.01'
                                                    value={
                                                        form.prices[
                                                            formato.name
                                                        ] || ''
                                                    }
                                                    onChange={(e) =>
                                                        handlePriceChange(
                                                            formato.name,
                                                            'prices',
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </label>
                                            <label>
                                                Mescla (Fração/Caderno):
                                                <input
                                                    type='number'
                                                    step='0.01'
                                                    value={
                                                        form.mesclaPrices[
                                                            formato.name
                                                        ] || ''
                                                    }
                                                    onChange={(e) =>
                                                        handlePriceChange(
                                                            formato.name,
                                                            'mesclaPrices',
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--orange)' }}>
                            Atenção: Cadastre formatos neste modelo primeiro
                            para definir os preços.
                        </p>
                    )}

                    <div className='btn-group'>
                        <button type='submit' className='btn btn-primary'>
                            {editandoId ? 'Atualizar Papel' : 'Criar Papel'}
                        </button>
                        {editandoId && (
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => {
                                    setForm(formInicial);
                                    setEditandoId(null);
                                }}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                <hr className='divider' />

                <h3 className='admin-subtitle'>
                    Papéis Cadastrados em {modelos[modeloSelecionado]?.name}
                </h3>
                <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th>Nome do Papel</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelos[modeloSelecionado]?.innerPapers ? (
                            Object.entries(
                                modelos[modeloSelecionado].innerPapers
                            ).map(([paperId, papel]) => (
                                <tr
                                    key={paperId}
                                    style={{ opacity: papel.active ? 1 : 0.5 }}
                                >
                                    <td>
                                        {papel.active
                                            ? '✅ Ativo'
                                            : '❌ Inativo'}
                                    </td>
                                    <td>{papel.name}</td>
                                    <td className='action-buttons'>
                                        <button
                                            className='btn btn-primary btn-small'
                                            onClick={() =>
                                                editarPapel(paperId, papel)
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className='btn btn-danger btn-small'
                                            onClick={() =>
                                                excluirPapel(paperId)
                                            }
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='3'>
                                    Nenhum papel cadastrado neste modelo.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ManagePappers;
