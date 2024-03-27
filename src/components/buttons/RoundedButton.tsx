import React from "react";
import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";

type Props = {
    text: string,
    variant: string,
    style?: string
}
const RoundedButton: React.FC<Props> = ({text, variant, style}) => {
    const baseClasses = 'flex items-center justify-center min-w-32 md:min-w-40 uppercase text-center py-2 font-medium text-sm md:text-base rounded-full px-5';

    return (
        variant === 'white' ?
            (<button
                className={`${baseClasses} ${style} bg-white text-black border border-white liv-black-hover hover:border-black hover:bg-transparent`}>
                <span className="me-2">{text}</span>
                <img src={toAbsoluteUrl('assets/vector-black.png')} alt="vector" className="w-3 md:w-4 arrow-black"/>
                <img src={toAbsoluteUrl('assets/vector-white.png')} alt="vector" className="w-3 md:w-4 arrow-white hidden"/>
            </button>) :
            (<button className={`${baseClasses} ${style} bg-transparent text-white border border-white liv-black-hover hover:border-black`}>
                <span className="me-2">{text}</span> <img src={toAbsoluteUrl('assets/vector-white.png')} alt="vector" className="w-3 md:w-4"/>
            </button>)
    )
}

export default RoundedButton;