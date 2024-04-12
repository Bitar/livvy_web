export type Cart = {
    items: CartItem[]
}

export type CartItemSection = {
    id: number,
    name: string
}

export type CartItem = {
    id: number,
    name: string,
    brand: string,
    price: string,
    category: CartItemSection,
    quantity: number
}