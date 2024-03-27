import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";

export const Home = () => {
    return (
        <div id="main-content">
            <div
                className="absolute w-11/12 md:w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

                <div className='italic font-extralight text-white text-4xl text-' style={{fontFamily: "PP Editorial New"}}>Welcome to</div>

                <img src={toAbsoluteUrl('assets/livvy-logo-white.png')} alt="Livvy Logo White"
                     className='h-auto inline-block py-5 w-56 md:w-72'/>

                <p className="text-white w-full md:max-w-lg mb-7">
                    We’ll notify you when the 3D model of your space is ready to view. While you wait, would you like start adding your inspiration?
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <button
                        className={`flex items-center justify-center min-w-32 md:min-w-40 uppercase text-center py-2 px-5 text-sm md:text-base bg-white text-black md:me-4 me-0 mb-4 md:mb-0`}>
                        <span className="me-2">Add Inspiration</span> <img src={toAbsoluteUrl('assets/vector-black.png')} alt="vector" className="w-3 md:w-4"/>
                    </button>

                    <button
                        className={`flex items-center justify-center min-w-32 md:min-w-40 uppercase text-center py-2 px-5 text-sm md:text-base bg-white text-black md:me-4 me-0 mb-4 md:mb-0`}>
                        <span className="me-2">Work with a designer</span> <img src={toAbsoluteUrl('assets/vector-black.png')} alt="vector" className="w-3 md:w-4"/>
                    </button>
                </div>
            </div>
        </div>
    )
}