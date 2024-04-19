import {Cart} from "../models/layout/Cart.ts";

export const cartObject: Cart = {
    sections: [
        {
            id: 1,
            name: 'Celebrity Designer',
            items: [
                {
                    id: 2,
                    name: "Bespoke chair",
                    brand: "West Elm",
                    price: 300,
                    currency: '$',
                    category: 'chair',
                    quantity: 1,
                    image: '/assets/cart/furniture-2.jpg'
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