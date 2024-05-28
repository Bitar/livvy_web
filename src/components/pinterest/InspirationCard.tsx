import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import clsx from "clsx";

export const InspirationCard = ({
                                    image,
                                    selected,
                                    setSelected,
                                    setInvalidSelection,
                                    setEnlargedCard,
                                    setIsOpen,
                                    limit = 4,
                                    viewOnly = false
                                }: {
    image: string,
    selected: string[],
    setSelected: Dispatch<SetStateAction<string[]>>,
    setInvalidSelection: Dispatch<SetStateAction<boolean>>,
    setEnlargedCard: Dispatch<SetStateAction<string | null>>,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    limit?: number,
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
            if (selected.length < limit) {
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