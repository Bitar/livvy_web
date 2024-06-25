import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {useEffect} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";

export const TakeQuiz = () => {
    const {setBackgroundType, setBackgroundColor} = useMasterLayout();

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-0 p-6 sm:p-0">
            <div className="relative order-last sm:order-first">
                <div className="w-full sm:w-3/5 sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-10">
                    <h1 className="uppercase text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-2">find your <br/> <span
                        style={{fontFamily: "PP Editorial New"}}
                        className="font-thin italic capitalize text-3xl md:text-4xl lg:text-5xl xl:text-6xl">design style</span></h1>

                    <p className="mb-6 text-sm sm:text-base">
                        Are you looking to refresh your living space but feeling overwhelmed by the myriad of interior design styles out there? Take our style quiz discover the aesthetic that best resonates with your personality and
                        preferences.
                    </p>

                    <div className="w-full max-w-60">
                        <LivButton as={'a'} text={'take the quiz'} borderColor={'border-black'} bgColor={'bg-black'} textColor={'text-white'} url={"/style-quiz/quiz"} style={"mid"} width={'full'}/>
                    </div>
                </div>
            </div>

            <div className="w-full aspect-[5/3] sm:mb-0 sm:h-[calc(100vh-62px)] bg-transparent overflow-y-hidden mb-6">
                <div className="grid grid-cols-4 gap-x-4">
                    <div className="waterfall-container bottom-to-top">
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                    </div>

                    <div className="waterfall-container top-to-bottom">
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                    </div>

                    <div className="waterfall-container bottom-to-top">
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                    </div>

                    <div className="waterfall-container top-to-bottom">
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-4.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-1.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                    </div>
                </div>
            </div>
        </div>
    )
}