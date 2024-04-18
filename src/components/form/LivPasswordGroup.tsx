import {ErrorMessage, Field, useFormikContext} from "formik";
import clsx from "clsx";
import React, {FC, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";

interface Props {
    name: string,
    placeholder: string,
    margin?: string
    align?: 'left' | 'center' | 'right'
}

export const LivPasswordGroup: FC<Props> = ({name, placeholder, margin = "mb-5", align = 'left'}) => {
    const formik = useFormikContext();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className={clsx(margin, 'relative w-full')}>
            <div className="relative">
                <Field type={showPassword ? "text" : "password"}
                       name={name}
                       placeholder={placeholder}
                       className={clsx(`bg-transparent py-4 border-b border-b-black w-full text-${align} placeholder:text-gray-500 px-5 outline-0 rounded-none`, {
                           'border-b-red-600': formik.errors[name] !== undefined
                       })}
                />

                <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
                        onClick={() => setShowPassword(!showPassword)}>
                    {
                        showPassword && <FontAwesomeIcon icon={faEye} className="text-xs"/>
                    }

                    {
                        !showPassword && <FontAwesomeIcon icon={faEyeSlash} className="text-xs"/>
                    }
                </button>
            </div>


            <div className={`text-red-600 text-sm mt-2 text-${align} absolute -bottom-6 w-full`}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    )
}