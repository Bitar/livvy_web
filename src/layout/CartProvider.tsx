import {Cart} from "../models/layout/Cart.ts";
import {createContext, Dispatch, SetStateAction, useContext} from "react";
import {cartObject} from "../data/cart.ts";

interface CartProps {
    cart: Cart,
    setCart: Dispatch<SetStateAction<Cart>>,
    isCartOpen: boolean,
    setIsCartOpen: Dispatch<SetStateAction<boolean>>,
    blurContent: boolean,
    setBlurContent: Dispatch<SetStateAction<boolean>>,
    selected: number[],
    setSelected: Dispatch<SetStateAction<number[]>>
}

export const defaultCart = cartObject;

export const CartProvider = createContext<CartProps>({
    cart: defaultCart,
    setCart: () => {
    },
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    blurContent: false,
    setBlurContent: () => {
    },
    selected: [],
    setSelected: () => {
    }
})


export const useCart = () => {
    return useContext(CartProvider);
}