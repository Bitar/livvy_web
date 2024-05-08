import {MouseEvent} from 'react'
import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

//TODO: Add a flag for arrow to show/hide?
interface LivButtonProps {
    type?: "submit" | "reset" | "button" | undefined,
    text: string,
    borderColor: string,
    bgColor: string,
    textColor?: 'text-black' | 'text-white',
    textSize?: string,
    hasArrow?: boolean,
    arrowIcon?: boolean,
    arrowIconDirection?: string,
    rounded?: boolean,
    width?: 'full' | 'restricted' | 'custom',
    textIcon?: string
    className?: string
    isSubmitting?: boolean
    isValid?: boolean
    style?: "thick" | "thin" | "mid",
    onWhiteBg?: boolean
}

type LivButtonConditionalProps = | {
    as?: 'button'
    url?: never,
    newTab?: never,
    onClickHandler?: (event: MouseEvent<HTMLButtonElement>) => void
} | {
    as?: 'a'
    url: string,
    newTab?: boolean,
    onClickHandler?: never
}

export const LivButton = ({
                              as = 'button',
                              type = 'button',
                              text,
                              borderColor,
                              bgColor,
                              textColor = 'text-black',
                              textSize = 'text-sm sm:text-base',
                              textIcon,
                              className = '',
                              arrowIconDirection = 'right',
                              hasArrow = true,
                              arrowIcon = true,
                              rounded = false,
                              width = 'restricted',
                              isSubmitting = false,
                              isValid = true,
                              onClickHandler,
                              url,
                              newTab = false,
                              style = 'thick',
                              onWhiteBg = false
                          }: LivButtonProps & LivButtonConditionalProps) => {
    const hoverAnimation = bgColor == 'bg-black' ? 'liv-white-hover' : 'liv-black-hover';
    const hoverBorder = hoverAnimation == 'liv-black-hover' ? 'hover:border-black' : (onWhiteBg ? 'hover:border-black' : 'hover:border-white')

    return (
        <>
            {as == 'button' && (
                <button type={type}
                        className={clsx(`flex items-center justify-center uppercase px-5 border disabled:opacity-45 ${bgColor} ${textColor} ${borderColor} ${hoverAnimation} ${hoverBorder} ${className}`, {
                            'rounded-full': rounded,
                            'w-full': width == 'full',
                            'min-w-32 md:min-w-40': width == 'restricted',
                            'py-4': style == 'thick',
                            'py-3': style == 'mid',
                            'py-2': style == 'thin'
                        })}
                        disabled={type == 'submit' && (isSubmitting || !isValid)}
                        onClick={onClickHandler}
                >
                    {textIcon &&
                        <img src={toAbsoluteUrl(textIcon)} alt="Text Icon" className="me-2 w-4"/>
                    }

                    {!isSubmitting && <span className={`${textSize}`}>{text}</span>}
                    {isSubmitting && <span className="block">Please wait...</span>}

                    {
                        hasArrow && <ButtonArrow arrowIconDirection={arrowIconDirection} arrowIcon={arrowIcon} textColor={textColor}/>
                    }
                </button>
            )}

            {as == 'a' && url && (
                <Link to={url}
                      className={clsx(`inline-flex items-center justify-center uppercase px-5 border ${bgColor} ${textColor} ${borderColor} ${hoverAnimation} ${hoverBorder} ${className}`, {
                          'rounded-full': rounded,
                          'w-full': width == 'full',
                          'min-w-32 md:min-w-40': width == 'restricted',
                          'py-4': style == 'thick',
                          'py-2': style == 'thin',
                          'py-3': style == 'mid'
                      })} target={newTab ? '_blank' : '_self'}>
                    {textIcon &&
                        <img src={toAbsoluteUrl(textIcon)} alt="Text Icon" className="me-2 w-4"/>
                    }

                    <span className={`${textSize}`}>{text}</span>

                    {
                        hasArrow && <ButtonArrow arrowIconDirection={arrowIconDirection} arrowIcon={arrowIcon} textColor={textColor}/>
                    }
                </Link>
            )}
        </>
    )
}

const ButtonArrow = ({textColor, arrowIcon, arrowIconDirection}: {
    textColor: string,
    arrowIcon: boolean,
    arrowIconDirection: string
}) => {
    return (
        arrowIcon &&
        (
            arrowIconDirection == 'down' ? (
                <>
                    <FontAwesomeIcon icon={faAngleDown}
                                     className={clsx(`w-3 md:w-4 ms-2 ${textColor}`)}/>
                </>
            ) : (
                <>
                    <img src={toAbsoluteUrl('assets/arrow-white.svg')} alt="arrow white"
                         className={clsx(`w-3 md:w-4 arrow-white ms-2`, {
                             hidden: textColor == "text-black"
                         })}/>
                    <img src={toAbsoluteUrl('assets/arrow-black.svg')} alt="arrow black"
                         className={clsx(`w-3 md:w-4 arrow-black ms-2`, {
                             hidden: textColor == "text-white"
                         })}/>
                </>
            )
        )
    )
}