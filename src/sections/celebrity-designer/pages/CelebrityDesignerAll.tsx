import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";
import {faCircle as faCircleReg} from "@fortawesome/free-regular-svg-icons";

export const CelebrityDesignerAll = () => {
    const {setBackgroundType, setBackgroundColor, setShowFooter} = useMasterLayout()

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setShowFooter(false);
    }, []);

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2.5,
        slidesToScroll: 1
    };

    return (
        <>
            <div id="designers-list">
                <div className="container liv-container">
                    <div className="flex justify-between items-center sm:mb-20 mb-8">
                        <h1 className={'text-4xl md:text-5xl lg:text-7xl uppercase'}>designer with <br/> <span
                            style={{fontFamily: "PP Editorial New"}}
                            className="font-thin italic capitalize">an expert</span>
                        </h1>

                        <p className="max-w-sm text-sm">By partnering with some of the most well known industry icons, you
                            can
                            replicate their personalized style in your own home. Livvy’s technology has the ability to
                            mirror
                            their design aesthetic with precision and authenticity while meeting your budget and style
                            preferences.</p>
                    </div>

                    <div className="grid xl:grid-cols-4 xl:gap-4">
                        <CelebrityCard name={'shea mcgee'} bio={'Interior Designer, Media Personality'} slug={'shea-mcgee'}
                                       image={'/assets/celebrities/shea-mcgee.png'} rate={'$100'}/>
                        <CelebrityCard name={'kim kardashian'} bio={'Entrepreneur, Media Personality'}
                                       slug={'kim-kardashian'} image={'/assets/celebrities/kim-kardashian.jpg'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'drew & jonathan scott'} bio={'Interior Designers, Media Personalities'}
                                       slug={'scott-brothers'} image={'/assets/celebrities/drew-and-jonathan-scott.jpg'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'nate berkus'} bio={'Interior Designer, Media Personality'}
                                       slug={'nate-berkus'} image={'/assets/celebrities/nate-berkus.jpg'} rate={'$100'}/>
                        <CelebrityCard name={'joanna gaines'} bio={'Interior Designer, Media Personality'}
                                       slug={'joanna-gaines'} image={'/assets/celebrities/joanna-gaines.png'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'kelly wearstler'} bio={'Entrepreneur, Media Personality'}
                                       slug={'kelly-wearstler'} image={'/assets/celebrities/kelly-wearstler.png'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'bridgette romanek'} bio={'Interior Designer, Media Personality'}
                                       slug={'bridgette-romanek'} image={'/assets/celebrities/bridgette-romanek.png'}
                                       rate={'$100'}/>
                        <CelebrityCard name={'galey alix'} bio={'Interior Designer, Media Personality'} slug={'galey-alix'}
                                       image={'/assets/celebrities/galey-alix.jpg'} rate={'$100'}/>
                    </div>

                    <div className="flex justify-center">
                        <LivButton text={'see more'} borderColor={'border-black'} bgColor={'bg-transparent'}
                                   arrowIconDirection={'down'} style={'thick'}/>
                    </div>
                </div>
            </div>


            <div id="how-it-works" className="bg-black">
                <div className="container liv-container">
                    <div className="flex justify-between items-center sm:mb-20 mb-8">
                        <h1 className={'text-4xl md:text-5xl lg:text-7xl uppercase text-white'}>how it <br/> <span
                            style={{fontFamily: "PP Editorial New"}}
                            className="font-thin italic capitalize">works</span>
                        </h1>

                        <p className="max-w-sm text-sm text-white">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Accusamus atque blanditiis ducimus iusto, nam quis ratione tenetur vero. Ad aliquid
                            cum deleniti dolore, ipsa libero perspiciatis provident quos unde velit.</p>
                    </div>

                    <div>
                        <Slider {...settings}>
                            <Slide title={'Discover Your Celebrity Inspiration'} image={'/assets/celebrities/interior-1.jpeg'} description={'Explore our library to find your perfect style match! Whether you love cozy vibes, modern elegance, or something in between, you will be able to find a Celebrity Designer that speaks to your aesthetic.'}/>
                            <Slide title={'Share Your Preferences'} image={'/assets/celebrities/interior-2.jpg'} description={'You\'ll have the opportunity to share your own design preferences with us and share what makes your dream home unique. You can input your preferred color schemes, furniture styles, and any specific elements you admire from your chosen celebrity\'s style.'}/>
                            <Slide title={'Personalized Design Recommendations'} image={'/assets/celebrities/interior-3.jpeg'} description={'From this information, our AI technology will create customized design recommendations and apply them to your existing space, encompassing furniture pieces, decor items, color palettes, and layout options that perfectly blend the iconic style of your chosen celebrity with your individual tastes.'}/>
                            <Slide title={'Lorem ipsum dolor sit amet'} image={'/assets/celebrities/interior-4.jpg'} description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto autem earum eveniet officia omnis quaerat sit. A adipisci cum, dolor eos excepturi odit quae qui totam. Exercitationem nisi, quos.'}/>
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
        <div className="mb-12">
            <div
                className={`w-full aspect-[3/4] bg-cover bg-no-repeat bg-center rounded-lg relative mb-2.5`}
                style={{backgroundImage: `url(${image})`}}>
                <span
                    className="uppercase px-3 py-2 min-w-24 rounded-full border border-black absolute z-10 right-3 top-3 text-xs bg-liv-tan">{rate}/design</span>
                <Link to={`/celebrities-designers/${slug}`} className="absolute top-0 left-0 h-full w-full z-20"/>
            </div>

            <Link to={`/celebrities-designers/${slug}`} className="uppercase block">{name}</Link>
            <p className="text-xs">{bio}</p>
        </div>
    )
}

const Slide = ({image, title, description} : {image: string, title: string, description: string}) => {
    return (
        <div className="mx-7">
            <div className="w-full h-[600px] bg-cover bg-no-repeat bg-center mb-6" style={{backgroundImage: `url('${image}')`}}></div>

            <p className="uppercase text-lg text-white mb-4">{title}</p>
            <p className="text-xs text-white">{description}</p>
        </div>
    )
}