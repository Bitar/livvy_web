export type StyleQuizQuestion = {
    id: number,
    text: string,
    answers: StyleQuizAnswer[]
}

export type StyleQuizAnswer = {
    id: number,
    text: string
}

export const questions : StyleQuizQuestion[] = [
    {
        'id': 1,
        'text': 'How do you want your space to feel?',
        'answers': [
            {
                'id': 1,
                'text': 'Classic and elegant'
            },
            {
                'id': 2,
                'text': 'Modern and minimal'
            },
            {
                'id': 3,
                'text': 'Eclectic and colorful'
            },
            {
                'id': 4,
                'text': 'Airy and minimal'
            },
            {
                'id': 5,
                'text': 'Glamorous and feminine'
            },
            {
                'id': 6,
                'text': 'Rustic and cozy'
            },
            {
                'id': 7,
                'text': 'Industrial and raw'
            },
            {
                'id': 8,
                'text': 'Beachy and natural'
            }
        ]
    },
    {
        'id': 2,
        'text': 'Which colors typically catch your eye?',
        'answers': [
            {
                'id': 8,
                'text': 'Neutral shades such as beige, cream, brown, and black'
            },
            {
                'id': 9,
                'text': 'Vibrant colors like purple, yellow, and bold jewel tones'
            },
            {
                'id': 10,
                'text': 'Deep earthy tones  like olive, caramel, and red ochre'
            },
            {
                'id': 11,
                'text': 'Pastel colors like blush pink, lavender, and baby blue'
            },
            {
                'id': 12,
                'text': 'Coastal colors like sand, seafoam, and sky blue'
            }
        ]
    },
    {
        'id': 3,
        'text': 'What kinds of decor do you typically gravitate toward?',
        'answers': [
            {
                'id': 12,
                'text': 'Sleek and minimalist pieces that use elements like metal, glass, and concrete'
            },
            {
                'id': 13,
                'text': 'Ornate, yet classic items featuring rich colors and intricate patterns'
            },
            {
                'id': 14,
                'text': 'Soft, modern elements using organic shapes  and materials'
            },
            {
                'id': 15,
                'text': 'Pieces inspired by warehouses using steels and unfinished wood'
            },
            {
                'id': 16,
                'text': 'Colorful and eclectic pieces often with patterns from around the world'
            },
            {
                'id': 17,
                'text': 'Items that feel rustic and vintage'
            }
        ]
    }
]