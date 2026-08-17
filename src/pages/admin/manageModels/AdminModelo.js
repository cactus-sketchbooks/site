import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import './Style.scss'; // Importação do arquivo de estilos
import Header from '../../../components/header';

const AdminModelos = () => {
    const [modelos, setModelos] = useState({});
    const [modeloSelecionado, setModeloSelecionado] = useState('');

    const formInicial = {
        name: '',
        basePrice: '',
        size: { width: 0, length: 0, height: 0, weight: 0 },
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
                setModelos(snapshot.val());
                if (!modeloSelecionado) {
                    setModeloSelecionado(Object.keys(snapshot.val())[0]);
                }
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['width', 'length', 'height', 'weight'].includes(name)) {
            setForm((prev) => ({
                ...prev,
                size: { ...prev.size, [name]: Number(value) },
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: name === 'basePrice' ? Number(value) : value,
            }));
        }
    };

    const salvarFormato = async (e) => {
        e.preventDefault();
        const formatId =
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
                .ref(`models/${modeloSelecionado}/formats/${formatId}`)
                .set({
                    name: form.name,
                    basePrice: form.basePrice,
                    size: form.size,
                });

            alert('Formato salvo com sucesso!');
            setForm(formInicial);
            setEditandoId(null);
            carregarDados();
        } catch (error) {
            console.error('Erro ao salvar formato:', error);
            alert('Erro ao salvar.');
        }
    };

    const editarFormato = (formatId, formatoData) => {
        setForm(formatoData);
        setEditandoId(formatId);
    };

    const excluirFormato = async (formatId) => {
        if (
            window.confirm(
                'Tem certeza que deseja excluir este formato? Isso afetará a loja.'
            )
        ) {
            try {
                await firebase
                    .database()
                    .ref(`models/${modeloSelecionado}/formats/${formatId}`)
                    .remove();

                alert('Formato excluído!');
                carregarDados();
            } catch (error) {
                console.error('Erro ao excluir:', error);
            }
        }
    };

    return (
        <>
            <Header />
            <div className='admin-container'>
                <h2 className='admin-title'>
                    Gerenciar Estrutura dos Cadernos
                </h2>

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
                        {Object.entries(modelos).map(([key, modelo]) => (
                            <option key={key} value={key}>
                                {modelo.name}
                            </option>
                        ))}
                    </select>
                </div>

                <hr className='divider' />

                <h3 className='admin-subtitle'>
                    {editandoId ? 'Editar Formato' : 'Adicionar Novo Formato'}
                </h3>
                <form onSubmit={salvarFormato} className='admin-form'>
                    <div className='form-row'>
                        <input
                            required
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder='Nome do Formato (ex: 21X21)'
                        />
                        <input
                            required
                            type='number'
                            step='0.01'
                            name='basePrice'
                            value={form.basePrice}
                            onChange={handleChange}
                            placeholder='Preço Base (R$)'
                        />
                    </div>

                    <div className='form-row'>
                        <input
                            type='number'
                            step='0.01'
                            name='width'
                            value={form.size.width || ''}
                            onChange={handleChange}
                            placeholder='Largura (cm)'
                        />
                        <input
                            type='number'
                            step='0.01'
                            name='length'
                            value={form.size.length || ''}
                            onChange={handleChange}
                            placeholder='Comprimento (cm)'
                        />
                        <input
                            type='number'
                            step='0.01'
                            name='height'
                            value={form.size.height || ''}
                            onChange={handleChange}
                            placeholder='Altura (cm)'
                        />
                        <input
                            type='number'
                            step='0.01'
                            name='weight'
                            value={form.size.weight || ''}
                            onChange={handleChange}
                            placeholder='Peso (kg)'
                        />
                    </div>

                    <div className='btn-group'>
                        <button type='submit' className='btn btn-primary'>
                            {editandoId ? 'Atualizar Formato' : 'Criar Formato'}
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
                    Formatos Cadastrados em {modelos[modeloSelecionado]?.name}
                </h3>
                <table className='admin-table'>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Preço Base</th>
                            <th>Dimensões (L x C)</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modelos[modeloSelecionado]?.formats ? (
                            Object.entries(
                                modelos[modeloSelecionado].formats
                            ).map(([formatId, formato]) => (
                                <tr key={formatId}>
                                    <td>{formato.name}</td>
                                    <td>R$ {formato.basePrice}</td>
                                    <td>
                                        {formato.size.width}x
                                        {formato.size.length} cm
                                    </td>
                                    <td className='action-buttons'>
                                        <button
                                            className='btn btn-primary btn-small'
                                            onClick={() =>
                                                editarFormato(formatId, formato)
                                            }
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className='btn btn-danger btn-small'
                                            onClick={() =>
                                                excluirFormato(formatId)
                                            }
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan='4'>
                                    Nenhum formato cadastrado neste modelo.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AdminModelos;
