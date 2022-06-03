import React from 'react';

export default function PaperOption({
    tipos,
    quantidade,
    setSketchPaperInfo,
    index,
}) {
    return (
        <>
            <label htmlFor='paperSelector'>
                Selecione o Papel do Miolo {index + 1}
            </label>
            <select
                name='paperSelector'
                onChange={(e) =>
                    setSketchPaperInfo((prev) => {
                        let newArr = [...prev];
                        newArr[index] = {
                            ...prev[index],
                            nomePapel: tipos[e.target.value].name,
                            precoUnitario: tipos[e.target.value].value,
                        };
                        return newArr;
                    })
                }
                defaultValue='0'
            >
                <option value='0' disabled>
                    ({index + 1}) - Papel do miolo
                </option>
                {tipos.map((type, index) => {
                    return (
                        <option value={index} key={index}>
                            {type.name} - R$ {type.value}
                        </option>
                    );
                })}
            </select>

            <label htmlFor='paperQuantity'>
                Selecione a quantidade de blocos do Papel do Miolo {index + 1}
            </label>
            <select
                name='paperQuantity'
                onChange={(e) =>
                    setSketchPaperInfo((prev) => {
                        let newArr = [...prev];
                        newArr[index] = {
                            ...prev[index],
                            quantidade: Number(e.target.value),
                        };
                        return newArr;
                    })
                }
                defaultValue='0'
            >
                <option value='0' disabled>
                    Quantidade de Blocos{' '}
                </option>
                {[...Array(10)].map((_, i) => (
                    <option value={i + 1} key={i + 1}>
                        {`${i + 1} - ${quantidade * (i + 1)} páginas`}
                    </option>
                ))}
            </select>
            <br />
            <br />
        </>
    );
}
