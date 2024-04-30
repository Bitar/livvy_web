import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";

export const Collapse = ({text, title, isLast = false}: {text: string, title: string, isLast?: boolean}) => {
    const [show, setShow] = useState<boolean>(false);

    return (
        <div className={clsx("smooth-slide-down-container border-t border-t-black py-4 xl:py-5", {
            'border-b border-b-black': isLast
        })}>
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setShow(!show)}>
                <button type="button" className="text-left uppercase me-2.5 text-xs lg:text-sm">{title}</button>
                <button><FontAwesomeIcon icon={show ? faMinus : faPlus}/></button>
            </div>

            <p className={clsx("me-6 text-sm drop_container", {
                'mt-0 hide': !show,
                'mt-4 show': show
            })}>
                {text}
            </p>
        </div>
    )
}