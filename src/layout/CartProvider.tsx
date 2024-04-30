import {Cart, CartItem} from "../models/layout/Cart.ts";
import {createContext, Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {cartObject} from "../data/cart.ts";
import {WithChildren} from "../helpers/WithChildren.ts";

interface CartProps {
    cart: Cart,
    setCart: Dispatch<SetStateAction<Cart>>,
    isCartOpen: boolean,
    setIsCartOpen: Dispatch<SetStateAction<boolean>>,
    selected: number[],
    setSelected: Dispatch<SetStateAction<number[]>>,
    addToCart: (item: CartItem) => void
}

export const defaultCart = cartObject;

const CartContext = createContext<CartProps>({
    cart: defaultCart,
    setCart: () => {
    },
    isCartOpen: false,
    setIsCartOpen: () => {
    },
    selected: [],
    setSelected: () => {
    },
    addToCart: () => {}
});

export const CartProvider: FC<WithChildren> = ({children}) => {
    const [cart, setCart] = useState<Cart>(defaultCart);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<number[]>([]);

    const addToCart = (item: CartItem) => {
        // if the item is already in cart, we need to update quantity
        // if not we need to add the item
        // we also check if section is already there or not
        const sectionIndex = cart.sections.findIndex((section) => section.id === item.section.id);

        const newCart = {...cart};

        if(sectionIndex > -1) {
            // the section exists
            // check if the item is already in the section
            const itemIndex = cart.sections[sectionIndex].items.findIndex((itm) => itm.id === item.id);

            if(itemIndex > -1) {
                // the item exists, update quantity
                newCart.sections[sectionIndex].items[itemIndex].quantity += item.quantity;
            } else {
                // the item doesn't exist
                newCart.sections[sectionIndex].items.push(item);
            }
        } else {
            // need to add section + item to it
            newCart.sections.push({
                ...item.section,
                items: [
                    item
                ]
            });
        }

        setCart(newCart);
    }

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            isCartOpen,
            setIsCartOpen,
            selected,
            setSelected,
            addToCart
        }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    return useContext(CartContext);
}