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
                <div className="grid grid-cols-4 gap-x-2.5">
                    <div className="waterfall-container bottom-to-top">
                        <img src={'/assets/style-quiz/quiz-1.jpg'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/style-quiz/quiz-2.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-3.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-4.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-5.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-6.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-7.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-8.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-9.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-10.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-11.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-12.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-13.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-14.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-15.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-16.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-17.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-18.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-19.jpg'} alt={"image"} className="w-full"/>
                    </div>

                    <div className="waterfall-container top-to-bottom">
                        <img src={'/assets/style-quiz/quiz-20.jpg'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/style-quiz/quiz-21.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-22.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-23.webp'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-24.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-25.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-26.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-27.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-28.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-29.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-30.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-31.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-32.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-33.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-34.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-35.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-36.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-37.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-38.jpg'} alt={"image"} className="w-full"/>
                    </div>

                    <div className="waterfall-container bottom-to-top">
                        <img src={'/assets/style-quiz/quiz-39.jpg'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/style-quiz/quiz-40.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-41.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-42.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-43.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-44.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-45.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-46.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-47.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-48.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-49.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-50.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-51.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-52.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-53.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-54.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-55.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-56.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-57.jpg'} alt={"image"} className="w-full"/>
                    </div>

                    <div className="waterfall-container top-to-bottom">
                        <img src={'/assets/style-quiz/quiz-58.jpg'} alt={"image"} className="w-full first-image"/>
                        <img src={'/assets/style-quiz/quiz-59.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-60.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-61.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-62.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-63.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-64.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-65.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-66.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-67.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-68.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-69.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-70.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-71.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-72.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-73.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/style-quiz/quiz-74.jpg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-2.jpeg'} alt={"image"} className="w-full"/>
                        <img src={'/assets/celebrities/featured-interior-3.jpeg'} alt={"image"} className="w-full"/>
                    </div>
                </div>
            </div>
        </div>
    )
}