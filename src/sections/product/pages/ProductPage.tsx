import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {ChangeEvent, MutableRefObject, useEffect, useRef, useState} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";
import {Collapse} from "../../../components/Collapse.tsx";
import Slider from "react-slick";
import {similarProductsSlider} from "../../../data/product.ts";
import clsx from "clsx";
import {ProductThumbnail} from "../partials/ProductThumbnail.tsx";
import {ProductImageWrapper} from "../partials/ProductImageWrapper.tsx";
import {ProductTags} from "../partials/ProductTags.tsx";

export const ProductPage = () => {
    const {setBackgroundColor, setBackgroundType, setHeaderBGColor} = useMasterLayout()

    const similarProductsSliderRef: MutableRefObject<Slider> = useRef(null)

    const [quantity, setQuantity] = useState<number>(1)

    const [colorOne, setColorOne] = useState<boolean>(false)
    const [colorTwo, setColorTwo] = useState<boolean>(false)

    useEffect(() => {
        setHeaderBGColor('white');
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
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4.5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 1
                }
            },
        ]
    };

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-12">
                <ProductImageWrapper/>
                <div className="details md:mt-9 mx-6 md:mx-0">
                    <ProductTags className={'hidden md:flex'}/>

                    <div className="mb-1 md:mt-5 md:mb-2.5">
                        <span className='uppercase text-xs'>Rove Concepts</span>
                    </div>

                    <h1 className='uppercase text-2xl md:text-4xl mb-2 xl:text-5xl xl:mt-2.5 xl:mb-3.5 max-w-sm'>Maria Coffee Table</h1>

                    <div className="price text-xl italic font-extralight mb-4" style={{fontFamily: "PP Editorial New"}}><span className='ps-1'>$1,234</span></div>

                    <div className="colors flex flex-row gap-3 mb-4">
                        <div className={clsx('rounded-full p-0.5', {
                            'border border-black': colorOne,
                            'border border-transparent': !colorOne
                        })}
                             onClick={() => setColorOne(!colorOne)}>
                            <div className='bg-[#EFEDE7] rounded-full w-6 h-6 cursor-pointer'/>
                        </div>
                        <div className={clsx('rounded-full p-0.5', {
                            'border border-black': colorTwo,
                            'border border-transparent': !colorTwo
                        })}
                             onClick={() => setColorTwo(!colorTwo)}>
                            <div className='bg-[#986954] rounded-full w-6 h-6 cursor-pointer'/>
                        </div>
                    </div>

                    <div className="counter mb-6">
                        <div className="sm:flex sm:justify-start sm:items-end">
                            <div className="flex justify-start items-center">
                                <button className="w-8 h-8 relative border border-black" onClick={decrement}>
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">-</span>
                                </button>
                                <input type='number'
                                       className="w-8 h-8 border-t border-b border-t-black border-b-black focus-visible:outline-0 p-1 text-center text-sm rounded-none" value={quantity}
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

                    <div className="lg:flex items-center cta gap-4 mb-8 md:mb-16">
                        <LivButton
                            as={'button'}
                            type={'submit'}
                            style={'thick'}
                            text={'Add to cart'}
                            borderColor={'border-black'}
                            bgColor={'bg-white'}
                            textColor={'text-black'}
                            onWhiteBg={true}
                            className={'w-full lg:max-w-56 xl:max-w-sm mb-4 lg:mb-0'}
                            width={'custom'}
                        />

                        <span className='hidden md:inline-block border-b border-b-black uppercase align-middle flex-wrap'><Link to={'/product/similar'}>See Similar Products</Link></span>
                    </div>

                    <div className="flex info-header justify-between">
                        <div className="uppercase text-sm">
                            Overview
                        </div>
                        <div className='pb-7 ps-6 lg:ps-0'>
                            <p className='text-sm max-w-sm'>
                                Like a statue in a grand space, this stunning coffee table stands out with its monumental design and sophisticated aesthetic. The soft curves crafted from concrete bestows a refined
                                radiance.

                            </p>
                            <span className='inline-block border-b border-b-black uppercase align-middle mt-4 text-sm'><Link to={'/'}>See More</Link></span>
                        </div>
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
            <div className="similar-products mt-14 mb-16 mx-6 md:mx-0">
                <h2 className='uppercase text-2xl'>Shop Similar Products</h2>

                <Slider {...similarProductsSliderSettings} ref={similarProductsSliderRef} className='mt-4'>
                    {
                        similarProductsSlider.map((similarProduct, index) => (
                            <ProductThumbnail key={`similarProduct-${index}`}
                                              title={similarProduct.title}
                                              description={similarProduct.description}
                                              image={similarProduct.image}
                                              price={similarProduct.price}
                                              className='max-w-52 me-4'/>
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}
