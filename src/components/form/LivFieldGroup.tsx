import React from "react";
import {ErrorMessage, Field} from "formik";

interface Props {
    name: string,
    type: string,
    placeholder: string,
    margin?: string
}
const LivFieldGroup: React.FC<Props> = ({name, type, placeholder, margin = "mb-2.5"}) => {
    return (
        <div className={margin}>
            <Field type={type}
                   name={name}
                   placeholder={placeholder}
                   className="bg-transparent py-4 border-b border-b-black w-full text-center placeholder:text-gray-500 placeholder:font-medium outline-none"
            />

            <div className="text-red-600 text-sm mt-2">
                <ErrorMessage name={name}/>
            </div>
        </div>
    )
}

export default LivFieldGroup;