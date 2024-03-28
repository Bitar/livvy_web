import ReactPlayer from "react-player";
import {useState} from "react";
import {faPlayCircle, faPause} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Onboarding = () => {
    const [playVideo, setPlayVideo] = useState<boolean>(false)

    return (
        <>
            <div id='onboarding' className='text-white'>

                <div className="container pt-10">
                    <div className="flex font-sans">
                        <div className='flex-auto onboarding-text-container relative'>
                            <div className='absolute p-6 bottom-0 w-full'>
                                <p className='text-xl uppercase'>Step 01</p>
                                <h1 className='text-8xl uppercase'>Capture</h1>
                                <h1 className='italic text-7xl font-thin mt-1'
                                    style={{fontFamily: "PP Editorial New"}}>Your Space</h1>
                                <p className='w-4/5 text-lg mt-4'>Creating a digital twin is the first step towards
                                    converting your inspiration into a
                                    shoppable reality with LIVVY.</p>
                            </div>
                        </div>
                        <div className="flex-initial w-2/4 relative">
                            <div className="relative aspect-[9/16] w-4/5">
                                <ReactPlayer url='assets/dummy_video.mp4'
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

                    {/*<div className="columns-2 pt-10">*/}
                    {/*    <div className='onboarding-text-container h-auto'>*/}
                    {/*        <p>Step 01</p>*/}
                    {/*        <h1>Capture <i>Your Space</i></h1>*/}
                    {/*        <p>Creating a digital twin is the first step towards converting your inspiration into a*/}
                    {/*            shoppable reality with LIVVY.</p>*/}
                    {/*    </div>*/}
                    {/*    <div className='onboarding-video-container'>*/}
                    {/*        <video src={toAbsoluteUrl(`assets/dummy_video.mp4`)} autoPlay={true} controls={false}*/}
                    {/*               loop={true}*/}
                    {/*               muted={true} poster={toAbsoluteUrl('assets/livvy-intro-poster.jpg')}*/}
                    {/*               className="-z-20 aspect-[9/16] w-4/5"/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </>
    )
}

