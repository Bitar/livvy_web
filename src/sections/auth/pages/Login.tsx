import {toAbsoluteUrl} from "../../../helpers/toAbsoluteUrl.ts";
import RoundedButton from "../../../components/buttons/RoundedButton.tsx";

export const Login = () => {
    return (
        <div id="wrapper" className="relative h-screen overflow-hidden">
            <div className="background">
                <div className="h-full w-full bg-black opacity-40 absolute top-0 left-0 z-20"/>
                <video src={toAbsoluteUrl('assets/livvy-intro.mp4')} autoPlay={true} controls={false} loop={true}
                       muted={true} poster={toAbsoluteUrl('assets/livvy-intro-poster.jpg')}
                       className="absolute w-auto min-w-full min-h-full max-w-none z-10"></video>
            </div>

            <div id="content">
                <div id="main-content">
                    <div
                        className="z-40 absolute w-11/12 md:w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <img src={toAbsoluteUrl('assets/livvy-logo-white.png')} alt="Livvy Logo White"
                             className='h-auto inline-block mb-6 w-56 md:w-72'/>

                        <p className="text-white w-full md:max-w-md mb-7">Livvy is an AI interior design platform that
                            converts your dream space into reality using state-of-the-art AI technology.</p>

                        <div className="flex flex-col md:flex-row items-center justify-center">
                            <RoundedButton variant="white" text="sign up" style="md:me-4 me-0 mb-4 md:mb-0"/>
                            <RoundedButton variant="transparent" text="login"/>
                        </div>
                    </div>

                    <div className="z-40 absolute w-full bottom-0 left-0 hidden md:block">
                        <div className="flex justify-between px-9 pb-8">
                            <span
                                className="text-white text-base uppercase font-medium">Aesthetic <br/> Intelligence</span>
                            <span className="text-white text-base uppercase font-medium">Established <br/> 2023</span>
                            <span className="text-white text-base uppercase font-medium">Livvy.com <br/> @livvy</span>
                            <span className="text-white text-base uppercase font-medium"><img
                                src={toAbsoluteUrl('assets/logo-symbol-white.png')} alt="Livvy logo symbol"
                                className="w-8"/></span>
                        </div>
                    </div>
                </div>

                <div id="login-panel" className="absolute z-50 right-0 top-0 w-1/2 h-full bg-tan">
                    <div id="login-form-container" className="absolute z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                        <div>
                            <img src={toAbsoluteUrl('assets/logo-symbol-black.png')} alt="Livvy logo symbol" className="w-11"/>
                        </div>
                    </div>
                    <div id="login-footer"></div>
                </div>
            </div>
        </div>
    )
}