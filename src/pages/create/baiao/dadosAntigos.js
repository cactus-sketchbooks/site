const initialValues = {
    name: 'Baião',
    formats: [
        {
            name: '21X21',
            id: 101,
            size: {
                width: 21,
                length: 21,
                height: 3,
                // height: 2.5,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g (112 páginas)',
                    value: 84,
                },
                {
                    name: 'Papel Marfim Liso 120g (112 páginas)',
                    value: 84,
                },
                {
                    name: 'Papel Kraft 140g (112 páginas)',
                    value: 70,
                },
                {
                    name: 'Papel Canson 140g (80 páginas)',
                    value: 84,
                },
                {
                    name: 'Papel Canson 200g (80 páginas)',
                    value: 108,
                },
                {
                    name: 'Papel Preto 180g (80 páginas)',
                    value: 97,
                },
                {
                    name: 'Papel Canson Aquarela 300g  (48 páginas)',
                    value: 132,
                },
                {
                    name: 'Papel Montval 300g (48 páginas)',
                    value: 132,
                },
                {
                    name: 'Papel Strathmore Bristol 270g (80 páginas)',
                    value: 385,
                },
                {
                    name: 'Papel Hahnemühle Expression 300g (48 páginas)',
                    value: 402,
                },
                {
                    name: 'Marfim 120g (112 págs) + Papel Vegetal',
                    value: 148,
                },
                {
                    name: 'Reciclado 120g (112 págs) + Papel Vegetal',
                    value: 148,
                },
                {
                    name: 'Kraft 140g (112 págs) + Papel Vegetal',
                    value: 134,
                },
                {
                    name: 'Canson 140g (80 pags) + Papel Vegetal',
                    value: 128,
                },
                {
                    name: 'Canson 200g (80 págs) + Papel Vegetal',
                    value: 152,
                },
                {
                    name: 'Preto 180g (80 págs) + Papel Vegetal',
                    value: 142,
                },
                {
                    name: 'Canson Aquarela 300g (48 págs) + Papel Vegetal',
                    value: 162,
                },
                {
                    name: 'Montval 300g (48 págs) + Papel Vegetal',
                    value: 162,
                },
                {
                    name: 'Papel Strathmore Bristol 270g (80 páginas) + Papel Vegetal',
                    value: 415,
                },
                {
                    name: 'Papel Hahnemühle Expression 300g (48 páginas) + Papel Vegetal',
                    value: 432,
                },
            ],
        },
        {
            name: '15X15',
            id: 102,
            size: {
                width: 15,
                length: 15,
                height: 3,
                // height: 2.5,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Reciclado Pontilhado 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Reciclado Quadriculado 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Reciclado Pautado 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Marfim Liso 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Marfim Pontilhado 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Marfim Quadriculado 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Marfim Pautado 120g (112 páginas)',
                    value: 48,
                },
                {
                    name: 'Papel Kraft 140g (112 páginas)',
                    value: 45,
                },
                {
                    name: 'Papel Canson 140g (80 páginas)',
                    value: 52,
                },
                {
                    name: 'Papel Canson 200g (80 páginas)',
                    value: 63,
                },
                {
                    name: 'Papel Preto 180g (80 páginas)',
                    value: 62,
                },
                {
                    name: 'Papel Canson Aquarela 300g  (48 páginas)',
                    value: 78,
                },
                {
                    name: 'Papel Montval 300g (48 páginas)',
                    value: 78,
                },
                {
                    name: 'Papel Strathmore Bristol 270g (80 páginas)',
                    value: 250,
                },
                {
                    name: 'Papel Hahnemühle Expression 300g (48 páginas)',
                    value: 250,
                },
                {
                    name: 'Marfim 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Marfim Pontilhado 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Marfim Quadriculado 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Marfim Pautado 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Reciclado 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Reciclado Pontilhado 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Reciclado Pautado 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Reciclado Quadriculado 120g (112 págs) + Papel Vegetal',
                    value: 80,
                },
                {
                    name: 'Kraft 140g (112 págs) + Papel Vegetal',
                    value: 77,
                },
                {
                    name: 'Canson 140g (80 pags) + Papel Vegetal',
                    value: 84,
                },
                {
                    name: 'Canson 200g (80 págs) + Papel Vegetal',
                    value: 85,
                },
                {
                    name: 'Preto 180g (80 págs) + Papel Vegetal',
                    value: 84,
                },
                {
                    name: 'Canson Aquarela 300g (48 págs) + Papel Vegetal',
                    value: 93,
                },
                {
                    name: 'Montval 300g (48 págs) + Papel Vegetal',
                    value: 93,
                },
                {
                    name: 'Papel Strathmore Bristol 270g (80 páginas) + Papel Vegetal',
                    value: 272,
                },
                {
                    name: 'Papel Hahnemühle Expression 300g (48 páginas) + Papel Vegetal',
                    value: 265,
                },
            ],
        },
        {
            name: '10X10',
            id: 103,
            size: {
                width: 10,
                length: 10,
                height: 3,
                // height: 2.5,
                weight: 0.5,
            },
            types: [
                {
                    name: 'Papel Reciclado Liso 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Reciclado Pontilhado 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Reciclado Quadriculado 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Reciclado Pautado 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Marfim Liso 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Marfim Pontilhado 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Marfim Quadriculado 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Marfim Pautado 120g (112 páginas)',
                    value: 32,
                },
                {
                    name: 'Papel Kraft 140g (112 páginas)',
                    value: 30,
                },
                {
                    name: 'Papel Canson 140g (80 páginas)',
                    value: 35,
                },
                {
                    name: 'Papel Canson 200g (80 páginas)',
                    value: 40,
                },
                {
                    name: 'Papel Preto 180g (80 páginas)',
                    value: 38,
                },
                {
                    name: 'Papel Canson Aquarela 300g  (48 páginas)',
                    value: 45,
                },
                {
                    name: 'Papel Montval 300g (48 páginas)',
                    value: 45,
                },
                {
                    name: 'Papel Strathmore Bristol 270g (80 páginas)',
                    value: 125,
                },
                {
                    name: 'Papel Hahnemühle Expression 300g (48 páginas)',
                    value: 125,
                },
                {
                    name: 'Marfim 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Marfim Pontilhado 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Marfim Quadriculado 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Marfim Pautado 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Reciclado 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Reciclado Pontilhado 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Reciclado Pautado 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Reciclado Quadriculado 120g (112 págs) + Papel Vegetal',
                    value: 48,
                },
                {
                    name: 'Kraft 140g (112 págs) + Papel Vegetal',
                    value: 46,
                },
                {
                    name: 'Canson 140g (80 pags) + Papel Vegetal',
                    value: 46,
                },
                {
                    name: 'Canson 200g (80 págs) + Papel Vegetal',
                    value: 52,
                },
                {
                    name: 'Preto 180g (80 págs) + Papel Vegetal',
                    value: 49,
                },
                {
                    name: 'Canson Aquarela 300g (48 págs) + Papel Vegetal',
                    value: 53,
                },
                {
                    name: 'Montval 300g (48 págs) + Papel Vegetal',
                    value: 53,
                },
                {
                    name: 'Papel Strathmore Bristol 270g (80 páginas) + Papel Vegetal',
                    value: 136,
                },
                {
                    name: 'Papel Hahnemühle Expression 300g (48 páginas) + Papel Vegetal',
                    value: 133,
                },
            ],
        },
    ],
};

export default initialValues;
