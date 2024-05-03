import React, {FC} from "react";

interface LivTagProps {
    backgroundColor: string,
    text: string
}

export const LivTag: FC<LivTagProps> = (props) => {
    const {backgroundColor, text} = props

    return (
        <span className={`flex items-center justify-center uppercase px-2 py-1 lg:px-3 lg:py-2 min-w-24 rounded-full border border-black text-xs ${backgroundColor}`}>{text}</span>
    )
}