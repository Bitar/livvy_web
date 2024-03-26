import React from "react";
import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";

type Props = {
    text: string,
    variant: string,
    style?: string
}
const RoundedButton: React.FC<Props> = ({text, variant, style}) => {
    const baseClasses = 'flex items-center justify-center min-w-32 md:min-w-40 uppercase text-center py-2 font-medium text-sm md:text-base rounded-full';

    return (
        variant === 'white' ?
            (<button
                className={`${baseClasses} bg-white text-black ${style}`}>
                <span className="me-2">{text}</span> <img src={toAbsoluteUrl('assets/vector-black.png')} alt="vector" className="w-3 md:w-4"/>
            </button>) :
            (<button
                className={`${baseClasses} bg-transparent text-white border border-white ${style}`}>
                <span className="me-2">{text}</span> <img src={toAbsoluteUrl('assets/vector-white.png')} alt="vector" className="w-3 md:w-4"/>
            </button>)
    )
}

export default RoundedButton;