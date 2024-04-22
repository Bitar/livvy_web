import {Cart} from "../models/layout/Cart.ts";

export const cartObject: Cart = {
    sections: [
        {
            id: 1,
            name: 'Celebrity Designer',
            items: [
                {
                    id: 6,
                    name: "Celebrity Design",
                    brand: "Studio Mcgee",
                    price: 50,
                    currency: '$',
                    category: 'design',
                    quantity: 1,
                    image: '/assets/celebrities/shea-mcgee.png'
                }
            ]
        },
        {
            id: 2,
            name: 'Furniture',
            items: [
                {
                    id: 1,
                    name: "Wooden Table",
                    brand: "West Elm",
                    price: 200,
                    currency: '$',
                    category: 'table',
                    quantity: 2,
                    image: '/assets/cart/furniture-1.jpg'
                },
                {
                    id: 3,
                    name: "Arm Chair",
                    brand: "West Elm",
                    price: 198,
                    currency: '$',
                    category: 'chair',
                    quantity: 1,
                    image: '/assets/cart/furniture-3.jpg'
                },
                {
                    id: 2,
                    name: "Bespoke chair",
                    brand: "Pottery Barn",
                    price: 300,
                    currency: '$',
                    category: 'chair',
                    quantity: 1,
                    image: '/assets/cart/furniture-2.jpg'
                }
            ]
        },
        {
            id: 3,
            name: 'Decor',
            items: []
        }
    ]
}