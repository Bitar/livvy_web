import {useEffect, useState} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import {Background} from "../modules/background/Background.tsx";
import clsx from "clsx";
import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";
import {LivButton} from "../components/buttons/LivButton.tsx";
import {AuthLayoutProvider} from "./AuthLayoutProvider.tsx";

const AuthLayout = () => {
    const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const root = document.getElementById('root')
        if (root) {
            root.style.height = '100%'
        }
        return () => {
            if (root) {
                root.style.height = 'auto'
            }
        }
    }, [])

    const closePanels = () => {
        setIsPanelOpen(false);
        navigate('/auth/')
    }

    return (
        <AuthLayoutProvider.Provider value={{
            isPanelOpen: isPanelOpen,
            setIsPanelOpen: setIsPanelOpen,
            closePanels: closePanels
        }}>
            <div id="wrapper" className="relative h-screen overflow-hidden">
                <Background type='video' url={'https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4'}
                            poster={'assets/livvy-intro-poster.jpg'}/>

                <div id="content">
                    <div id="main-content">
                        <div
                            className={clsx("z-40 absolute w-11/12 md:w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center animate__animated", {
                                'animate__fadeOut': isPanelOpen,
                                'animate__fadeIn': !isPanelOpen
                            })}>
                            <img src={toAbsoluteUrl('assets/livvy-logo-white.png')} alt="Livvy Logo White"
                                 className='h-auto inline-block mb-6 w-56 md:w-72'/>

                            <p className="text-white w-full md:max-w-md mb-7">Livvy is an AI interior design platform
                                that
                                converts your dream space into reality using state-of-the-art AI technology.</p>

                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <LivButton as={'a'} url={'/auth/register'} text={'Sign up'} borderColor={'border-white'}
                                           bgColor={'bg-white'} rounded={true} style={'thin'}
                                           className="md:me-4 me-0 mb-4 md:mb-0"/>

                                <LivButton as={'a'} url={'/auth/login'} type={'submit'} text={'Login'} bgColor={'bg-transparent'}
                                           borderColor={'border-white'} rounded={true} style={'thin'}
                                           textColor={'text-white'} />
                            </div>
                        </div>

                        <div className="z-40 absolute w-full bottom-0 left-0 hidden md:block">
                            <div className="flex justify-between px-9 pb-8">
                                <span
                                    className="text-white text-base uppercase">Aesthetic <br/> Intelligence</span>
                                <span className="text-white text-base uppercase">Established <br/> 2023</span>
                                <span className="text-white text-base uppercase">Livvy.com <br/> @livvy</span>
                                <span className="text-white text-base uppercase"><img
                                    src={toAbsoluteUrl('assets/logo-symbol-white.png')} alt="Livvy logo symbol"
                                    className="w-8"/></span>
                            </div>
                        </div>
                    </div>

                    <Outlet/>
                </div>
            </div>
        </AuthLayoutProvider.Provider>
    )
}

export {AuthLayout}
