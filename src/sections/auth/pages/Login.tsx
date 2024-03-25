import {toAbsoluteUrl} from "../../../helpers/toAbsoluteUrl.ts";

export const Login = () => {
    return (
        <div id="wrapper" className="relative h-screen overflow-hidden">
            <div className="background">
                <video src={toAbsoluteUrl('assets/livvy-intro.mp4')} autoPlay={true} controls={false} loop={true}
                       muted={true} poster={toAbsoluteUrl('assets/livvy-intro-poster.jpg')}
                       className="absolute w-auto min-w-full min-h-full max-w-none z-10"></video>
            </div>

            <div id="content">
                <div className="z-30 absolute w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <img src={toAbsoluteUrl('assets/livvy-logo-white.png')} alt="Livvy Logo White" className='h-auto inline-block w-72 mb-6'/>

                    <p className="text-white max-w-md">Livvy is an AI interior design platform that converts your dream space into reality using state-of-the-art AI technology.</p>
                </div>

            </div>
        </div>
    )
}