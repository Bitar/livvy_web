import {
    brandOptions,
    colorOptions,
    dimensionsOptions,
    materialOptions,
    priceOptions,
    similarProductSortOptions,
    similarProductsSlider
} from "../../../data/product.ts";
import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {ProductThumbnail} from "../partials/ProductThumbnail.tsx";
import clsx from "clsx";
import {LivSelect} from "../../../components/form/LivSelect.tsx";
import React, {useEffect, useState} from "react";
import {ProductImageWrapper} from "../partials/ProductImageWrapper.tsx";
import {Link} from "react-router-dom";
import {StickyContainer} from "../../../components/StickyContainer.tsx";


export const SimilarProducts = () => {
    const {setBackgroundColor, setBackgroundType, setHeaderBGColor} = useMasterLayout()
    const [showFilter, setShowFilter] = useState<boolean>(false)

    useEffect(() => {
        setHeaderBGColor('white');
        setBackgroundType('color')
        setBackgroundColor('white')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-12">
                <StickyContainer>
                    <ProductImageWrapper/>

                    <div className='mx-6 md:mx-0'>
                        <div className="mb-1 mt-6">
                            <span className='uppercase text-xs'>Rove Concepts</span>
                        </div>

                        <h1 className='uppercase text-2xl md:text-4xl xl:text-5xl mb-2'>Maria Coffee Table</h1>

                        <div className="price text-xl italic font-extralight" style={{fontFamily: "PP Editorial New"}}>
                            <span className='ps-1'>$1,234</span></div>

                        <span
                            className='hidden md:inline-block border-b border-b-black uppercase align-middle flex-wrap mt-4'><Link
                            to={'/product'}>full product details</Link></span>
                    </div>
                </StickyContainer>
                <div className="similar-products mx-6 md:mx-0">
                    <div className="xl:flex header justify-between items-center md:mt-9">
                        <h2 className='uppercase text-sm'>Shop Similar Products</h2>

                        <div className='flex gap-3 items-center text-xs'>
                            <button className='uppercase items-center flex' onClick={() => setShowFilter(!showFilter)}>
                                <span className='me-0.5'>Filter</span> <FontAwesomeIcon icon={faFilter}
                                                                                        className='pl-2'/>
                            </button>

                            <LivSelect placeholder={'Sort by'} name={'sort'} menuIsOpen={true} clearable={true}
                                       options={similarProductSortOptions}/>
                        </div>
                    </div>

                    {showFilter && (
                        <div className={clsx("filter-container xl:flex justify-between mb-1")}>
                            <LivSelect placeholder={'Price'} name={'price'} clearable={true} options={priceOptions}/>
                            <LivSelect placeholder={'Brand'} name={'brand'} clearable={true} options={brandOptions}/>
                            <LivSelect placeholder={'Material'} name={'material'} clearable={true}
                                       options={materialOptions}/>
                            <LivSelect placeholder={'Color'} name={'color'} clearable={true} options={colorOptions}/>
                            <LivSelect placeholder={'Dimensions'} name={'dimensions'} clearable={true}
                                       options={dimensionsOptions}/>
                        </div>
                    )}

                    {/*<div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10 h-full max-h-screen overflow-y-auto no-scrollbar">*/}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10 mt-6">
                        {
                            similarProductsSlider.map((similarProduct, index) => (
                                <ProductThumbnail key={`similarProduct-${index}`}
                                                  title={similarProduct.title}
                                                  description={similarProduct.description}
                                                  image={similarProduct.image}
                                                  price={similarProduct.price}/>
                            ))
                        }
                        {
                            similarProductsSlider.map((similarProduct, index) => (
                                <ProductThumbnail key={`similarProduct-${index}`}
                                                  title={similarProduct.title}
                                                  description={similarProduct.description}
                                                  image={similarProduct.image}
                                                  price={similarProduct.price}/>
                            ))
                        }
                        {
                            similarProductsSlider.map((similarProduct, index) => (
                                <ProductThumbnail key={`similarProduct-${index}`}
                                                  title={similarProduct.title}
                                                  description={similarProduct.description}
                                                  image={similarProduct.image}
                                                  price={similarProduct.price}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}