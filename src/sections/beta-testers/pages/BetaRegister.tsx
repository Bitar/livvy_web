import {useState} from "react";
import {BetaRegisterFormFields, BetaRegisterSchema, defaultBetaRegisterFormFields} from "../core/form.ts";
import {Form, Formik} from "formik";
import {genericOnChangeHandler} from "../../../helpers/form.ts";
import LivFieldGroup from "../../../components/form/LivFieldGroup.tsx";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";

export const BetaRegister = () => {
    const [form, setForm] = useState<BetaRegisterFormFields>(defaultBetaRegisterFormFields)

    const handleSubmit = () => {

    }

    return (
        <>
            <div className="text-center mb-4">
                <img src="/assets/logo-symbol-black.png" alt="livvy logo symbol" className="w-11 m-auto"/>
            </div>

            <h1 className="text-center uppercase text-3xl">sign up</h1>

            <div>
                <Formik initialValues={form} onSubmit={handleSubmit}
                        validationSchema={BetaRegisterSchema} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={(e) => genericOnChangeHandler(e, form, setForm)}>
                                <div className="flex justify-between items-center w-full sm:gap-4 flex-col sm:flex-row">
                                    <LivFieldGroup name={"first_name"} type={"text"} placeholder={"FIRST NAME"}
                                                   align='center'/>
                                    <LivFieldGroup name={"last_name"} type={"text"} placeholder={"LAST NAME"}
                                                   align='center'/>
                                </div>

                                <LivFieldGroup name="email" type="email" placeholder="EMAIL ADDRESS"
                                               align="center" margin='mb-4'/>

                                <p className="text-xs text-center flex justify-center items-center">
                                    <span className="me-1">Use the email address associated with your
                                        iCloud account</span>

                                    <button className="relative group" type="button">
                                        <FontAwesomeIcon icon={faCircleInfo}/>
                                        <span
                                            className="text-xs text-center absolute bg-white w-52 p-3 rounded-lg z-30 top-5 right-0 sm:left-1/2 sm:-translate-x-1/2 invisible group-hover:visible">To
                                            find this information, go to Settings on your phone and tap the first
                                            section with your name. Your iCloud email will be displayed at the
                                            top.</span>
                                    </button>
                                </p>

                                <div className="flex justify-between items-center w-full sm:gap-4 flex-col sm:flex-row">
                                    <LivFieldGroup name={"password"} type={"password"} placeholder={"PASSWORD"}
                                                   align='center'/>
                                    <LivFieldGroup name={"password_confirmation"} type={"password"}
                                                   placeholder={"CONFIRM PASSWORD"}
                                                   align='center'/>
                                </div>

                                <div className="mt-6 mb-4">
                                    <div className="w-[300px] m-auto">
                                        <LivButton as={'button'} type={'submit'} text={'sign up'}
                                                   textColor={'text-white'} bgColor={'bg-black'}
                                                   borderColor={'border-black'}
                                                   isSubmitting={formik.isSubmitting}
                                                   isValid={formik.isValid} fullWidth={true}/>

                                        <span className="text-xs">Already have an account? <Link to={'/beta/auth/login'} className="underline uppercase">Sign in</Link></span>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </>
    )
}