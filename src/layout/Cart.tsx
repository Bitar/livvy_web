import {ChangeEvent, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";
import {useCart} from "./CartProvider.tsx";
import {Link} from "react-router-dom";
import {LivButton} from "../components/buttons/LivButton.tsx";
import {Cart as CartModel, CartItem, CartItemSection} from "../models/layout/Cart.ts";
import {useMasterLayout} from "./MasterLayoutProvider.tsx";

export const Cart = () => {
    const {cart, setCart, isCartOpen, setIsCartOpen, selected, setSelected} = useCart();
    const {setBlurContent} = useMasterLayout();
    const [subtotal, setSubtotal] = useState<number>(0);

    const [isClosing, setIsClosing] = useState<boolean>(false);
    const [cartContentHeight, setCartContentHeight] = useState<number>(0);

    const cartHeader = useRef<HTMLDivElement>(null);
    const cartFooter = useRef<HTMLDivElement>(null);

    const updateCartContentHeight = () => {
        if(cartHeader && cartFooter) {
            setCartContentHeight(window.innerHeight - (cartHeader.current?.offsetHeight + cartFooter.current?.offsetHeight));
        }
    }

    useEffect(() => {
        const handleResize = () => {
            updateCartContentHeight();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        updateCartContentHeight();
    }, [isCartOpen, cartHeader, cartFooter]);

    useEffect(() => {
        let total = 0;

        cart.sections.forEach((section) => {
            section.items.forEach((item) => {
                total += item.price;
            });
        });

        setSubtotal(total);
    }, [cart]);

    const selectAllHandler = () => {
        const tempSelected = [];

        cart.sections.forEach((section) => {
            section.items.forEach((item) => {
                tempSelected.push(item.id);
            })
        })

        setSelected(tempSelected);
    }

    const saveHandler = () => {
        setSelected([]);
    }

    const removeAllHandler = () => {
        // remove everything that is selected
        // selected contains all the item ids that we need to delete
        const newCart: CartModel = {sections: []};

        cart.sections.forEach((section: CartItemSection) => {
            const newItems = [];

            section.items.forEach((item) => {
                if (!selected.includes(item.id)) {
                    newItems.push(item);
                }
            })

            if (newItems.length > 0) {
                // remove the section
                const newSection = {...section};

                newSection.items = newItems;

                newCart.sections.push(newSection);
            }
        })

        setCart(newCart);
        setSelected([]);
    }

    return (
        <div id="cart-container"
             onAnimationEnd={() => {
                 if (isClosing) {
                     setIsCartOpen(false);
                     setIsClosing(false);
                 }
             }}
             className={clsx("liv-side-panel fixed z-50 right-0 top-0 w-full lg:w-4/5 xl:w-3/5 h-full bg-white animate__animated", {
                 "animate__slideInRight": !isClosing,
                 "animate__slideOutRight": isClosing,
                 "hidden": !isCartOpen
             })}>

            <div id="cart-header" className="p-5 flex justify-between items-center border-b border-b-black" ref={cartHeader}>
                <div>
                    <h6 className="uppercase text-black text-2xl lg:text-4xl mb-2.5">your cart</h6>

                    <div className="flex justify-start items-center">
                        {
                            (cart.sections.length > 0) && (selected.length === 0) && <button className="text-xs lg:text-sm uppercase underline" onClick={selectAllHandler}>select all</button>
                        }

                        {
                            (cart.sections.length > 0) && (selected.length > 0) && (
                                <>
                                    <button className="text-xs lg:text-sm uppercase underline me-4" onClick={removeAllHandler}>remove</button>
                                    <button className="text-xs lg:text-sm uppercase underline" onClick={saveHandler}>save</button>
                                </>
                            )
                        }
                    </div>
                </div>

                <button onClick={() => {
                    setBlurContent(false);
                    setIsClosing(true);
                }}>
                    <img src="/assets/close.svg" alt="close icon" className="w-5 h-5"/>
                </button>
            </div>

            <div id="cart-content" style={{height: cartContentHeight}} className={clsx(`p-5 relative overflow-y-auto overflow-x-hidden`)}>
                {
                    cart.sections.map((cartSection: CartItemSection) => {
                        if (cartSection.items.length > 0) {
                            return <CartSection section={cartSection} key={cartSection.id}/>
                        }
                    })
                }

                {
                    cart.sections.length == 0 && <p className={"absolute left-0 top-1/2 -translate-y-1/2 z-20 w-full text-center"}>Your cart is empty.</p>
                }
            </div>

            <div id="cart-footer"
                 className="p-5 border-t border-t-black absolute w-full bottom-0 left-0 z-10 bg-white" ref={cartFooter}>
                <div className="flex justify-between items-center mb-5">
                    <span className="uppercase text-xl">subtotal</span>
                    <span className="text-xl">$ {subtotal.toLocaleString(undefined, {maximumFractionDigits:2})}</span>
                </div>

                <div>
                    <LivButton as={'button'} text={'checkout'} borderColor={'border-black'}
                               bgColor={'bg-black'} hasArrow={false} textColor={'text-white'} fullWidth={true} onWhiteBg={true}
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
                <span className="uppercase sm:text-xl text-black me-2">{section.name}</span>
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
                    section.items.map((item: CartItem) => (
                        <Item item={item} sectionId={section.id} key={item.id}/>
                    ))
                }
            </div>
        </div>
    )
}

const Item = ({item, sectionId}: { item: CartItem, sectionId: number }) => {
    const {cart, setCart, selected, setSelected} = useCart();

    const [sectionIndex, setSectionIndex] = useState<number>(-1);
    const [itemIndex, setItemIndex] = useState<number>(-1);
    const [quantity, setQuantity] = useState<number>(item.quantity);

    const [isChecked, setIsChecked] = useState<boolean>(false);

    useEffect(() => {
        if (selected.includes(item.id)) {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [selected]);

    useEffect(() => {
        const tempSectionIndex = cart.sections.findIndex((section) => section.id === sectionId);
        const tempItemIndex = cart.sections[tempSectionIndex].items.findIndex((itm) => itm.id === item.id);

        // find the section index
        setSectionIndex(tempSectionIndex);

        // in section index find the item ID
        setItemIndex(tempItemIndex);
    }, [cart, item, sectionId]);

    const increment = () => {
        if (sectionIndex != -1 && itemIndex != -1 && quantity < 98) {
            const newCart = {...cart};

            newCart.sections[sectionIndex].items[itemIndex].quantity = newCart.sections[sectionIndex].items[itemIndex].quantity + 1;

            setCart(newCart)

            setQuantity(newCart.sections[sectionIndex].items[itemIndex].quantity);
        }
    }

    const decrement = () => {
        if (sectionIndex != -1 && itemIndex != -1 && quantity > 1) {
            const newCart = {...cart};

            newCart.sections[sectionIndex].items[itemIndex].quantity = newCart.sections[sectionIndex].items[itemIndex].quantity - 1;

            setCart(newCart);

            setQuantity(newCart.sections[sectionIndex].items[itemIndex].quantity);
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // const oldValue = e.target.defaultValue;
        const value = Number(e.target.value);

        if(value !== 0) {
            setQuantity(value);

            const newCart = {...cart};

            newCart.sections[sectionIndex].items[itemIndex].quantity = value;

            setCart(newCart);
        }
    }

    const onRemoveHandler = () => {
        if (itemIndex > -1) {
            const newCart = {...cart};

            newCart.sections[sectionIndex].items.splice(itemIndex, 1);

            if(newCart.sections[sectionIndex].items.length === 0) {
                // remove the section too
                newCart.sections.splice(sectionIndex, 1);
            }

            setCart(newCart);

            // remove from selected if it's there
            if (selected.includes(item.id)) {
                const idx = selected.findIndex((id) => id === item.id);

                if (idx > -1) {
                    const tempSelected = [...selected];
                    tempSelected.splice(idx, 1);
                    setSelected(tempSelected);
                }
            }
        }
    }

    const onCheckHandler = () => {
        const tempSelected = [...selected];

        if (isChecked) {
            // uncheck
            const idx = tempSelected.findIndex((id) => id === item.id);
            tempSelected.splice(idx, 1);
        } else {
            // check
            if (!tempSelected.includes(item.id)) {
                tempSelected.push(item.id);
            }
        }

        setIsChecked(!isChecked);
        setSelected(tempSelected);
    }

    return (
        <div className="sm:flex sm:flex-row sm:justify-between sm:items-end border-b border-b-black py-6 last:border-b-0">
            <div className="flex justify-start sm:justify-between items-center">
                <div className="flex justify-start sm:justify-between items-center me-4 sm:me-8">
                    <label className="liv-checkbox">
                        <input type="checkbox" checked={isChecked} onChange={onCheckHandler}/>
                        <span className="checkmark"></span>
                    </label>

                    <div className="relative w-20 h-20 bg-cover bg-no-repeat bg-center sm:ms-8"
                         style={{backgroundImage: `url('${item.image}')`}}>
                        <Link to={'#'} className="absolute top-0 left-0 w-full h-full z-10"></Link>
                    </div>
                </div>

                <div>
                    <span className="uppercase text-xs">{item.brand}</span>
                    <p className="uppercase sm:text-lg mb-2.5 sm:mb-4">{item.name}</p>

                    <div className="sm:flex sm:justify-start sm:items-end">
                        <div className="flex justify-start items-center">
                            <button className="w-8 h-8 relative border border-black" onClick={decrement}>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">-</span>
                            </button>
                            <input type='number'
                                   className="w-8 h-8 border-t border-b border-t-black border-b-black focus-visible:outline-0 p-1 text-center text-sm" value={quantity} onChange={onChangeHandler} onFocus={(e) => e.target.select()}/>
                            <button className="w-8 h-8 relative border border-black" onClick={increment}>
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">+</span>
                            </button>
                        </div>

                        <button className="uppercase underline text-sm mt-2.5 sm:mt-0 sm:ms-4" onClick={onRemoveHandler}>remove</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end text-right mt-4 sm:mt-0 sm:flex-col sm:justify-normal sm:items-end">
                <div className="sm:mb-3">
                    <span className="text-lg">{item.currency}{item.price.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
                </div>

                <LivButton as={'a'} url={'#'} text={'find similar item'} borderColor={'border-black'}
                           bgColor={'bg-transparent'} style={'thin'} rounded={true} className={"text-xs sm:text-base"}/>
            </div>
        </div>
    )
}