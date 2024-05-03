import Slider from "react-slick";
import React from "react";

export const Test = () => {
    const settings = {
        className: "center",
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        vertical: true,
        autoplaySpeed: 800,
        autoplay: true,
        slidesToScroll: 1,
        cssEase: "linear",
        pauseOnFocus: false,
        pauseOnHover: false
    };

    return (
        // <div className='absolute bg-green w-full h-full p-10'>
        //     <div className='w-80'>
        //         <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-black'} fullWidth={true} textIcon={'assets/google-logo.png'} arrowIconDirection={'down'}/>
        //         <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-black'} arrowIcon={false} rounded={true} fullWidth={true}/>
        //         <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-white'} bgColor={'bg-white'} fullWidth={true}/>
        //         <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-white'} bgColor={'bg-transparent'} fullWidth={true}/>
        //         <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-white'} fullWidth={true}/>
        //         <LivButton as={'button'} onClickHandler={() => {}} text={'Login'} borderColor={'border-black'} bgColor={'bg-white'} fullWidth={true} className={'mb-4'}/>
        //         <LivButton as={'a'} url={'https://google.com'} text={'Login'} borderColor={'border-black'} bgColor={'bg-white'} fullWidth={true}/>
        //     </div>
        // </div>

        <Slider {...settings}>
            <Slide image={'/assets/celebrities/featured-interior-1.webp'}/>
            <Slide image={'/assets/celebrities/featured-interior-2.jpeg'}/>
            <Slide image={'/assets/celebrities/featured-interior-3.jpeg'}/>
            <Slide image={'/assets/celebrities/featured-interior-4.jpeg'}/>
            <Slide image={'/assets/celebrities/featured-interior-1.webp'}/>
            <Slide image={'/assets/celebrities/featured-interior-2.jpeg'}/>
            <Slide image={'/assets/celebrities/featured-interior-3.jpeg'}/>
        </Slider>

    )
}

const Slide = ({image}: { image: string }) => {
    return (
        <img src={`${image}`} className="max-w-[200px]" alt="image"/>
    )
}