export type Cart = {
    sections: CartItemSection[]
}

export type CartItemSection = {
    id: number,
    name: string,
    items: CartItem[]
}

export type CartItem = {
    id: number,
    name: string,
    brand: string,
    price: number,
    currency: string,
    image: string,
    category: string,
    section: {
        id: number,
        name: string
    }
    quantity: number
}