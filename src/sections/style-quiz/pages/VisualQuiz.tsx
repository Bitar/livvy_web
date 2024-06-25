import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {useEffect, useRef, useState} from "react";
import {InspirationCard} from "../../../components/pinterest/InspirationCard.tsx";
import clsx from "clsx";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {EnlargedInspiration} from "../../../components/pinterest/EnlargedInspiration.tsx";
import {LivvyToastType} from "../../../helpers/variables.ts";
import {useLivvyApp} from "../../auth/core/LivvyAppContext.loader.ts";
import {useNavigate} from "react-router-dom";

export const VisualQuiz = () => {
    const livApp = useLivvyApp();
    const navigate = useNavigate();

    const {setBackgroundType, setBackgroundColor} = useMasterLayout();

    const [selected, setSelected] = useState<string[]>([]);
    const [invalidSelection, setInvalidSelection] = useState<boolean>(false);

    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [openEnlarged, setOpenEnlarged] = useState<boolean>(false);

    const [isNextSticky, setIsNextSticky] = useState<boolean>(false);

    const buttonContainerRef = useRef<HTMLDivElement>(null);

    const updateButtonSticky = () => {
        if (buttonContainerRef.current) {
            const gridRect = buttonContainerRef.current.getBoundingClientRect();

            if (gridRect.bottom >= window.innerHeight) {
                // we are within and above grid section
                setIsNextSticky(true);
            } else {
                // we are under grid section
                setIsNextSticky(false);
            }
        }
    }

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');

        const handleScroll = () => {
            updateButtonSticky();
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (invalidSelection) {
            livApp.setAlert({
                message: "You can select up to four images",
                type: LivvyToastType.ERROR
            });

            setInvalidSelection(false);
        }
    }, [invalidSelection, livApp]);

    const handleSubmit = () => {
        // TODO handle submit
        // check if there are any images selected
        if (selected.length > 0) {
            navigate('/style-quiz/results')
        } else {
            livApp.setAlert({
                message: "You need to select at least 1 image before proceeding",
                type: LivvyToastType.ERROR
            });
        }
    }

    return (
        <div>
            <div className="container liv-container">
                <h1 className='text-xl sm:text-2xl italic font-thin sm:mb-7'
                    style={{fontFamily: "PP Editorial New"}}>4. Which of these design styles resonate most with you? Choose up to four.</h1>

                <div className="mt-6">
                    <ResponsiveMasonry columnsCountBreakPoints={{640: 2, 1024: 3, 1280: 4}}>
                        <Masonry gutter={'16px'}>
                            <InspirationCard image={'/assets/inspiration/pinterest/img1.webp'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img2.jpeg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img3.jpg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img4.jpeg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img5.png'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img6.jpg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img7.webp'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img8.jpeg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img9.jpg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/test-small-1.jpg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/test-small-2.png'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedImage} setIsOpen={setOpenEnlarged}/>
                        </Masonry>
                    </ResponsiveMasonry>
                </div>

                <div className="relative mt-10 h-[58px] w-full" ref={buttonContainerRef}>
                    <div className={clsx({
                        "px-6 mobile-w-full left-0 fixed bottom-6 sm:left-1/2 sm:-translate-x-1/2 z-20": isNextSticky,
                        "px-6 mobile-w-full top-0 absolute left-1/2 -translate-x-1/2 z-20": !isNextSticky
                    })}>
                        <LivButton as={'button'} text={'next'} borderColor={'border-black'} bgColor={'bg-black'}
                                   textColor={'text-white'} style={'thick'} onClickHandler={handleSubmit} width={'custom'} className={isNextSticky ? "w-full" : "m-auto"} onWhiteBg={true}/>
                    </div>
                </div>
            </div>

            {
                enlargedImage &&
                <EnlargedInspiration isOpen={openEnlarged} setIsOpen={setOpenEnlarged} image={enlargedImage}/>
            }
        </div>
    )
}