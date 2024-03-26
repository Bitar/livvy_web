import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";
import RoundedButton from "../components/buttons/RoundedButton.tsx";

export const Home = () => {
    return (
        <div id="main-content">
            <div
                className="absolute w-11/12 md:w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

                <div className='italic font-extralight text-white text-4xl text-' style={{fontFamily: "PP Editorial New"}}>Welcome To</div>

                <img src={toAbsoluteUrl('assets/livvy-logo-white.png')} alt="Livvy Logo White"
                     className='h-auto inline-block py-5 w-56 md:w-72'/>

                <p className="text-white w-full md:max-w-lg mb-7">
                    We’ll notify you when the 3D model of your space is ready to view. While you wait, would you like start adding your inspiration?
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <RoundedButton variant="white" text="sign up" style="md:me-4 me-0 mb-4 md:mb-0"/>
                    <RoundedButton variant="transparent" text="login"/>
                </div>
            </div>
        </div>
    )
}