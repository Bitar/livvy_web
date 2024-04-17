import React from "react";
import {ErrorMessage, Field, useFormikContext} from "formik";
import clsx from "clsx";

interface Props {
    name: string,
    type: string,
    placeholder: string,
    margin?: string
    align?: 'left' | 'center' | 'right'
}
const LivFieldGroup: React.FC<Props> = ({name, type, placeholder, margin = "mb-6", align = 'left'}) => {
    const formik = useFormikContext();

    return (
        <div className={clsx(margin, 'relative w-full')}>
            <Field type={type}
                   name={name}
                   placeholder={placeholder}
                   className={clsx(`bg-transparent py-4 border-b border-b-black w-full text-${align} placeholder:text-gray-500 outline-none`, {
                       'border-b-red-600': formik.errors[name] !== undefined
                   })}
            />

            <div className={`text-red-600 text-sm mt-2 text-${align} absolute -bottom-6`}>
                <ErrorMessage name={name}/>
            </div>
        </div>
    )
}

export default LivFieldGroup;