import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {useEffect} from "react";
import {LivTag} from "../../../components/tags/LivTag.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";

export const ProductDetailPage = () => {
    const {setBackgroundColor, setBackgroundType, setHeaderTextColor} = useMasterLayout()

    useEffect(() => {
        setBackgroundType('color')
        setBackgroundColor('#ffffff')
        setHeaderTextColor('black')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container">
            <div className="grid grid-cols-2">
                <div className="thumbnail-wrapper">
                    <div className="main-image">
                        <img src="/assets/product/4ddf573a73d59eae36b8b10ff5d4e340.png" alt="Product Name's Image"/>
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

                    <h1 className='uppercase text-5xl mt-2.5 mb-3.5'>Maria Coffee Table</h1>

                    <div className="price text-xl italic font-extralight mb-4" style={{fontFamily: "PP Editorial New"}}><span className='ps-1'>$1,234</span></div>

                    <div className="colors flex flex-row gap-4 mb-4">
                        <div className='bg-[#EFEDE7] rounded-full w-6 h-6'/>
                        <div className='bg-[#986954] rounded-full w-6 h-6'/>
                    </div>
                    <div className="counter mb-6"></div>
                    <div className="flex items-center cta gap-4">
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

                        <div>
                            <span className='inline-block border-b border-b-black uppercase align-middle'>See Similar Products</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}