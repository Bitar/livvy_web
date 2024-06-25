import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {useEffect} from "react";
import Slider from "react-slick";
import {LivButton} from "../../../components/buttons/LivButton.tsx";

export const Results = () => {
    const {setBackgroundType, setBackgroundColor, setFooterVariant, setHeaderBgColor} = useMasterLayout();

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setFooterVariant('black');
        setHeaderBgColor('liv-tan');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sliderSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1.25,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="container liv-container">
            <div className="mb-6">
                <h1 className="text-xl md:text-2xl lg:text-3xl italic font-extralight text-center mb-1" style={{fontFamily: "PP Editorial New"}}>Based on your answers, your interior design style is Organic Modern</h1>
                <p className="text-sm text-center max-w-xl m-auto">This style is a balanced fusion of clean lines, minimalist forms, and organic materials, resulting in a warm, inviting, and effortlessly chic atmosphere.</p>
            </div>

            <Slider {...sliderSettings}>
                <Slide image={'/assets/celebrities/interior-1.jpeg'}/>
                <Slide image={'/assets/celebrities/interior-2.jpg'}/>
                <Slide image={'/assets/celebrities/interior-3.jpeg'}/>
            </Slider>

            <div className="mt-10 text-center">
                <LivButton as={'a'} url={'#'} text={'create your space'} borderColor={'border-black'} bgColor={'bg-black'} textColor={'text-white'} style={'mid'}/>
            </div>
        </div>
    )
}

const Slide = ({image}: {
    image: string
}) => {
    return (
        <div className="me-2 ms-2 md:me-3 md:ms-3">
            <div className="w-full aspect-[3/4] bg-cover bg-no-repeat bg-center"
                 style={{backgroundImage: `url('${image}')`}}></div>
        </div>

    )
}