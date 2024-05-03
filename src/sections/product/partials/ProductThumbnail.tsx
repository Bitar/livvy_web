import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faSolidHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";

interface ProductThumbnailProps {
    image: string,
    title: string,
    description: string,
    price: number,
    className?: string
}

export const ProductThumbnail = ({image, title, description, price, className}: ProductThumbnailProps) => {
    const [hasLiked, setHasLiked] = useState<boolean>(false)

    return (
        <div className={`similar-product text-xs relative sm:me-0 ${className}`}>
            <div className="like-btn absolute top-3 right-3 cursor-pointer" onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? (
                    <FontAwesomeIcon icon={faSolidHeart} className='text-base text-red-500'/>
                ) : (
                    <FontAwesomeIcon icon={faHeart} className='text-base'/>
                )}
            </div>
            <img src={image} alt="" className='aspect-square max-w-[200px] w-full'/>
            <div className="name">{title}</div>
            <div className="description truncate">{description}</div>
            <div className="price">${price}</div>
        </div>
    )
}