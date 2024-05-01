import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";
import React, {useEffect, useRef, useState} from "react";

export const Collapse = ({text, title, isLast = false}: { text: string, title: string, isLast?: boolean }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null)
    const accordionItemRef = useRef<HTMLDivElement>(null)
    const [height, setHeight] = useState<number>(0)

    const toggleAccordion = () => {
        contentRef.current.classList.remove('invisible')
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if (contentRef.current) {
            if (isOpen) {
                setTimeout(() => { // Set the maxHeight to the scrollHeight after a tick to allow the transition to take effect
                    contentRef.current!.style.maxHeight = `${height}px`;
                });
            } else {
                contentRef.current!.style.maxHeight = `${height}px`; // Temporarily set maxHeight to scrollHeight for the transition
                contentRef.current!.offsetHeight; // Trigger reflow
                contentRef.current!.style.maxHeight = '0';

                setTimeout(() => {
                    contentRef.current.classList.add('invisible')
                }, 300)
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current!.scrollHeight)
        }
    }, []);

    return (
        <div className={clsx("accordion-item smooth-slide-down-container border-t border-t-black py-4 xl:py-5", {
            'border-b border-b-black': isLast,
        })} ref={accordionItemRef}>
            <div className="flex justify-between items-center cursor-pointer" onClick={toggleAccordion}>
                <button type="button" className="text-left uppercase me-2.5 text-xs lg:text-sm">{title}</button>
                <button><FontAwesomeIcon icon={isOpen ? faMinus : faPlus}/></button>
            </div>

            <div
                className={clsx(`relative content transition-all duration-300 ease-in-out`, {
                    'opacity-100': isOpen,
                    'opacity-0': !isOpen,
                })}
                style={{maxHeight: isOpen ? '100vh' : '0'}}
                ref={contentRef}
            >
                <p className="text-sm pt-4">
                    {text}
                </p>
            </div>
        </div>
    )
}