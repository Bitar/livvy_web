import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import React, {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faPinterest, faTiktok} from "@fortawesome/free-brands-svg-icons";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {faMinus, faPause, faPlay, faPlus} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import Slider from "react-slick";

export const CelebrityDesignerProfile = () => {
    const {setBackgroundType, setBackgroundColor, setShowFooter} = useMasterLayout()

    const [showPlayButton, setShowPlayButton] = useState<boolean>(true);
    const [showPauseButton, setShowPauseButton] = useState<boolean>(false);

    const [activeTab, setActiveTab] = useState<'portfolio' | 'livvy'>('portfolio');

    const videoRef = useRef<any>(null);

    const settings = {
        className: "center",
        arrows: false,
        centerMode: true,
        infinite: true,
        centerPadding: "200px",
        slidesToShow: 1,
        speed: 500,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    centerPadding: '100px'
                }
            },
            {
                breakpoint: 890,
                settings: {
                    centerPadding: '70px'
                }
            }
        ]
    };

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setShowFooter(false);
    }, []);

    const playVideo = () => {
        videoRef.current?.play();

        // hide the play button
        setShowPlayButton(false);
        // activate the pause button
        setShowPauseButton(true);
    }

    const pauseVideo = () => {
        videoRef.current?.pause();

        // hide the pause button and show the play button
        setShowPauseButton(false);
        setShowPlayButton(true);
    }

    const toggleTab = (tab: 'portfolio' | 'livvy') => {
        setActiveTab(tab);
    }

    return (
        <div>
            <div id="intro">
                <div className="md:grid md:grid-cols-2">
                    <div
                        className="bg-[url('/assets/celebrities/shea-mcgee.png')] bg-cover bg-no-repeat bg-center w-full h-[460px] md:h-screen"></div>

                    <div className="relative">
                        <div className="md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:z-20 w-full px-8 lg:px-16 py-10 md:py-28 lg:py-36">
                            <h1 className="uppercase text-5xl lg:text-7xl">studio <br/> <span
                                style={{fontFamily: "PP Editorial New"}}
                                className="font-thin italic capitalize text-5xl lg:text-6xl">McGee</span></h1>
                            <div className="lg:flex lg:justify-start lg:items-center mb-3.5">
                                <h2 className="text-sm lg:border-e lg:border-e-black inline-block lg:pe-2 lg:me-2">Interior
                                    Designer,
                                    Media Personality</h2>
                                <div className="lg:inline-block">
                                    <div className="flex justify-start items-center">
                                        <a href="https://www.instagram.com/" target={'_blank'}><FontAwesomeIcon icon={faInstagram} className="text-lg me-2.5"/></a>

                                        <a href="https://www.tiktok.com/" target={'_blank'}><FontAwesomeIcon icon={faTiktok} className="text-lg me-2.5"/></a>

                                        <a href="https://pinterest.com/" target={'_blank'}><FontAwesomeIcon icon={faPinterest} className="text-lg"/></a>
                                    </div>
                                </div>

                            </div>

                            <div className="mb-6 md:mb-8">
                                <span
                                    className="uppercase px-2 py-1 lg:px-3 lg:py-2 min-w-24 rounded-full border border-black text-xs bg-liv-tan">$100/design</span>
                            </div>

                            <p className="mb-4 md:mb-8 text-sm">
                                Led by husband-and-wife team Syd (Chief Executive Officer) and Shea (Chief Creative
                                Officer), Studio McGee Inc. is involved in both the interior design and product sides of
                                the home design business with the company’s portfolio of brands, Studio McGee and McGee
                                & Co. Studio McGee is first and foremost an interior design firm, growing into a
                                multi-disciplinary design house and content hub since its inception in 2014.
                            </p>

                            <p className="mb-4 md:mb-8 text-sm">
                                In addition to our portfolio of luxury design clients both domestic and international,
                                Studio McGee creates thoughtful, guide-focused design and lifestyle content for fans to
                                replicate the Studio McGee aesthetic on their own, the Netflix-based television series
                                Dream Home Makeover, two best-selling books, Make Life Beautiful and The Art of Home, as
                                well as partnerships with preeminent brands including Target, Kohler, Ann Sacks, and
                                MasterClass.
                            </p>

                            <div>
                                <div className="inline-block">
                                    <LivButton as={'a'} text={'create a custom design'} textColor={'text-white'}
                                               borderColor={'border-black'} bgColor={'bg-black'} url={'#'}
                                               style={'thin'} className="text-sm md:text-base"/>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>

            <div id="celebrity-profile-intro-video" className='relative'>
                <div className={clsx("play-button absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-10", {
                    'hidden': !showPlayButton
                })}>
                    <button
                        className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 uppercase text-black text-xs px-4 py-2 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-80")}
                        onClick={playVideo}><FontAwesomeIcon icon={faPlay} className="text-[10px] me-1.5"/>
                        <span>introduction</span></button>
                </div>

                <div className={clsx("pause-button absolute z-10 top-0 left-0 w-full h-full bg-black bg-opacity-10", {
                    'active': showPauseButton
                })}>
                    <button
                        className={clsx("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 uppercase text-black text-xs px-4 py-2 bg-white bg-opacity-70 rounded-lg hover:bg-opacity-80")}
                        onClick={pauseVideo}><FontAwesomeIcon icon={faPause} className="text-[10px] me-1.5"/>
                        <span>introduction</span></button>
                </div>

                <video src={'https://storage.googleapis.com/livvy-app/assets/livvy-intro.mp4'} autoPlay={false}
                       controls={false} loop={false} ref={videoRef}
                       muted={true} poster={`/assets/celebrities/shea-mcgee-2.jpeg`}
                       className="w-full h-auto"/>
            </div>

            <div id="featured-interiors" className="py-14 lg:py-20">
                <div className="mb-8 lg:mb-16">
                    <h3 className={'text-2xl md:text-4xl uppercase mb-2 md:mb-0 text-center'}>featured <span
                        style={{fontFamily: "PP Editorial New"}}
                        className="font-thin italic capitalize">interiors</span>
                    </h3>
                </div>

                <div className="text-center mb-12">
                    <div className='inline-block border-b border-b-[#D1CCC1]'>
                        <button className={clsx("uppercase text-sm px-4 py-1.5 border-b-black hover:border-b-2", {
                            'border-b-2': activeTab == 'portfolio'
                        })} onClick={() => toggleTab('portfolio')}>portfolio
                        </button>
                        <button className={clsx("uppercase text-sm px-4 py-1.5 border-b-black hover:border-b-2", {
                            'border-b-2': activeTab == 'livvy'
                        })} onClick={() => toggleTab('livvy')}>livvy created
                        </button>
                    </div>
                </div>

                <div id="tab-portfolio" className={clsx("animate__animated", {
                    "hidden": activeTab != 'portfolio',
                    "animate__fadeIn": activeTab == 'portfolio'
                })}>
                    <Slider {...settings}>
                        <Slide image={'/assets/celebrities/featured-interior-1.webp'}/>
                        <Slide image={'/assets/celebrities/featured-interior-2.jpeg'}/>
                        <Slide image={'/assets/celebrities/featured-interior-3.jpeg'}/>
                        <Slide image={'/assets/celebrities/featured-interior-4.jpeg'}/>
                    </Slider>
                </div>

                <div id="tab-livvy" className={clsx("animate__animated", {
                    "hidden": activeTab != 'livvy',
                    "animate__fadeIn": activeTab == 'livvy'
                })}>
                    <Slider {...settings}>
                        <Slide image={'/assets/celebrities/featured-interior-1.webp'}/>
                        <Slide image={'/assets/celebrities/featured-interior-2.jpeg'}/>
                        <Slide image={'/assets/celebrities/featured-interior-3.jpeg'}/>
                        <Slide image={'/assets/celebrities/featured-interior-4.jpeg'}/>
                    </Slider>
                </div>
            </div>

            <div id="how-we-make-expert" className="bg-black py-10">
                <div className="container liv-container">
                    <div className="md:grid md:grid-cols-2">
                        <div
                            className="w-full h-[400px] md:h-full bg-[url('/assets/celebrities/interior-5.png')] bg-cover bg-no-repeat bg-center"></div>

                        <div className="md:ps-10 xl:ps-24 relative mt-6 md:mt-64">
                            <div className="mb-8 xl:mb-14">
                                <span className="uppercase text-lg text-white">how we</span>
                                <h3 className="uppercase text-4xl lg:text-5xl xl:text-7xl text-white">make expert <br/> <span
                                    style={{fontFamily: "PP Editorial New"}}
                                    className="font-thin italic capitalize text-3xl lg:text-6xl">design accessible</span></h3>
                            </div>

                            <div>
                                <FAQ title={'Our AI learns from thousands of images of the designer’s work'}
                                     text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dicta eaque enim excepturi ipsam nemo nulla, odit omnis possimus quae repellendus, tempore veniam. Accusamus, consequatur ipsa ipsam modi nemo numquam'}/>

                                <FAQ title={'Our technology takes those images and creates a curated design'}
                                     text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dicta eaque enim excepturi ipsam nemo nulla, odit omnis possimus quae repellendus, tempore veniam. Accusamus, consequatur ipsa ipsam modi nemo numquam'}/>

                                <FAQ title={'The design is sent to the designer’s team'}
                                     text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dicta eaque enim excepturi ipsam nemo nulla, odit omnis possimus quae repellendus, tempore veniam. Accusamus, consequatur ipsa ipsam modi nemo numquam'}/>

                                <FAQ title={'Get the designer’s stamp of approval'}
                                     text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dicta eaque enim excepturi ipsam nemo nulla, odit omnis possimus quae repellendus, tempore veniam. Accusamus, consequatur ipsa ipsam modi nemo numquam'}/>

                                <FAQ title={'Receive a beautiful space without breaking the bank'}
                                     text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur, dicta eaque enim excepturi ipsam nemo nulla, odit omnis possimus quae repellendus, tempore veniam. Accusamus, consequatur ipsa ipsam modi nemo numquam'}
                                     isLast={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Slide = ({image}: { image: string }) => {
    return (
        <div className="px-4 md:px-8 lg:px-16">
            <div className="w-full h-[260px] md:h-[500px] lg:h-[700px] bg-cover bg-no-repeat bg-center"
                 style={{backgroundImage: `url('${image}')`}}></div>
        </div>

    )
}

const FAQ = ({title, text, isLast = false}: { title: string, text: string, isLast?: boolean }) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={clsx("border-t border-t-white text-white py-4 xl:py-5", {
            'border-b border-b-white': isLast
        })}>
            <div className="flex justify-between items-center">
                <span className="uppercase me-2.5 text-xs lg:text-sm">{title}</span>
                <button><FontAwesomeIcon icon={show ? faMinus : faPlus} onClick={() => setShow(!show)}/></button>
            </div>

            <p className={clsx("mt-4 me-6 text-sm animate__animated", {
                'hidden': !show,
                'animate__fadeIn': show
            })}>
                {text}
            </p>
        </div>
    )
}