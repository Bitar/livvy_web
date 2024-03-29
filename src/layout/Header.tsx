import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faUser, faShoppingBag} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <div id="header" className='flex flex-wrap items-center justify-between mx-auto border-b border-white/50 px-10'>
            <div className="logo-container py-5 w-20">
                <Link to={'/'}>
                    <img src={toAbsoluteUrl('assets/livvy-logo-white.png')} alt="Livvy logo symbol" className='w-full'/>
                </Link>
            </div>

            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                    <li>
                        <a href="#" className="block py-2 text-white" aria-current="page">
                            <FontAwesomeIcon icon={faUser}/>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 text-white">
                            <FontAwesomeIcon icon={faShoppingBag}/>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block py-2 text-white">
                            <FontAwesomeIcon icon={faBars}/>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}