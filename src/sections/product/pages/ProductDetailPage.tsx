import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import {LivTag} from "../../../components/tags/LivTag.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";
import {Collapse} from "../../../components/Collapse.tsx";
import Slider from "react-slick";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as faSolidHeart} from "@fortawesome/free-solid-svg-icons";
import {similarProductsSlider, thumbnailProduct} from "../../../data/product.ts";

export const ProductDetailPage = () => {
    const {setBackgroundColor, setBackgroundType} = useMasterLayout()

    const similarProductsSliderRef = useRef<HTMLDivElement>(null)
    const [heroImageStyle, setHeroImageStyle] = useState({})

    const [quantity, setQuantity] = useState<number>(1)

    useEffect(() => {
        setBackgroundType('color')
        setBackgroundColor('white')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const similarProductsSliderSettings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5.5,
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
                    slidesToShow: 1.5,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const updateImage = (imgSrc: string) => {
        setHeroImageStyle({backgroundImage: `url('${imgSrc}')`})
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);

        if (value !== 0) {
            setQuantity(value);
        }
    }

    const increment = () => {
        setQuantity(quantity + 1);
    }

    const decrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="container">
            <div className="grid grid-cols-2 gap-12">
                <div className="images-wrapper">
                    <div className="hero-image">
                        <div className="main-image aspect-square bg-[url('/assets/product/5c49d5ca8d85c9a11bb4d54838f901fa.jpeg')] bg-cover bg-center" style={heroImageStyle}/>
                    </div>
                    <div className="thumbnails mt-7 ml-5">
                        <div className="flex items-center gap-2">
                            {
                                thumbnailProduct.map((thumbnailProduct) => (
                                    <img src={thumbnailProduct.src} alt="Product Thumbnail" className='w-16 h-16 cursor-pointer' onClick={() => updateImage(thumbnailProduct.src)}/>
                                ))
                            }
                            <Link to={'#'} className='flex items-center'>
                                <img src="/assets/product/view-space-icon.png" alt="View in your space." className='ms-6 me-2'/>
                                <span className='inline-block border-b border-b-black uppercase text-xs'>View in your space</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="details mt-9">
                    <div className="flex justify-end tag-list gap-1">
                        <LivTag backgroundColor='bg-transparent' text="Coffee Table"/>
                        <LivTag backgroundColor='bg-transparent' text="Industrial"/>
                    </div>

                    <div className="mt-5 mb-2.5">
                        <span className='uppercase text-xs'>Rove Concepts</span>
                    </div>

                    <h1 className='uppercase text-5xl mt-2.5 mb-3.5 max-w-sm'>Maria Coffee Table</h1>

                    <div className="price text-xl italic font-extralight mb-4" style={{fontFamily: "PP Editorial New"}}><span className='ps-1'>$1,234</span></div>

                    <div className="colors flex flex-row gap-4 mb-4">
                        <div className='bg-[#EFEDE7] rounded-full w-6 h-6 cursor-pointer'/>
                        <div className='bg-[#986954] rounded-full w-6 h-6 cursor-pointer'/>
                    </div>
                    <div className="counter mb-6">

                        <div className="sm:flex sm:justify-start sm:items-end">
                            <div className="flex justify-start items-center">
                                <button className="w-8 h-8 relative border border-black" onClick={decrement}>
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">-</span>
                                </button>
                                <input type='number'
                                       className="w-8 h-8 border-t border-b border-t-black border-b-black focus-visible:outline-0 p-1 text-center text-sm" value={quantity}
                                       onChange={onChangeHandler}
                                       onFocus={(e) => e.target.select()}
                                       style={{lineHeight: 16}}
                                />
                                <button className="w-8 h-8 relative border border-black" onClick={increment}>
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">+</span>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center cta gap-4 mb-16">
                        <LivButton
                            as={'button'}
                            type={'submit'}
                            style={'thick'}
                            text={'Add to cart'}
                            borderColor={'border-black'}
                            bgColor={'bg-white'}
                            textColor={'text-black'}
                            onWhiteBg={true}
                            className={'max-w-sm'}
                            fullWidth={true}
                        />

                        <span className='inline-block border-b border-b-black uppercase align-middle'><Link to={'/'}>See Similar Products</Link></span>
                    </div>

                    <div className="flex info-header justify-between">
                        <div className="title uppercase">
                            Overview
                        </div>
                        <p className='text-sm max-w-sm pb-7'>
                            Like a statue in a grand space, this stunning coffee table stands out with its monumental design and sophisticated aesthetic. The soft curves crafted from concrete bestows a refined
                            radiance.

                            <span className='inline-block border-b border-b-black uppercase align-middle mt-4'><Link to={'/'}>See More</Link></span>
                        </p>
                    </div>

                    <div>
                        <Collapse
                            borderColor={'black'}
                            textColor={'black'}
                            bgColor={'white'}
                            text={"Like a statue in a grand space, this stunning coffee table stands out with its monumental design and sophisticated aesthetic. The soft curves crafted from concrete bestows a refined radiance. Like a statue in a grand space, this stunning coffee table stands out with its monumental design and sophisticated aesthetic. The soft curves crafted from concrete bestows a refined radiance. Like a statue in a grand space, this stunning coffee table stands out with its monumental design and sophisticated aesthetic. The soft curves crafted from concrete bestows a refined radiance."}
                            title={"Details"}/>
                        <Collapse
                            borderColor={'black'}
                            textColor={'black'}
                            bgColor={'white'}
                            text={"Like a statue in a grand space, this stunning coffee table stands out with its monumental design and sophisticated aesthetic. The soft curves crafted from concrete bestows a refined radiance."}
                            title={"Dimensions"}
                        isLast={true}
                        />
                    </div>
                </div>
            </div>
            <div className="similar-products mt-14 mb-16">
                <h2 className='uppercase text-xl'>Shop Similar Products</h2>

                {/*@ts-expect-error: Ref doesn't work when we assign HTMLDivElement to the Slider*/}
                <Slider {...similarProductsSliderSettings} ref={similarProductsSliderRef}>
                    {
                        similarProductsSlider.map((similarProduct) => (
                            <Slide
                                title={similarProduct.title}
                                description={similarProduct.description}
                                image={similarProduct.image}
                                price={similarProduct.price}/>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

const Slide = ({image, title, description, price}: {
    image: string,
    title: string,
    description: string,
    price: number
}) => {
    const [hasLiked, setHasLiked] = useState<boolean>(false)

    return (
        <div className="similar-product mt-4 max-w-52 text-xs relative">
            <div className="like-btn absolute top-3 right-3 cursor-pointer" onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? (
                    <FontAwesomeIcon icon={faSolidHeart} className='text-base text-red-500'/>
                ) : (
                    <FontAwesomeIcon icon={faHeart} className='text-base'/>
                )}
            </div>
            <img src={image} alt=""/>
            <div className="name">{title}</div>
            <div className="description">{description}</div>
            <div className="price">${price}</div>
        </div>
    )
}