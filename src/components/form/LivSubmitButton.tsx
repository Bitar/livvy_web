import React from "react";
import {FormikProps} from "formik";
import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";

interface Props {
    text: string,
    // eslint-disable-next-line
    formik: FormikProps<any>
}

const LivSubmitButton: React.FC<Props> = ({text, formik}) => {
    return (
        <button type='submit' className="flex items-center justify-center bg-black text-white uppercase font-medium w-full py-4 liv-white-hover"
                disabled={formik.isSubmitting || !formik.isValid}>
            {!formik.isSubmitting && <span className="me-2">{text}</span>}
            {formik.isSubmitting && (<span className="block me-2">Please wait...</span>)}
            <img src={toAbsoluteUrl('assets/vector-white.png')} alt="vector" className="w-3 md:w-4 arrow-white"/>
            <img src={toAbsoluteUrl('assets/vector-black.png')} alt="vector" className="w-3 md:w-4 arrow-black hidden"/>
        </button>
    )
}

export default LivSubmitButton;