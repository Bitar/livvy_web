import {Cart} from "../models/layout/Cart.ts";
import {createContext, Dispatch, SetStateAction, useContext} from "react";

interface CartProps {
    cart: Cart,
    setCart: Dispatch<SetStateAction<Cart>>,
    isCartOpen: boolean,
    setIsCartOpen: Dispatch<SetStateAction<boolean>>,
    blurContent: boolean,
    setBlurContent: Dispatch<SetStateAction<boolean>>
}

export const defaultCart : Cart = {
    items: []
}

export const CartProvider = createContext<CartProps>({
    cart: defaultCart,
    setCart: () => {
    },
    isCartOpen: false,
    setIsCartOpen: () => {},
    blurContent: false,
    setBlurContent: () => {}
})


export const useCart = () => {
    return useContext(CartProvider);
}