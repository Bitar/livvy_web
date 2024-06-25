import React, {useEffect, useRef, useState} from "react";
import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {Collapse} from "../../../components/Collapse.tsx";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

export const About = () => {
    const {setBackgroundType, setBackgroundColor, setFooterVariant, setHeaderBgColor} = useMasterLayout();

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setFooterVariant('black');
        setHeaderBgColor('liv-tan');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="container liv-container">
            <div>
                <h1 className="uppercase text-xl sm:text-2xl md:text-3xl lg:text-5xl w-full sm:w-4/5 md:w-3/5 mb-6 md:mb-12 lg:mb-16">Livvy is an AI interior design platform that converts your dream space into reality</h1>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-20">
                <div className="mb-4 md:mb-0 w-full aspect-square md:aspect-[3/4] bg-[url('/assets/about.png')] bg-cover bg-no-repeat bg-center"></div>

                <div>
                    <p className="text-sm mb-10">
                        Livvy was founded in 2023 by Founder and CEO Kevin Hart, out of the evolution of his previous endeavor, Aireal. While running this parent company, Kevin observed the benefit of Augmented Reality in the real estate
                        industry. He was successful in creating technology that could not only help developers & home buyers envision a new build, but also revolutionize how design and AI could work simultaneously. Livvy takes that
                        framework and elevates the residential living experience to the next level by taking the guess work out of interior design and allows you to turn a house into your home.
                    </p>

                    <div>
                        <AboutItem index={1} title={"company mission"}
                                   text={"In working to bring our purpose and vision to life, Livvy is the marriage between technology and reality aiming to inspire and empower you to create a space you can be proud of. By combining individuality, accessibility, and unlimited resources, our innovative technology brings your vision to life with the click of a button."}/>

                        <AboutItem index={2} title={"how it works"}
                                   text={"At Livvy, we make the complex process simple by creating a digital styling experience through three steps: Upload your space (using a smart phone or tablet), add your inspiration, and shop your newly designed room with a few clicks. Our platform converts inspiration into reality by using state-of-the-art technology, access to millions of furniture and decor pieces, and high quality 3D models. For a more detailed process, take a look at the tutorial below."}/>

                        <AboutItem index={3} title={"who we serve"}
                                   text={"Whether you are buying your first home or moving into the next chapter of your life, design your space has universal challenges. Where to start? What to look for? And how much will it cost? For" +
                                       " most people, decorating any space can seem daunting when facing an overwhelming number of questions. Livvy offers peace of mind by providing a number of features to help you navigate the how to design a space that fits your style, space, and budget."}/>

                        <AboutItem index={4} title={"our environmental impact"}
                                   text={"At Livvy, we are dedicated to environmental responsibility  by fostering a culture of conscious consumption. By providing users with the ability to visualize furniture and decor pieces at scale within their own spaces prior to purchase, we reduce the number of returns thus reducing waste and lowering carbon emissions associated with return transportation."}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AboutItem = ({title, text, index}: {title: string, text: string, index: number }) => {
    const accordionItemRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState<number>(0);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current!.scrollHeight)
        }
    }, []);

    return (
        <div
            className={clsx(`bg-transparent text-black accordion-item smooth-slide-down-container border-t border-t-black py-6 xl:py-8 overflow-hidden`)}
            ref={accordionItemRef}>

            <div className="flex justify-between items-start gap-x-10 md:gap-x-16 lg:gap-x-24">
                <div className="text-sm md:text-xl flex-none leading-5">{`${index}`.padStart(2, '0')}</div>

                <div className="grow">
                    <div className="flex justify-between items-center cursor-pointer" onClick={toggleAccordion}>
                        <button type="button" className="font-thin italic text-left me-2 text-lg lg:text-xl capitalize" style={{fontFamily: "PP Editorial New"}}>{title}</button>
                        <button><FontAwesomeIcon icon={isOpen ? faMinus : faPlus} className="text-xs"/></button>
                    </div>

                    <div className={clsx(`relative content transition-all duration-300 ease-in-out`, {
                            'opacity-100': isOpen,
                            'opacity-0': !isOpen,
                        })}
                        style={{maxHeight: isOpen ? '100vh' : '0'}}
                        ref={contentRef}
                    >
                        <p className="text-xs pt-4">
                            {text}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}