import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleDown} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

interface LivButtonProps {
    type?: "submit" | "reset" | "button" | undefined,
    text: string,
    borderColor: string,
    bgColor: string,
    textColor?: 'text-black' | 'text-white',
    arrowIcon?: boolean,
    arrowIconDirection?: string,
    rounded?: boolean,
    fullWidth?: boolean
    textIcon?: string
    className?: string
    isSubmitting?: boolean
    isValid?: boolean
    style?: "thick" | "thin",
    onWhiteBg?: boolean
}

type LivButtonConditionalProps = | {
    as?: 'button'
    url?: never,
    newTab?: never,
    onClickHandler?: any
} | {
    as?: 'a'
    url: string,
    newTab: boolean,
    onClickHandler?: never
}

export const LivButton = ({
                              as = 'button',
                              type = 'button',
                              text,
                              borderColor,
                              bgColor,
                              textColor = 'text-black',
                              textIcon,
                              className = '',
                              arrowIconDirection = 'right',
                              arrowIcon = true,
                              rounded = false,
                              fullWidth = false,
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
                        className={clsx(`flex items-center justify-center uppercase px-5 border min-w-32 md:min-w-40 disabled:opacity-45 ${bgColor} ${textColor} ${borderColor} ${hoverAnimation} ${hoverBorder} ${className}`, {
                            'rounded-full': rounded,
                            'w-full': fullWidth,
                            'py-4': style == 'thick',
                            'py-2': style == 'thin'
                        })}
                        disabled={type == 'submit' && (isSubmitting || !isValid)}
                        onClick={onClickHandler}
                >
                    {textIcon &&
                        <img src={toAbsoluteUrl(textIcon)} alt="Text Icon" className="me-2 w-4"/>
                    }

                    {!isSubmitting && <span>{text}</span>}
                    {isSubmitting && <span className="block">Please wait...</span>}

                    <ButtonArrow arrowIconDirection={arrowIconDirection} arrowIcon={arrowIcon} textColor={textColor}/>
                </button>
            )}

            {as == 'a' && url && (
                <Link to={url}
                      className={clsx(`inline-flex items-center justify-center uppercase px-5 border min-w-32 md:min-w-40 ${bgColor} ${textColor} ${borderColor} ${hoverAnimation} ${hoverBorder} ${className}`, {
                          'rounded-full': rounded,
                          'w-full': fullWidth,
                          'py-4': style == 'thick',
                          'py-2': style == 'thin'

                      })} target={newTab ? '_blank' : '_self'}>
                    {textIcon &&
                        <img src={toAbsoluteUrl(textIcon)} alt="Text Icon" className="me-2 w-4"/>
                    }

                    <span>{text}</span>

                    <ButtonArrow arrowIconDirection={arrowIconDirection} arrowIcon={arrowIcon} textColor={textColor}/>
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