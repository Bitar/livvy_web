import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUser, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";
import clsx from "clsx";
import {useCart} from "./CartProvider.tsx";
import {useMasterLayout} from "./MasterLayoutContext.loader.ts";

export const Header = ({textColor, bgColor}: { textColor: 'white' | 'black', bgColor: 'tan' | 'transparent' }) => {
    const logo = textColor == 'white' ? 'livvy-logo-white.png' : 'livvy-logo-black.png';
    const {setIsCartOpen} = useCart();
    const {setBlurContent} = useMasterLayout();

    return (
        <div id="header" className={clsx('fixed w-full flex flex-wrap items-center justify-between mx-auto border-b px-4 lg:px-10 z-50', {
            'bg-liv-tan': bgColor == 'tan',
            'bg-transparent': bgColor == 'transparent',
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
                        <button className={`block py-2 text-${textColor}`} onClick={() => {
                            setIsCartOpen(true);
                            setBlurContent(true);
                        }}>
                            <FontAwesomeIcon icon={faShoppingBag}/>
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