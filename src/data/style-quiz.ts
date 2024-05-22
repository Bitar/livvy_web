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
                'text': 'Welcoming and warm'
            },
            {
                'id': 2,
                'text': 'Airy and minimal'
            },
            {
                'id': 3,
                'text': 'Unique and vintage'
            },
            {
                'id': 4,
                'text': 'Cool and modern'
            },
            {
                'id': 5,
                'text': 'Relaxing and cozy'
            },
            {
                'id': 6,
                'text': 'Glamorous and feminine'
            },
            {
                'id': 7,
                'text': 'Rustic and warm'
            }
        ]
    },
    {
        'id': 2,
        'text': 'What are the primary functions of the space?',
        'answers': [
            {
                'id': 8,
                'text': 'Relaxation'
            },
            {
                'id': 9,
                'text': 'Entertaining Guests'
            },
            {
                'id': 10,
                'text': 'Working'
            }
        ]
    },
    {
        'id': 3,
        'text': 'How often do you entertain guests, and do you need the space to cater to a specific number of people?',
        'answers': [
            {
                'id': 11,
                'text': 'Occasionally'
            },
            {
                'id': 12,
                'text': 'Frequently'
            },
            {
                'id': 13,
                'text': 'Rarely'
            }
        ]
    }
]