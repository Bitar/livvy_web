import clsx from "clsx";
import {useMasterLayout} from "./MasterLayoutContext.loader.ts";

export const Footer = () => {
    const {footerVariant} = useMasterLayout();
    return (
        <div id='footer' className={clsx({
            'footer-tan': footerVariant === 'tan',
            'footer-black': footerVariant === 'black',
        })}>
            <div className="container liv-container">
                <div className="grid grid-cols-1 gap-8 py-6 lg:py-8 lg:grid-cols-2">
                    <div className="left-side max-w-md">
                        <div className="logo mb-10">
                            {
                                footerVariant === 'black'
                                    ? <img src="/assets/livvy-logo-white.png" alt="Livvy Logo White" className='w-36'/>
                                    : <img src="/assets/livvy-logo-black.png" alt="Livvy Logo Black" className='w-36'/>
                            }
                        </div>
                        <div className="newsletter">
                            <p className='text-sm mb-6'>Signup for our newsletter for design inspiration, news, and promotions.</p>
                            <div className="newsletter-input-group flex">
                                <input type="text" id="website-admin"
                                       className="border border-r-0 text-gray-900 block flex-1 min-w-0 w-full text-sm p-2.5 outline-0"
                                       placeholder="enter your email"/>
                                <button className='border px-5 uppercase'>
                                    <div className='flex justify-center'>
                                        <span className='me-2'>Sign Up</span>
                                        {
                                            footerVariant === 'black'
                                                ? <img src="/assets/arrow-black.svg" alt=""/>
                                                : <img src="/assets/arrow-white.svg" alt=""/>
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="lists">
                            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                                <div className='list-group'>
                                    <h2 className="mb-6 uppercase">Customers</h2>
                                    <ul className="font-medium uppercase">
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Capture App</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Pricing</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Celebrity Designers</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='list-group'>
                                    <h2 className="mb-6 uppercase">Company</h2>
                                    <ul className="font-medium uppercase">
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">About</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Contact</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Partnership Program</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='list-group'>
                                    <h2 className="mb-6 uppercase">Resources</h2>
                                    <ul className="font-medium uppercase">
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Privacy Policy</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Terms of Service</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Ada Accessibility</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className='list-group'>
                                    <h2 className="mb-6 uppercase">Socials</h2>
                                    <ul className="font-medium uppercase">
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Instagram</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Pinterest</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Linkedin</a>
                                        </li>
                                        <li className="mb-4">
                                            <a href="#" className="hover:underline">Tiktok</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="copyright mt-3 md:mt-0">
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-end">
                                <ul className="flex">
                                    <li className='me-2'>
                                        <a href="#">
                                            <img src="/assets/apple-store-download.png" alt="Livvy Apple Store Download Link" className='max-md:max-w-32'/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="/assets/google-play-download.png" alt="Livvy Google Store Download Link" className='max-md:max-w-32'/>
                                        </a>
                                    </li>
                                </ul>
                                <p className="text-sm">
                                    &copy; Copyright {new Date().getFullYear()}, Livvy. All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}