const initalValues = {
    name: 'Sertão',
    formats: [
        {
            name: 'A4 - Retrato (20x28 cm)',
            id: 32,
            size: {
                width: 21,
                length: 29,
                height: 3,
                weight: 0.7,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g',
                    value: 24,
                },
                {
                    name: 'Papel Marfim Liso 120g',
                    value: 24,
                },
                {
                    name: 'Papel Kraft 140g',
                    value: 25,
                },
                {
                    name: 'Papel Canson 140g',
                    value: 25,
                },
                {
                    name: 'Papel Canson 200g',
                    value: 28,
                },
                {
                    name: 'Papel Preto 180g',
                    value: 26,
                },
            ],
        },
        {
            name: 'A5 - Retrato (14x20 cm)',
            id: 26,
            size: {
                width: 14,
                length: 20,
                height: 1,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g',
                    value: 12,
                },
                {
                    name: 'Papel Reciclado Pontilhado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Reciclado Quadriculado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Reciclado Pautado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Marfim Liso 120g',
                    value: 12,
                },
                {
                    name: 'Papel Marfim Pontilhado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Marfim Quadriculado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Marfim Pautado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Kraft 140g',
                    value: 14,
                },
                {
                    name: 'Papel Canson 140g',
                    value: 14,
                },
                {
                    name: 'Papel Canson 200g',
                    value: 14,
                },
                {
                    name: 'Papel Preto 180g',
                    value: 14,
                },
            ],
        },
        {
            name: 'A6 - Retrato (10x14 cm)',
            id: 27,
            size: {
                // width: 9.5,
                width: 10,
                length: 14,
                height: 1,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g',
                    value: 8,
                },
                {
                    name: 'Papel Reciclado Pontilhado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Reciclado Quadriculado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Reciclado Pautado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Marfim Liso 120g',
                    value: 8,
                },
                {
                    name: 'Papel Marfim Pontilhado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Marfim Quadriculado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Marfim Pautado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Kraft 140g',
                    value: 10,
                },
                {
                    name: 'Papel Canson 140g',
                    value: 10,
                },
                {
                    name: 'Papel Canson 200g',
                    value: 10,
                },
                {
                    name: 'Papel Preto 180g',
                    value: 10,
                },
            ],
        },
        {
            name: '10X10',
            id: 28,
            size: {
                width: 10,
                length: 10,
                height: 1,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g',
                    value: 8,
                },
                {
                    name: 'Papel Reciclado Pontilhado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Reciclado Quadriculado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Marfim Liso 120g',
                    value: 8,
                },
                {
                    name: 'Papel Marfim Pontilhado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Marfim Quadriculado 120g',
                    value: 8,
                },
                {
                    name: 'Papel Kraft 140g',
                    value: 10,
                },
                {
                    name: 'Papel Canson 140g',
                    value: 10,
                },
                {
                    name: 'Papel Canson 200g',
                    value: 10,
                },
                {
                    name: 'Papel Preto 180g',
                    value: 10,
                },
            ],
        },
        {
            name: '14X14',
            id: 29,
            size: {
                width: 14,
                length: 14,
                height: 1,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g',
                    value: 12,
                },
                {
                    name: 'Papel Reciclado Pontilhado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Reciclado Quadriculado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Marfim Liso 120g',
                    value: 12,
                },
                {
                    name: 'Papel Marfim Pontilhado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Marfim Quadriculado 120g',
                    value: 12,
                },
                {
                    name: 'Papel Kraft 140g',
                    value: 14,
                },
                {
                    name: 'Papel Canson 140g',
                    value: 14,
                },
                {
                    name: 'Papel Canson 200g',
                    value: 14,
                },
                {
                    name: 'Papel Preto 180g',
                    value: 14,
                },
            ],
        },
        {
            name: '20X20',
            id: 33,
            size: {
                width: 20,
                length: 20,
                height: 1,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g',
                    value: 24,
                },
                {
                    name: 'Papel Marfim Liso 120g',
                    value: 24,
                },
                {
                    name: 'Papel Kraft 140g',
                    value: 25,
                },
                {
                    name: 'Papel Canson 140g',
                    value: 25,
                },
                {
                    name: 'Papel Canson 200g',
                    value: 28,
                },
                {
                    name: 'Papel Preto',
                    value: 26,
                },
            ],
        },
        {
            name: 'Colegial (17x23 cm)',
            id: 34,
            size: {
                width: 17,
                length: 23,
                height: 1,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g',
                    value: 24,
                },
                {
                    name: 'Papel Marfim Liso 120g',
                    value: 24,
                },
                {
                    name: 'Papel Kraft 140g',
                    value: 25,
                },
                {
                    name: 'Papel Canson 140g',
                    value: 25,
                },
                {
                    name: 'Papel Canson 200g',
                    value: 28,
                },
                {
                    name: 'Papel Preto 180g',
                    value: 26,
                },
            ],
        },
    ],
};
