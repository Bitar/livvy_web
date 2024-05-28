import React, {useEffect, useState} from "react";
import {BetaRegisterFormFields, BetaRegisterSchema, defaultBetaRegisterFormFields} from "../core/form.ts";
import {Form, Formik, FormikHelpers} from "formik";
import {genericOnChangeHandler} from "../../../helpers/form.ts";
import LivFieldGroup from "../../../components/form/LivFieldGroup.tsx";
import {faCircleInfo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";
import LivFormErrors from "../../../components/form/LivFormErrors.tsx";
import {betaRegister, resendAccountActivationEmail} from "../../../requests/iam/auth.ts";
import {submitRequest} from "../../../helpers/requests.ts";
import clsx from "clsx";
import {toAbsoluteUrl} from "../../../helpers/toAbsoluteUrl.ts";
import {LivFormSuccess} from "../../../components/form/LivFormSuccess.tsx";
import {useLivvyApp} from "../../auth/core/LivvyAppContext.loader.ts";
import {LivPasswordGroup} from "../../../components/form/LivPasswordGroup.tsx";

export const BetaRegister = () => {
    const [form, setForm] = useState<BetaRegisterFormFields>(defaultBetaRegisterFormFields)
    const [formErrors, setFormErrors] = useState<string []>([]);

    const [registerStage, setRegisterStage] = useState<'signup' | 'verify'>("signup");

    const [registeredEmail, setRegisteredEmail] = useState<string>('');
    const [showResendLoading, setShowResendLoading] = useState<boolean>(false);
    const [showResendDone, setShowResendDone] = useState<boolean>(false);

    const livvyApp = useLivvyApp();

    useEffect(() => {
        livvyApp.setPageTitle('Register | Livvy | Alpha')
    }, [livvyApp]);

    const handleResendVerificationEmail = async () => {
        // first we need to show the loading icon
        // and we need to hide the done icon if it was already there
        setShowResendDone(false);
        setShowResendLoading(true);

        // do API call to trigger resend

        submitRequest(resendAccountActivationEmail, [form], () => {
            setShowResendLoading(false);
            setShowResendDone(true);
        })
    }

    const buildSubmitForm = () => {
        const fullNameArr = form.full_name.split(' ');

        let first_name: string;
        let last_name = '';

        if (fullNameArr.length > 1) {
            first_name = fullNameArr[0];
            last_name = fullNameArr[1];
        } else {
            first_name = fullNameArr[0];
        }

        return{
            first_name : first_name,
            last_name: last_name,
            email: form.email,
            password: form.password,
            password_confirmation: form.password,
            source: form.source
        }
    }

    const handleSubmit = (e: BetaRegisterFormFields, fns: FormikHelpers<BetaRegisterFormFields>) => {
        // need to modify the form to fit what we need to send to server
        const correctForm = buildSubmitForm();

        submitRequest(betaRegister, [correctForm], (response) => {
            setRegisteredEmail(response.email);
            setRegisterStage('verify');
        }, setFormErrors, fns);
    }

    return (
        <>
            <div id="register-container" className={clsx({
                "hidden": registerStage != 'signup'
            })}>
                <div className="text-center mb-4">
                    <img src="/assets/logo-symbol-black.png" alt="livvy logo symbol" className="w-11 m-auto"/>
                </div>

                <h1 className="text-center uppercase text-3xl mb-4">sign up</h1>

                <LivFormErrors errors={formErrors}/>

                <div>
                    <Formik initialValues={form} onSubmit={handleSubmit}
                            validationSchema={BetaRegisterSchema} enableReinitialize>
                        {
                            (formik) => (
                                <Form onChange={(e) => genericOnChangeHandler(e, form, setForm)}>
                                    <LivFieldGroup name={"full_name"} type={"text"}
                                                   placeholder={"FIRST NAME AND LAST NAME"}
                                                   align='center'/>

                                    <LivFieldGroup name="email" type="email" placeholder="EMAIL ADDRESS"
                                                   align="center" margin='mb-2' errorMessagePosition={"-bottom-11"}/>

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

                                    <LivPasswordGroup name={'password'} placeholder={'PASSWORD'} align={'center'} margin={'mt-3.5'}/>

                                    <div className="mt-10 mb-4">
                                        <LivButton as={'button'} type={'submit'} text={'sign up'}
                                                   textColor={'text-white'} bgColor={'bg-black'}
                                                   borderColor={'border-black'}
                                                   isSubmitting={formik.isSubmitting}
                                                   isValid={formik.isValid} width={'full'}/>

                                        <div className="text-center">
                                            <span className="text-xs">Already have an account? <Link
                                                to={'/alpha/auth/login'} className="underline uppercase">Sign
                                                in</Link></span>
                                        </div>
                                    </div>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>

            <div id="activate-container"
                 className={clsx({
                     "hidden": registerStage != 'verify'
                 })}>
                <div className="flex justify-center mb-5">
                    <img src={toAbsoluteUrl('assets/logo-symbol-black.png')} alt="Livvy logo symbol"
                         className="w-9 md:w-11"/>
                </div>

                <h5 className="text-black text-2xl md:text-3xl uppercase mb-2 md:mb-3 text-center">activate account</h5>
                <div className="flex align-middle justify-center mb-11">
                    <p className="text-sm max-w-72 text-center">We have sent a verification email to the below address
                        to
                        set up your account.</p>
                </div>

                <div className="mb-6">
                    <span
                        className="block uppercase text-lg border-b border-b-black pb-5 px-11 text-center">{registeredEmail}</span>
                </div>

                <div className="text-sm flex justify-center align-middle">
                    <span className="me-1">Didn't receive an email?</span>
                    <button className="border-0 border-b border-b-black me-2"
                            onClick={handleResendVerificationEmail}>Resend
                    </button>
                    <svg className={clsx("animate-spin h-4 w-4 text-brand-green", {
                        'animate__animated animate__fadeIn': showResendLoading,
                        'hidden': !showResendLoading
                    })}
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#838b64"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="#838b64"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>

                <div className={clsx('mt-4', {
                    'animate__animated animate__fadeIn': showResendDone,
                    'hidden': !showResendDone
                })}>
                    <LivFormSuccess text={'Email has been sent'}/>
                </div>
            </div>
        </>
    )
}