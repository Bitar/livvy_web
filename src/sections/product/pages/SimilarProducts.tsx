import {brandOptions, colorOptions, dimensionsOptions, materialOptions, priceOptions, similarProductSortOptions, similarProductsSlider, thumbnailProduct} from "../../../data/product.ts";
import {Link} from "react-router-dom";
import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter} from "@fortawesome/free-solid-svg-icons";
import {ProductThumbnail} from "../partials/ProductThumbnail.tsx";
import clsx from "clsx";
import {LivSelect} from "../../../components/form/LivSelect.tsx";
import React, {useEffect, useState} from "react";


export const SimilarProducts = () => {
    const {setBackgroundColor, setBackgroundType} = useMasterLayout()
    const [heroImageStyle, setHeroImageStyle] = useState({})
    const [showFilter, setShowFilter] = useState<boolean>(false)

    useEffect(() => {
        setBackgroundType('color')
        setBackgroundColor('white')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateImage = (src: string) => {
        setHeroImageStyle({backgroundImage: `url(${src})`})
    }


    return (
        <div className="container">
            <div className="grid md:grid-cols-2 gap-6 xl:gap-12">
                <div className="images-wrapper relative">
                    <div className="hero-image">
                        <div className="main-image aspect-square bg-[url('/assets/product/5c49d5ca8d85c9a11bb4d54838f901fa.jpeg')] bg-cover bg-center" style={heroImageStyle}/>
                    </div>
                    <div className="hidden md:block thumbnails mt-7">
                        <div className="flex flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                                {
                                    thumbnailProduct.map((thumbnailProduct, index) => (
                                        <img key={`thumbnailProduct-${index}`} src={thumbnailProduct.src} alt="Product Thumbnail" className='w-16 h-16 cursor-pointer' onClick={() => updateImage(thumbnailProduct.src)}/>
                                    ))
                                }
                            </div>
                            <Link to={'#'} className='flex items-center xl:ms-6 mt-4 xl:mt-0'>
                                <img src="/assets/product/view-space-icon.png" alt="View in your space." className='me-2'/>
                                <span className='inline-block border-b border-b-black uppercase text-xs'>View in your space</span>
                            </Link>
                        </div>
                    </div>

                    <div className='mx-6 md:mx-0'>
                        <div className="mb-1 mt-6">
                            <span className='uppercase text-xs'>Rove Concepts</span>
                        </div>

                        <h1 className='uppercase text-2xl md:text-4xl xl:text-5xl mb-2'>Maria Coffee Table</h1>

                        <div className="price text-xl italic font-extralight" style={{fontFamily: "PP Editorial New"}}><span className='ps-1'>$1,234</span></div>

                        <span className='hidden md:inline-block border-b border-b-black uppercase align-middle flex-wrap mt-4'><Link to={'/product'}>full product details</Link></span>
                    </div>
                </div>
                <div className="similar-products mx-6 md:mx-0">
                    <div className="xl:flex header justify-between items-center mt-9 mb-6">
                        <h2 className='uppercase text-xl xl:text-2xl'>Shop Similar Products</h2>

                        <div className='flex gap-3 items-center text-sm'>
                            <button className='uppercase items-center flex' onClick={() => setShowFilter(!showFilter)}>
                                <span className='me-0.5'>Filter</span> <FontAwesomeIcon icon={faFilter} className='pl-2'/>
                            </button>

                            <LivSelect placeholder={'Sort by'} name={'sort'} clearable={true} options={similarProductSortOptions}/>
                        </div>
                    </div>

                    {showFilter && (
                        <div className={clsx("filter-container xl:flex justify-between mb-1")}>
                            <LivSelect placeholder={'Price'} name={'price'} clearable={true} options={priceOptions}/>
                            <LivSelect placeholder={'Brand'} name={'brand'} clearable={true} options={brandOptions}/>
                            <LivSelect placeholder={'Material'} name={'material'} clearable={true} options={materialOptions}/>
                            <LivSelect placeholder={'Color'} name={'color'} clearable={true} options={colorOptions}/>
                            <LivSelect placeholder={'Dimensions'} name={'dimensions'} clearable={true} options={dimensionsOptions}/>
                        </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full max-h-screen overflow-y-auto mb-10">
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