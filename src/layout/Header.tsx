import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUser, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import clsx from "clsx";
import {useCart} from "./CartProvider.tsx";
import {useMasterLayout} from "./MasterLayoutContext.loader.ts";
import {FC, useEffect, useState} from "react";

interface HeaderProps {
    textColor: 'white' | 'black';
    bgColor?: string;
}

export const Header: FC<HeaderProps> = ({textColor, bgColor = 'transparent'}) => {
    const {setIsCartOpen, getCartCount} = useCart();
    const {setBlurContent, showMenu, setShowMenu} = useMasterLayout();

    const logo = textColor == 'white' ? 'livvy-logo-white.png' : 'livvy-logo-black.png';
    const [cartCount, setCartCount] = useState<number>(0);

    useEffect(() => {
        setCartCount(getCartCount());
    }, [getCartCount]);

    return (
        <div id="header"
             className={clsx(`fixed w-full flex flex-wrap items-center justify-between mx-auto border-b px-4 lg:px-10 z-40 bg-${bgColor} h-16`, {
                 'border-white/50': textColor == 'white',
                 'border-black': textColor == 'black'
             })}>

            <div className="logo-container py-5 w-20">
                <Link to={'/'}>
                    <img src={toAbsoluteUrl(`assets/${logo}`)} alt="Livvy logo symbol" className='w-full'/>
                </Link>
            </div>

            <div className="block md:w-auto" id="navbar-default">
                <ul className="font-medium flex rounded-lg flex-row space-x-8 border-0 items-center">
                    <li>
                        <a href="#" className={`block  text-${textColor}`} aria-current="page">
                            <FontAwesomeIcon icon={faUser}/>
                        </a>
                    </li>
                    <li>
                        <button className={`relative block text-${textColor}`} onClick={() => {
                            setIsCartOpen(true);
                            setBlurContent(true);
                        }}>
                            <FontAwesomeIcon icon={faShoppingBag}/>
                            {
                                cartCount > 0 &&
                                <span className="absolute h-4 w-4 bg-black rounded-full top-0 -right-3.5"><span
                                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white text-2xs">{cartCount}</span></span>
                            }

                        </button>
                    </li>
                    <li>
                        <div
                            className={`block text-${textColor} cursor-pointer`}
                            onClick={() => setShowMenu(!showMenu)}>
                            <FontAwesomeIcon icon={faBars}/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}