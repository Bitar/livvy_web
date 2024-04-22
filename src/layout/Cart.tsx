import {useEffect, useState} from "react";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import {useCart} from "./CartProvider.tsx";
import {Link} from "react-router-dom";
import {LivQuantityPicker} from "../components/form/LivQuantityPicker.tsx";
import {LivButton} from "../components/buttons/LivButton.tsx";
import {LivCheckbox} from "../components/form/LivCheckbox.tsx";
import {CartItem, CartItemSection} from "../models/layout/Cart.ts";

// interface Props {
//     isOpen: boolean,
//     setIsOpen: Dispatch<SetStateAction<boolean>>
// }

export const Cart = () => {
    const {cart} = useCart();

    const [isClosing, setIsClosing] = useState<boolean>(false);
    const {isCartOpen, setIsCartOpen, setBlurContent} = useCart();

    return (
        <div id="cart-container"
             onAnimationEnd={() => {
                 if (isClosing) {
                     setIsCartOpen(false);
                     setIsClosing(false);
                 }
             }}
             className={clsx("liv-side-panel fixed z-50 right-0 top-0 w-full md:w-2/5 sm:w-3/4 h-full bg-white animate__animated", {
                 "animate__slideInRight": !isClosing,
                 "animate__slideOutRight": isClosing,
                 "hidden": !isCartOpen
             })}>

            <div id="cart-header" className="p-10 flex justify-between items-center border-b border-b-black">
                <div>
                    <h6 className="uppercase text-black text-4xl mb-2.5">your cart</h6>
                    <button className="text-sm uppercase underline">select all</button>
                </div>

                <button onClick={() => {
                    setBlurContent(false);
                    setIsClosing(true);
                }}>
                    <img src="/assets/close.svg" alt="close icon" className="w-5 h-5"/>
                </button>
            </div>

            <div id="cart-content" className="p-10">
                {
                    cart.sections.map((cartSection: CartItemSection, idx) => {
                        if(cartSection.items.length > 0) {
                            return <CartSection section={cartSection} key={idx}/>
                        }
                    })
                }
            </div>

            <div id="cart-footer"
                 className="p-10 border-t border-t-black absolute w-full bottom-0 left-0 z-10">
                <div className="flex justify-between items-center mb-5">
                    <span className="uppercase text-xl">subtotal</span>
                    <span className="text-xl">$3,360</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                    <LivButton as={'button'} text={'add all to cart'} borderColor={'border-black'}
                               bgColor={'bg-transparent'} hasArrow={false}/>
                    <LivButton as={'button'} text={'checkout'} borderColor={'border-black'}
                               bgColor={'bg-black'} hasArrow={false} textColor={'text-white'}
                    />
                </div>
            </div>
        </div>
    )
}

const CartSection = ({section}: { section: CartItemSection }) => {
    const [isSectionOpen, setIsSectionOpen] = useState<boolean>(true);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const handleClick = () => {
        // if isSectionOpen => close it
        if (isSectionOpen) {
            setIsClosing(true);
        } else {
            // if section is closed, open it
            setIsSectionOpen(true);
        }
    }

    return (
        <div>
            <div className="flex justify-start items-center">
                <span className="uppercase text-xl text-black me-2">{section.name}</span>
                <button onClick={handleClick} type="button">
                    {
                        isSectionOpen && <FontAwesomeIcon icon={faCaretDown}/>
                    }

                    {
                        !isSectionOpen && <FontAwesomeIcon icon={faCaretUp}/>
                    }
                </button>
            </div>

            <div onAnimationEnd={() => {
                if (isClosing) {
                    setIsClosing(false);
                    setIsSectionOpen(false);
                }
            }}
                 className={clsx("animate__animated", {
                     "animate__fadeIn": !isClosing,
                     "animate__fadeOut": isClosing,
                     "hidden": !isSectionOpen
                 })}>

                {
                    section.items.map((item : CartItem, idx) => (
                        <Item item={item} key={idx}/>
                    ))
                }
            </div>
        </div>
    )
}

const Item = ({item} : {item: CartItem}) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const {cart, setCart} = useCart()

    const increment = () => {
        let newCart = cart
        console.log(newCart)

        // newCart.sections[0].items[1].quantity++

        setCart(newCart)
    }
    const decrement = () => {
        let newCart = cart
        // console.log(newCart)
        setCart(newCart)
    }

    return (
        <div className="flex justify-between items-end border-b border-b-black py-6 last:border-b-0">
            <div className="flex justify-between items-center">
                <LivCheckbox/>

                <div className="relative w-20 h-20 bg-cover bg-no-repeat bg-center ms-8"
                     style={{backgroundImage: `url('/assets/cart/furniture-1.jpg')`}}>
                    <Link to={'#'} className="absolute top-0 left-0 w-full h-full z-10"></Link>
                </div>
            </div>

            <div>
                <span className="uppercase text-xs">{item.brand}</span>
                <p className="uppercase text-lg mb-4">{item.name}</p>

                <div className="flex justify-start items-end">
                    {/*<LivQuantityPicker/>*/}

                    <div className="flex justify-start items-center">
                        <button className="w-8 h-8 relative border border-black" onClick={decrement}>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">-</span>
                        </button>
                        <input type='text'
                               className="w-8 h-8 border-t border-b border-t-black border-b-black focus-visible:outline-0 p-1 text-center text-sm"/>
                        <button className="w-8 h-8 relative border border-black">
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                                  onClick={increment}>+</span>
                        </button>
                    </div>

                    <button className="uppercase underline text-sm ms-4">remove</button>
                </div>
            </div>

            <div className="text-right">
                <div className="mb-3">
                    <span className="text-lg">{item.currency}{item.price}</span>
                </div>

                <LivButton as={'a'} url={'#'} text={'find similar item'} borderColor={'border-black'}
                           bgColor={'bg-transparent'} style={'thin'} rounded={true}/>
            </div>
        </div>
    )
}