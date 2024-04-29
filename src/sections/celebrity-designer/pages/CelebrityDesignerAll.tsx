import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import Slider from "react-slick";

export const CelebrityDesignerAll = () => {
    const {setBackgroundType, setBackgroundColor} = useMasterLayout()

    const howItWorksSliderRef = useRef<any>(null);
    const featuredSliderRef = useRef<any>(null);

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
    }, []);

    const howItWorksSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1.5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 890,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 640,
                settings: {
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const featuredSettings = {
        arrows: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    autoplay: true
                }
            }
        ]
    };

    return (
        <>
            <div id="designers-list">
                <div className="container liv-container sm:!py-16">
                    <div className="md:flex md:justify-between md:items-center mb-8 mb:mb-20">
                        <h1 className={'text-4xl lg:text-5xl xl:text-7xl uppercase mb-2 md:mb-0'}>designer with <br/>
                            <span
                                style={{fontFamily: "PP Editorial New"}}
                                className="font-thin italic capitalize">an expert</span>
                        </h1>

                        <p className="md:max-w-sm text-sm">By partnering with some of the most well known industry
                            icons, you
                            can
                            replicate their personalized style in your own home. Livvy’s technology has the ability to
                            mirror
                            their design aesthetic with precision and authenticity while meeting your budget and style
                            preferences.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4">
                        <CelebrityCard name={'shea mcgee'} bio={'Interior Designer, Media Personality'}
                                       slug={'shea-mcgee'}
                                       image={'/assets/celebrities/shea-mcgee.png'} rate={'$100'}/>
                        <CelebrityCard name={'kim kardashian'} bio={'Entrepreneur, Media Personality'}
                                       slug={'kim-kardashian'} image={'/assets/celebrities/kim-kardashian.jpg'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'drew & jonathan scott'} bio={'Interior Designers, Media Personalities'}
                                       slug={'scott-brothers'} image={'/assets/celebrities/drew-and-jonathan-scott.jpg'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'nate berkus'} bio={'Interior Designer, Media Personality'}
                                       slug={'nate-berkus'} image={'/assets/celebrities/nate-berkus.jpg'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'joanna gaines'} bio={'Interior Designer, Media Personality'}
                                       slug={'joanna-gaines'} image={'/assets/celebrities/joanna-gaines.png'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'kelly wearstler'} bio={'Entrepreneur, Media Personality'}
                                       slug={'kelly-wearstler'} image={'/assets/celebrities/kelly-wearstler.png'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'bridgette romanek'} bio={'Interior Designer, Media Personality'}
                                       slug={'bridgette-romanek'} image={'/assets/celebrities/bridgette-romanek.png'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'galey alix'} bio={'Interior Designer, Media Personality'}
                                       slug={'galey-alix'}
                                       image={'/assets/celebrities/galey-alix.jpg'} rate={'$100'}/>
                    </div>

                    <div className="flex justify-center">
                        <LivButton text={'see more'} borderColor={'border-black'} bgColor={'bg-transparent'}
                                   arrowIconDirection={'down'} style={'thick'}/>
                    </div>
                </div>
            </div>

            <div id="how-it-works" className="bg-black">
                <div className="container sm:!py-16 liv-container">
                    <div className="md:flex md:justify-between md:items-center mb-6">
                        <h2 className={'text-5xl lg:text-7xl uppercase text-white mb-4 md:mb-0'}>how it <br/> <span
                            style={{fontFamily: "PP Editorial New"}}
                            className="font-thin italic capitalize">works</span>
                        </h2>

                        <p className="md:max-w-sm text-sm text-white">Lorem ipsum dolor sit amet, consectetur
                            adipisicing
                            elit. Accusamus atque blanditiis ducimus iusto, nam quis ratione tenetur vero. Ad aliquid
                            cum deleniti dolore, ipsa libero perspiciatis provident quos unde velit.</p>
                    </div>

                    <div className="relative">
                        <button
                            className="w-10 hidden sm:inline-block absolute sm:-right-4 min-[891px]:-right-14 xl:-right-20 top-1/2 -translate-y-1/2 z-10"
                            onClick={() => howItWorksSliderRef?.current?.slickNext()}>
                            <img src="/assets/arrow-white.svg" alt="" className={'w-full'}/>
                        </button>

                        <button
                            className="w-10 absolute hidden sm:inline-block sm:-left-4 lg:-left-14 xl:-left-20 top-1/2 -translate-y-1/2 z-10 -scale-x-100"
                            onClick={() => howItWorksSliderRef?.current?.slickPrev()}>
                            <img src="/assets/arrow-white.svg" alt="" className={'w-full'}/>
                        </button>

                        <Slider {...howItWorksSettings} ref={howItWorksSliderRef}>
                            <Slide title={'Discover Your Celebrity Inspiration'}
                                   image={'/assets/celebrities/interior-1.jpeg'}
                                   description={'Explore our library to find your perfect style match! Whether you love cozy vibes, modern elegance, or something in between, you will be able to find a Celebrity Designer that speaks to your aesthetic.'}
                                   index={1}/>
                            <Slide title={'Share Your Preferences'} image={'/assets/celebrities/interior-2.jpg'}
                                   description={'You\'ll have the opportunity to share your own design preferences with us and share what makes your dream home unique. You can input your preferred color schemes, furniture styles, and any specific elements you admire from your chosen celebrity\'s style.'}
                                   index={2}/>
                            <Slide title={'Personalized Design Recommendations'}
                                   image={'/assets/celebrities/interior-3.jpeg'}
                                   description={'From this information, our AI technology will create customized design recommendations and apply them to your existing space, encompassing furniture pieces, decor items, color palettes, and layout options that perfectly blend the iconic style of your chosen celebrity with your individual tastes.'}
                                   index={3}/>
                            <Slide title={'Lorem ipsum dolor sit amet'} image={'/assets/celebrities/interior-4.jpg'}
                                   description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto autem earum eveniet officia omnis quaerat sit. A adipisci cum, dolor eos excepturi odit quae qui totam. Exercitationem nisi, quos.'}
                                   index={4}/>
                        </Slider>
                    </div>
                </div>
            </div>

            <div id="featured-interiors">
                <div className="container liv-container sm:!py-16">
                    <h2 className={'text-5xl uppercase text-black text-center mt-6 mb-6 md:mb-12 md:mt-16'}>featured <span
                        style={{fontFamily: "PP Editorial New"}}
                        className="font-thin italic capitalize">interiors</span>
                    </h2>

                    <div className="relative mb-8 md:mb-28">
                        <button
                            className="w-12 h-12 absolute hidden md:inline-block right-8 top-1/2 -translate-y-1/2 z-10 border border-black rounded-full"
                            onClick={() => featuredSliderRef?.current?.slickNext()}>
                            <img src="/assets/arrow-black.svg" alt="next nav arrow"
                                 className={'w-4 h-auth absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20'}/>
                        </button>

                        <button
                            className="w-12 h-12 hidden md:inline-block absolute left-8 top-1/2 -translate-y-1/2 z-10 -scale-x-100 border border-black rounded-full"
                            onClick={() => featuredSliderRef?.current?.slickPrev()}>
                            <img src="/assets/arrow-black.svg" alt="prev nav arrow"
                                 className={'w-4 h-auth absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20'}/>
                        </button>

                        <Slider {...featuredSettings} ref={featuredSliderRef}>
                            <FeaturedSlide image={'/assets/celebrities/featured-interior-1.webp'} title={'crest house'}
                                           signature={'/assets/celebrities/signature.svg'}/>
                            <FeaturedSlide image={'/assets/celebrities/featured-interior-2.jpeg'} title={'tree house'}
                                           signature={'/assets/celebrities/signature.svg'}/>
                            <FeaturedSlide image={'/assets/celebrities/featured-interior-3.jpeg'} title={'other house'}
                                           signature={'/assets/celebrities/signature.svg'}/>
                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

const CelebrityCard = ({name, bio, slug, image, rate}: {
    name: string,
    bio: string,
    slug: string,
    image: string,
    rate: string
}) => {
    return (
        <div className="mb-6 md:mb-12">
            <div
                className={`w-full aspect-[3/4] bg-cover bg-no-repeat bg-center rounded-lg relative mb-2.5`}
                style={{backgroundImage: `url(${image})`}}>
                <span
                    className="uppercase px-2 py-1 lg:px-3 lg:py-2 min-w-24 rounded-full border border-black absolute z-10 right-3 top-3 text-xs bg-liv-tan">{rate}/design</span>
                <Link to={`/celebrity-designers/${slug}`} className="absolute top-0 left-0 h-full w-full z-20"/>
            </div>

            <Link to={`/celebrity-designers/${slug}`} className="uppercase block">{name}</Link>
            <p className="text-xs">{bio}</p>
        </div>
    )
}

const Slide = ({image, title, description, index}: {
    image: string,
    title: string,
    description: string,
    index: number
}) => {
    return (
        <div className="relative !pb-0 md:p-11 sm:p-8 p-0">
            <span className="text-7xl text-white absolute top-4 left-4 z-20">{`${index}`.padStart(2, '0')}</span>
            <span className="absolute left-0 top-0 z-10 h-full w-full bg-opacity-20 bg-black"></span>

            <div className="w-full h-[400px] md:h-[600px] bg-cover bg-no-repeat bg-center mb-6"
                 style={{backgroundImage: `url('${image}')`}}></div>

            <p className="uppercase text-lg text-white mb-4">{title}</p>
            <p className="text-xs text-white">{description}</p>
        </div>
    )
}

const FeaturedSlide = ({image, title, signature}: { image: string, title: string, signature: string }) => {
    return (
        <div className="md:px-24 lg:px-32">
            <div className="w-full h-[400px] md:h-[700px] bg-cover bg-no-repeat bg-center relative"
                 style={{backgroundImage: `url('${image}')`}}>
                <span className="absolute left-0 top-0 z-10 h-full w-full bg-opacity-40 bg-black"></span>

                <div
                    className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 border border-white w-56 sm:w-72 h-44">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-full">
                        <p className="text-center text-white uppercase text-2xl mb-2">{title}</p>

                        <p className="uppercase text-white text-xs text-center flex justify-center items-baseline">
                            <span className="me-2">designed by</span> <span className="border-b border-b-white"><img
                            className="w-16 h-auto" src={signature} alt="signature"/></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}