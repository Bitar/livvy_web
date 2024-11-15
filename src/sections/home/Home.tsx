import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";
import {LivButton} from "../../components/buttons/LivButton.tsx";
import {useMasterLayout} from "../../layout/MasterLayoutContext.loader.ts";
import {useEffect} from "react";

export const Home = () => {
    const {setShowFooter, setBackgroundType, setBackgroundUrl, setHeaderBgColor} = useMasterLayout()

    useEffect(() => {
        setHeaderBgColor('transparent')
        setShowFooter(false);
        setBackgroundType('video');
        setBackgroundUrl('https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="container">
            <div
                className="absolute w-11/12 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">

                <div className='italic font-extralight text-white text-4xl'
                     style={{fontFamily: "PP Editorial New"}}>Welcome to
                </div>

                <img src={toAbsoluteUrl('assets/livvy-logo-white.png')} alt="Livvy Logo White"
                     className='h-auto inline-block py-5 w-56 md:w-72'/>

                <p className="text-white md:max-w-lg w-full m-auto mb-7">
                    We’ll notify you when the 3D model of your space is ready to view. While you wait, would you like
                    start adding your inspiration?
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <LivButton as={'button'} onClickHandler={() => {
                    }} text={'Add Inspiration'} bgColor={'bg-white'} borderColor={'border-black'} style={'thin'}
                               textSize={'text-xs xl:text-sm'}
                               className={'md:me-4 me-0 mb-4 md:mb-0'}/>

                    <LivButton as={'button'} onClickHandler={() => {
                    }} text={'Work with a designer'} bgColor={'bg-white'} borderColor={'border-black'} style={'thin'} textSize={'text-xs xl:text-sm'}/>
                </div>
            </div>
        </div>
    )
}