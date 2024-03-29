import ReactPlayer from "react-player";
import React, {FC, useEffect, useRef, useState} from "react";
import {faPlayCircle, faPause, faCircle} from "@fortawesome/free-solid-svg-icons";
import {faCircle as faCircleReg} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import {useNavigate} from "react-router-dom";
import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";

export const Onboarding = () => {
    const sliderRef = useRef<any>(null);
    const slideCount = 3
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const navigate = useNavigate()
    const {setShowFooter} = useMasterLayout()

    useEffect(() => {
        setShowFooter(false)
    }, [])

    const settings = {
        arrows: false,
        autoPlay: false,
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
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

    const nextArrowHandler = () => {
        if (currentIndex + 1 >= slideCount) {
            navigate(`/`)
        } else {
            sliderRef?.current?.slickNext()
        }
    }

    const SlickNavigation = ({dots}) => {
        return (
            <div className="slider-dots absolute bottom-0 lg:-bottom-12    lg:left-1/2 lg:transform lg:-translate-x-1/2">
                <ul className='flex flex-wrap items-center justify-center'>
                    {dots.map((item, index) => {
                        return (
                            <li key={index} className='me-4'>{item.props.children}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    return (
        <>
            <div id='onboarding' className='text-white pb-12'>
                <div className="container pt-10 relative md:px-0 px-6">
                    <div className='next-arrow absolute right-6 w-10 bottom-0 lg:bottom-auto lg:top-2/4 z-10 cursor-pointer'
                         onClick={nextArrowHandler}>
                        <img src="/assets/arrow-white.svg" alt="" className={'w-full'}/>
                    </div>

                    <Slider {...settings} ref={sliderRef} className={'relative'}>
                        <Slide index={1} title={'Capture'} subTitle={'Your Space'} video={'assets/demo_video_1.mp4'}
                               description={'Creating a digital twin is the first step towards converting your inspiration into a shoppable reality with LIVVY.'}/>
                        <Slide index={2} title={'Add Your'} subTitle={'Inspiration'} video={'assets/demo_video_2.mp4'}
                               description={'TK Upload your inspiration, add your favorite styles, or preferred color palette. Add your ideal budget.'}/>
                        <Slide index={3} title={'Shop'} subTitle={'Your Space'} video={'assets/demo_video.mp4'}
                               description={'Creating a digital twin is the first step towards converting your inspiration into a shoppable reality with LIVVY.'}/>
                    </Slider>
                </div>
            </div>
        </>
    )
}

interface SliderProps {
    index: number,
    title: string,
    subTitle: string,
    description: string,
    video: string
}

const Slide: FC<SliderProps> = ({index, title, subTitle, description, video}) => {
    const [playVideo, setPlayVideo] = useState<boolean>(false)


    return (
        <div>
            <div className="lg:flex flex-col lg:flex-row font-sans">
                <div className='lg:flex-auto onboarding-text-container relative pb-6'>
                    <div className='lg:absolute bottom-0 w-full'>
                        <p className='text-xl uppercase'>Step 0{index}</p>
                        <h1 className='text-6xl sm:text-8xl uppercase'>{title}</h1>
                        <h1 className='italic text-6xl sm:text-8xl font-thin mt-1'
                            style={{fontFamily: "PP Editorial New"}}>{subTitle}</h1>
                        <p className='w-4/5 sm:text-lg text-base mt-4'>{description}</p>
                    </div>
                </div>
                <div className="lg:flex-initial m-auto md:w-2/4 w-full relative">
                    <div className="relative lg:aspect-[9/16] lg:w-4/5">
                        <ReactPlayer url={video}
                                     playing={playVideo}
                                     muted={true}
                                     width='100%'
                                     height='100%'
                        />

                        {!playVideo &&
                            <button
                                className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
                                onClick={() => setPlayVideo(true)}>
                                <FontAwesomeIcon icon={faPlayCircle} size='4x'/>
                            </button>
                        }

                        {playVideo &&
                            <button className='absolute bottom-4 left-10 transform'
                                    onClick={() => setPlayVideo(false)}>
                                <FontAwesomeIcon icon={faPause} size='2x'/>
                            </button>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

