import {Background} from "../../../modules/background/Background.tsx";
import React, {useState} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import Slider from "react-slick";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const BetaVersions = () => {
    const [video, setVideo] = useState<string>('https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4');

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1439,
                settings: {
                    slidesToShow: 3
                }
            },
            // {
            //     breakpoint: 767,
            //     settings: {
            //         slidesToShow: 2
            //     }
            // },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    // TODO get all videos from backend and set the video to the first one
    const switchVideo = (newVideo: string) => {
        if(newVideo != video) {
            setVideo(newVideo);
        }
    }

    return (
        <div>
            <Background type='color' color='liv-tan'/>

            <div className="py-3.5">
                <img src="/assets/livvy-logo-black.png" alt="livvy logo black" className="w-20 m-auto"/>
            </div>

            <div className="container">
                <video src={video} autoPlay={false}
                       controls={true} loop={false}
                       muted={true} poster={`/assets/livvy-intro-poster.jpg`}
                       className="w-full h-auto"/>
            </div>

            <div className='border-b border-b-black'>
                <div className="container p-4">
                    <div className="sm:flex sm:justify-start sm:items-center">
                        <div className="text-md block sm:inline-block sm:text-xl mb-2 sm:mb-0">
                            <span className="font-semibold uppercase me-1">version
                                1</span> <span
                            className="capitalize me-4">- capture your space</span>
                        </div>

                        <LivButton as={'a'} url={'#'}
                                   text={'survey'}
                                   borderColor={'border-black'}
                                   bgColor={'bg-black'}
                                   textColor={'text-white'}
                                   style={'thin'}/>
                    </div>
                </div>
            </div>

            <div className="container py-7 px-4">
                <Slider {...settings}>
                    <VideoPreview clickHandler={() => switchVideo('https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4')}/>
                    <VideoPreview clickHandler={() => switchVideo('/assets/bed-1.mp4')} />
                    <VideoPreview clickHandler={() => switchVideo('https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4')} />
                    <VideoPreview clickHandler={() => switchVideo('https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4')} />
                    <VideoPreview clickHandler={() => switchVideo('https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4')} />
                </Slider>
            </div>
        </div>
    )
}

const VideoPreview = ({clickHandler} : {clickHandler : () => void}) => {
    return (
        <div>
            <div className="relative bg-no-repeat bg-cover bg-center w-full h-32 sm:w-48 sm:h-28 lg:w-72 lg:h-36 rounded-lg"
                 style={{backgroundImage: "url('/assets/livvy-intro-poster.jpg')"}}>
                <button className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 rounded-lg" onClick={clickHandler}>
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full">
                        <FontAwesomeIcon icon={faPlay}
                                         className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"/>
                    </div>
                </button>
            </div>

            <div className="mt-2">
                <span className="text-sm"><span className="uppercase">Version 2</span> - Coming soon</span>
            </div>

        </div>

    )
}