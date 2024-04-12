import {useState} from "react";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import {useCart} from "./CartProvider.tsx";
import {Link} from "react-router-dom";
import {LivQuantityPicker} from "../components/form/LivQuantityPicker.tsx";
import {LivButton} from "../components/buttons/LivButton.tsx";

// interface Props {
//     isOpen: boolean,
//     setIsOpen: Dispatch<SetStateAction<boolean>>
// }

export const Cart = () => {
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const {isCartOpen, setIsCartOpen, setBlurContent} = useCart();

    return (
        <div id="cart-container"
             onAnimationEnd={() => {
                 if (isClosing) {
                     setIsCartOpen(false);
                     setIsClosing(false);
                 } else {
                     // we just opened the cart
                     setBlurContent(true);
                 }
             }}
             className={clsx("liv-side-panel fixed z-50 right-0 top-0 w-full md:w-1/2 sm:w-3/4 h-full bg-white animate__animated", {
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
                    setIsClosing(true);
                    setBlurContent(false);
                }}>
                    <img src="/assets/close.svg" alt="close icon" className="w-5 h-5"/>
                </button>
            </div>

            <div id="cart-content" className="p-10">
                <CartSection/>
            </div>

            <div id="cart-footer">
                <div></div>
            </div>

        </div>
    )
}

const CartSection = () => {
    return (
        <div>
            <div className="flex justify-start items-center">
                <span className="uppercase text-xl text-black me-2">celebrity designs</span>
                <button><FontAwesomeIcon icon={faCaretUp}/></button>
            </div>

            <div>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </div>
        </div>
    )
}

const CartItem = () => {
    return (
        <div className="flex justify-between items-end border-b border-b-black py-6 last:border-b-0">
            <div className="flex justify-between items-center">
                <input type="checkbox" className="w-4 h-4 accent-white outline outline-1"/>

                <div className="relative w-20 h-20 bg-cover bg-no-repeat bg-center ms-8"
                     style={{backgroundImage: `url('/assets/cart/furniture-1.jpg')`}}>
                    <Link to={'#'} className="absolute top-0 left-0 w-full h-full z-10"></Link>
                </div>
            </div>

            <div>
                <span className="uppercase text-xs">rove concepts</span>
                <p className="uppercase text-lg mb-4">maria coffee table</p>

                <div className="flex justify-start items-end">
                    <LivQuantityPicker/>
                    <button className="uppercase underline text-sm ms-4">remove</button>
                </div>
            </div>

            <div className="text-right">
                <div className="mb-3">
                    <span className="text-lg">$1,234</span>
                </div>

                <LivButton as={'a'} url={'#'} text={'find similar item'} borderColor={'border-black'}
                           bgColor={'bg-transparent'} style={'thin'} rounded={true}/>
            </div>
        </div>
    )
}