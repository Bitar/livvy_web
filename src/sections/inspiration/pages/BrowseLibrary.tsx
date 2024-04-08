import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import clsx from "clsx";
import {useLivvyApp} from "../../auth/core/LivvyApp.tsx";
import {LivvyToastType} from "../../../helpers/variables.ts";
import {LivModal} from "../../../components/modals/LivModal.tsx";
import {useModal} from "../../../layout/ModalProvider.tsx";


export const BrowseLibrary = () => {
    // TODO work on image enlargment
    // TODO work on infinite scroll
    // TODO add next button
    // TODO navigate to loading page

    const {setBackgroundType, setBackgroundColor, setShowFooter} = useMasterLayout();
    const [selected, setSelected] = useState<string[]>([]);
    const [invalidSelection, setInvalidSelection] = useState<boolean>(false);
    const [enlargedCard, setEnlargedCard] = useState<string | null>(null);

    const {setIsOpen} = useModal();

    const livApp = useLivvyApp();

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setShowFooter(false);
    }, []);

    useEffect(() => {
        if (invalidSelection) {
            livApp.setAlert({
                message: "You can select up to 4 images",
                type: LivvyToastType.ERROR
            });

            setInvalidSelection(false);
        }
    }, [invalidSelection]);

    return (
        <div>
            <div className="container liv-container">
                <h1 className='text-2xl italic capitalize font-thin mb-7'
                    style={{fontFamily: "PP Editorial New"}}>Please choose up to 4 inspiration images</h1>

                <div className="mt-6">
                    <ResponsiveMasonry columnsCountBreakPoints={{320: 1, 640: 2, 1024: 3, 1280: 4}}>
                        <Masonry gutter={'16px'}>
                            <InspirationCard image={'/assets/inspiration/pinterest/img1.webp'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img2.jpeg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img3.jpg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img4.jpeg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img5.png'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img6.jpg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img7.webp'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img8.jpeg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                            <InspirationCard image={'/assets/inspiration/pinterest/img9.jpg'} selected={selected}
                                             setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                             setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen}/>
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>

            {
                enlargedCard && <LivModal withBackground={false}>
                    <InspirationCard image={enlargedCard} selected={selected}
                                     setSelected={setSelected} setInvalidSelection={setInvalidSelection}
                                     setEnlargedCard={setEnlargedCard} setIsOpen={setIsOpen} viewOnly={true}/>
                </LivModal>
            }

        </div>

    )
}

const InspirationCard = ({image, selected, setSelected, setInvalidSelection, setEnlargedCard, setIsOpen, viewOnly = false}: {
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
        <div className="relative mb-4">
            <img src={`${image}`} alt="home interior" className={clsx("w-full h-auto", {
                "cursor-pointer": !viewOnly
            })} onClick={() => {
                if(!viewOnly) {
                    setEnlargedCard(`${image}`);
                    setIsOpen(true);
                }
            }}/>

            <div
                className={clsx('absolute top-4 right-4 z-10 cursor-pointer w-7 h-7 border border-black rounded-full', {
                    'bg-liv-green': active,
                    'bg-white': !active
                })} onClick={handleClick}>
                <span className={clsx("absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-white", {
                    'invisible': !active,
                    'visible': active
                })}>{cardCount}</span>
            </div>
        </div>
    )
}