import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {useEffect} from "react";
import {LivTag} from "../../../components/tags/LivTag.tsx";

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
                    <div className="flex justify-end">
                        <div className="tag-list">
                            <span className="tag"><LivTag backgroundColor='bg-transparent' text="Coffee Table"/></span>
                            <span className="tag"><LivTag backgroundColor='bg-transparent' text="Industrial"/></span>
                        </div>
                    </div>
                    <div className="category mt-5 mb-2.5">
                        <span className='uppercase text-xs'>Rove Concepts</span>
                    </div>
                    <h1 className='uppercase text-5xl mt-2.5 mb-3.5'>Maria Coffee Table</h1>
                    <div className="price text-xl italic font-extralight" style={{fontFamily: "PP Editorial New"}}>$1,234</div>
                    <div className="colors"></div>
                    <div className="counter"></div>
                    <div className="cta"></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}