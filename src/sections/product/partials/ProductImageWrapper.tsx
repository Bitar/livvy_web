import {thumbnailProduct} from "../../../data/product.ts";
import {Link} from "react-router-dom";
import React, {MutableRefObject, useEffect, useRef, useState} from "react";
import {ProductTags} from "./ProductTags.tsx";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle as faCircleReg} from "@fortawesome/free-regular-svg-icons";

export const ProductImageWrapper = () => {
    const heroSliderRef: MutableRefObject<Slider | null> = useRef(null);
    const heroSliderMobileRef: MutableRefObject<Slider | null> = useRef(null);
    const thumbnailSliderRef: MutableRefObject<Slider | null> = useRef(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);

    useEffect(() => {
        setNav1(heroSliderRef.current);
        setNav2(thumbnailSliderRef.current);
    }, []);

    const heroImageSettings = {
        arrows: false,
        autoPlay: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // appendDots(dots) {
        //     return <SlickNavigation dots={dots}/>
        // },
        // customPaging(index: number) {
        //     return (
        //         index === currentIndex ? (
        //             <FontAwesomeIcon icon={faCircle} className='text-xs'/>
        //         ) : (
        //             <FontAwesomeIcon icon={faCircleReg} className='text-xs'/>
        //         )
        //     )
        // },
        // beforeChange(currentSlide: number, nextSlide: number) {
        //     setCurrentIndex(nextSlide)
        // },
    };

    const thumbnailSettings = {
        arrows: false,
        autoPlay: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    }

    const settings = {
        arrows: false,
        autoPlay: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // responsive: ()
        appendDots(dots) {
            return <SlickNavigation dots={dots}/>
        },
        customPaging(index: number) {
            return (
                index === currentIndex ? (
                    <FontAwesomeIcon icon={faCircle} className='text-xs'/>
                ) : (
                    <FontAwesomeIcon icon={faCircleReg} className='text-xs'/>
                )
            )
        },
        beforeChange(currentSlide: number, nextSlide: number) {
            setCurrentIndex(nextSlide)
        },
    };

    const updateImage = (index: number) => {
        if (heroSliderRef.current !== null) {
            heroSliderRef.current.slickGoTo(index)
        }
    }

    return (
        <div className="images-wrapper relative">
            <ProductTags className={'flex md:hidden absolute top-4 right-6'}/>

            <div className="md:hidden hero-image">
                <div className='w-full overflow-hidden' id={'potato'}>
                    <Slider {...settings} ref={heroSliderMobileRef} className={'relative'}>
                        {
                            thumbnailProduct.map((thumbnailProduct, index) => (
                                <div key={`hero-image-${index}`}>

                                    <div className="main-image w-full aspect-square bg-cover bg-center" style={{
                                        backgroundImage: `url(${thumbnailProduct.src})`
                                    }}/>

                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>

            <div className="hidden md:block hero-image">
                <Slider {...heroImageSettings} ref={heroSliderRef} asNavFor={nav2} className={'relative'}>
                    {
                        thumbnailProduct.map((thumbnailProduct, index) => (
                            <div key={`hero-image-${index}`}>
                                <div className="main-image aspect-square bg-cover bg-center" style={{
                                    backgroundImage: `url(${thumbnailProduct.src})`
                                }}/>
                            </div>
                        ))
                    }
                </Slider>
            </div>


            <div className="hidden md:block thumbnails mt-7">
                <div className="flex flex-wrap gap-2">
                    <div id='thumbnailSlider'>
                        <Slider  {...thumbnailSettings} ref={thumbnailSliderRef} asNavFor={nav1} className={'relative'}>
                            {
                                thumbnailProduct.map((thumbnailProduct, index) => (
                                    <img key={`thumbnailProduct-${index}`} src={thumbnailProduct.src} alt="Product Thumbnail" className='w-16 h-16 cursor-pointer' onClick={() => updateImage(index)}/>
                                ))
                            }
                        </Slider>
                    </div>
                    <Link to={'#'} className='flex items-center xl:ms-6 mt-4 xl:mt-0'>
                        <img src="/assets/product/view-space-icon.png" alt="View in your space." className='me-2'/>
                        <span className='inline-block border-b border-b-black uppercase text-xs'>View in your space</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const SlickNavigation = ({dots}) => {
    return (
        <div className="slider-dots absolute bottom-4 right-4">
            <div className='flex flex-wrap items-center gap-1'>
                {dots.map((item, index) => {
                    return (
                        <div key={index}>{item.props.children}</div>
                    )
                })}
            </div>
        </div>
    )
}