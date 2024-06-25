import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUser, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import clsx from "clsx";
import {useCart} from "./CartProvider.tsx";
import {useMasterLayout} from "./MasterLayoutContext.loader.ts";
import {useEffect, useState} from "react";

export const Header = ({textColor, bgColor = 'transparent'}: { textColor: 'white' | 'black', bgColor?: string }) => {
    const {setIsCartOpen, getCartCount} = useCart();
    const {setBlurContent} = useMasterLayout();

    const logo = textColor == 'white' ? 'livvy-logo-white.png' : 'livvy-logo-black.png';
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        setCartCount(getCartCount());
    }, [getCartCount]);

    return (
        <div id="header" className={clsx(`fixed w-full flex flex-wrap items-center justify-between mx-auto border-b px-4 lg:px-10 z-40 bg-${bgColor}`, {
            'border-white/50': textColor == 'white',
            'border-black': textColor == 'black'
        })}>

            <div className="logo-container py-5 w-20">
                <Link to={'/'}>
                    <img src={toAbsoluteUrl(`assets/${logo}`)} alt="Livvy logo symbol" className='w-full'/>
                </Link>
            </div>

            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                    <li>
                        <a href="#" className={`block py-2 text-${textColor}`} aria-current="page">
                            <FontAwesomeIcon icon={faUser}/>
                        </a>
                    </li>
                    <li>
                        <button className={`relative block py-2 text-${textColor}`} onClick={() => {
                            setIsCartOpen(true);
                            setBlurContent(true);
                        }}>
                            <FontAwesomeIcon icon={faShoppingBag}/>
                            {
                                cartCount > 0 && <span className="absolute h-4 w-4 bg-black rounded-full top-0 -right-3.5"><span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-2xs">{cartCount}</span></span>
                            }

                        </button>
                    </li>
                    <li>
                        <a href="#" className={`block py-2 text-${textColor}`}>
                            <FontAwesomeIcon icon={faBars}/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}