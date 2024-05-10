import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import clsx from "clsx";
import {useLivvyApp} from "../../auth/core/LivvyAppContext.loader.ts";
import {LivvyToastType} from "../../../helpers/variables.ts";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {LivModal} from "../../../components/modals/LivModal.tsx";
import {defaultInspirationPreferenceFields, InspirationPreferenceFormFields} from "../core/form.ts";
import {useModal} from "../../../layout/ModalProvider.loader.ts";
import {InspirationFeedback} from "../partials/InspirationFeedback.tsx";
import {useNavigate} from "react-router-dom";


export const BrowseLibrary = () => {
    const {setBackgroundType, setBackgroundColor, setHeaderBGColor} = useMasterLayout();
    const [selected, setSelected] = useState<string[]>([]);
    const [invalidSelection, setInvalidSelection] = useState<boolean>(false);

    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [openEnlarged, setOpenEnlarged] = useState<boolean>(false);

    const [isNextSticky, setIsNextSticky] = useState<boolean>(false);

    const [preferenceForm, setPreferenceForm] = useState<InspirationPreferenceFormFields>(defaultInspirationPreferenceFields);

    const livApp = useLivvyApp();
    const navigate = useNavigate();
    const {setIsOpen, isOpen} = useModal();

    const buttonContainerRef = useRef<HTMLDivElement>(null);

    const updateButtonSticky = () => {
        if (buttonContainerRef.current) {
            const gridRect = buttonContainerRef.current.getBoundingClientRect();

            if(gridRect.bottom >= window.innerHeight) {
                // we are within and above grid section
                setIsNextSticky(true);
            } else {
                // we are under grid section
                setIsNextSticky(false);
            }
        }
    }

    useEffect(() => {
        setHeaderBGColor('white');
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
                message: "You can select up to 4 images",
                type: LivvyToastType.ERROR
            });

            setInvalidSelection(false);
        }
    }, [invalidSelection, livApp]);

    useEffect(() => {
        setPreferenceForm({...preferenceForm, totalInspirations: selected.length})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
        if (!isOpen) {
            // if we have selected then we need to update the preference form total
            setPreferenceForm({...defaultInspirationPreferenceFields, totalInspirations: selected.length});
        }
    }, [isOpen, selected]);

    const handleSubmit = () => {
        // TODO handle submit
        // mark the modal as closed
        setIsOpen(false);

        navigate('/inspiration/loading')
    }

    const handleNext = () => {
        // check if there are any images selected
        if (selected.length > 0) {
            setIsOpen(true);
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
                <h1 className='text-xl sm:text-2xl italic capitalize font-thin sm:mb-7'
                    style={{fontFamily: "PP Editorial New"}}>Please choose up to 4 inspiration images</h1>

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
                                   textColor={'text-white'} style={'thick'} onClickHandler={handleNext} className={isNextSticky ? "w-full" : "m-auto"} onWhiteBg={true}/>
                    </div>
                </div>
            </div>

            {
                enlargedImage &&
                <EnlargedInspiration isOpen={openEnlarged} setIsOpen={setOpenEnlarged} image={enlargedImage}/>
            }

            <LivModal>
                <InspirationFeedback form={preferenceForm} setForm={setPreferenceForm} urls={selected}
                                     handleSubmit={handleSubmit}/>
            </LivModal>
        </div>

    )
}

const InspirationCard = ({
                             image,
                             selected,
                             setSelected,
                             setInvalidSelection,
                             setEnlargedCard,
                             setIsOpen,
                             viewOnly = false
                         }: {
    image: string,
    selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>,
    setInvalidSelection: Dispatch<SetStateAction<boolean>>,
    setEnlargedCard: Dispatch<SetStateAction<string | null>>,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    viewOnly?: boolean
}) => {
    const [active, setActive] = useState<boolean>(selected.indexOf(image, 0) > -1);
    const [cardCount, setCardCount] = useState<number>(selected.indexOf(image, 0) > -1 ? selected.indexOf(image, 0) + 1 : 0);

    useEffect(() => {
        // if the selected changed then we need to update the cardCount for this card and if it's active
        // same if the image of this card changed

        // when the selected changes, we need to update the card count for this image if it's among selected
        // if the card is active, it means we already assigned it a cardCount
        const index = selected.indexOf(image, 0);

        if (index > -1) {
            setCardCount(index + 1);
            setActive(true);
        } else {
            setCardCount(0);
            setActive(false);
        }
    }, [selected, image]);

    const handleClick = () => {
        // if the image is not already in selected, then add it
        if (selected.indexOf(image, 0) < 0) {
            if (selected.length < 4) {
                setSelected([...selected, image]);
            } else {
                setInvalidSelection(true);
            }
        } else {
            // remove it if it's already there
            const index = selected.indexOf(image, 0);

            if (index > -1) {
                const temp = [...selected];

                temp.splice(index, 1);

                setSelected(temp);

                // if we remove elements then we can also reset the invalid selection
                setInvalidSelection(false);
            }
        }
    }

    return (
        <div className="relative">
            <img src={`${image}`} alt="home interior" className={clsx("w-full h-auto", {
                "cursor-pointer": !viewOnly
            })} onClick={() => {
                if (!viewOnly) {
                    setEnlargedCard(`${image}`);
                    setIsOpen(true);
                }
            }}/>

            {/*TODO Ayman try to find a different way for the counter to center vertically on mobile inside the white circle */}
            <div
                className={clsx('absolute top-2 right-2 z-10 cursor-pointer w-5 h-5 border border-black rounded-full', {
                    'bg-liv-green': active,
                    'bg-white': !active
                })} onClick={handleClick}>
                <span className={clsx("text-xs leading-3 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-white mt-px sm:mt-0", {
                    'invisible': !active,
                    'visible': active
                })}>{cardCount}</span>
            </div>
        </div>
    )
}

const EnlargedInspiration = ({isOpen, setIsOpen, image}: {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    image: string
}) => {
    const initialHeight = window.innerHeight - 100;
    const initialWidth = (window.innerWidth <= 640) ? window.innerWidth : window.innerWidth - 100

    const [isClosing, setIsClosing] = useState<boolean>(false)
    const [contentHeight, setContentHeight] = useState<number>(initialHeight);
    const [contentWidth, setContentWidth] = useState<number>(initialWidth);

    const updateContentDimensions = () => {
        setContentHeight(window.innerHeight - 100);

        if(window.innerWidth <= 640) {
            setContentWidth(window.innerWidth);
        } else {
            setContentWidth(window.innerWidth - 100);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            updateContentDimensions();
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div onAnimationEnd={() => {
            // To filter open animation
            if (isClosing) {
                setIsOpen(false)
                setIsClosing(false)
            }
        }}
             className={clsx('fixed w-full h-full z-30 top-0 left-0 bg-black bg-opacity-50 animate__animated backdrop-blur-md', {
                 'hidden': !isOpen,
                 'animate__fadeOut': isClosing,
                 'animate__fadeIn': isOpen
             })}>

            <button className={clsx("absolute right-6 top-5 z-50 uppercase text-white border-0 border-b border-b-white text-xs leading-3")} onClick={() => setIsClosing(true)}>close</button>

            <div className="fixed z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-url bg-no-repeat bg-center bg-contain" style={{backgroundImage: `url(${image})`, height: contentHeight, width: contentWidth}}></div>
        </div>
    )
}