import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {useEffect} from "react";
import {LivTag} from "../../../components/tags/LivTag.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";
import {Collapse} from "../../../components/Collapse.tsx";

export const ProductDetailPage = () => {
    const {setBackgroundColor, setBackgroundType} = useMasterLayout()

    useEffect(() => {
        setBackgroundType('color')
        setBackgroundColor('white')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className="grid grid-cols-2 gap-5">
                <div className="thumbnail-wrapper">
                    <div className="main-image aspect-square bg-[url('/assets/product/5c49d5ca8d85c9a11bb4d54838f901fa.jpeg')]"/>
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
                        <div className='bg-[#EFEDE7] rounded-full w-6 h-6'/>
                        <div className='bg-[#986954] rounded-full w-6 h-6'/>
                    </div>
                    <div className="counter mb-6">

                        <div className="sm:flex sm:justify-start sm:items-end">
                            <div className="flex justify-start items-center">
                                <button className="w-8 h-8 relative border border-black" onClick={() => console.log('decrement')}>
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">-</span>
                                </button>
                                <input type='number'
                                       className="w-8 h-8 border-t border-b border-t-black border-b-black focus-visible:outline-0 p-1 text-center text-sm" value={0}
                                       onChange={() => console.log('onChangeHandler for Number')}
                                       onFocus={(e) => e.target.select()}
                                       style={{lineHeight: 16}}
                                />
                                <button className="w-8 h-8 relative border border-black" onClick={() => console.log('increment')}>
                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">+</span>
                                </button>
                            </div>

                            {/*<button className="uppercase underline text-sm mt-2.5 sm:mt-0 sm:ms-4" onClick={() => console.log('On Remove handler')}>remove</button>*/}
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
                        <p className='text-sm max-w-sm pb-4'>
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
                            title={"Dimensions"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}