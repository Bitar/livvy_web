import clsx from "clsx";
import {toAbsoluteUrl} from "../../../helpers/toAbsoluteUrl.ts";
import LivFormErrors from "../../../components/form/LivFormErrors.tsx";
import {Form, Formik, FormikHelpers} from "formik";
import {defaultRegisterFormFields, RegisterSchema} from "../core/form.ts";
import LivFieldGroup from "../../../components/form/LivFieldGroup.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {register} from "../../../requests/iam/auth.ts";
import {useEffect, useState} from "react";
import {useAuthLayout} from "../../../layout/AuthLayoutContext.loader.ts";
import {useOutsideClick} from "../../../helpers/outsideClick.ts";
import {LivFormSuccess} from "../../../components/form/LivFormSuccess.tsx";
import {BetaRegisterFormFields} from "../../beta-testers/core/form.ts";

export const Register = () => {
    const {closePanels, setIsPanelOpen} = useAuthLayout();

    const [registerStage, setRegisterStage] = useState<'signup' | 'verify'>("signup");

    const [hasRegisterErrors, setHasRegisterErrors] = useState<boolean>(false);
    const [registerErrorMessage, setRegisterErrorMessage] = useState<string>('');

    const [registeredEmail, setRegisteredEmail] = useState<string>('');
    const [showResendLoading, setShowResendLoading] = useState<boolean>(false);
    const [showResendDone, setShowResendDone] = useState<boolean>(false);

    const [isClosing, setIsClosing] = useState<boolean>(false)

    useEffect(() => {
        setIsPanelOpen(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRegisterSubmit = async (e: BetaRegisterFormFields, fns: FormikHelpers<BetaRegisterFormFields>) => {
        try {
            const fullNameArr = e.full_name.split(' ');

            let first_name: string;
            let last_name = '';

            if (fullNameArr.length > 1) {
                first_name = fullNameArr[0];
                last_name = fullNameArr[1];
            } else {
                first_name = fullNameArr[0];
            }

            const {data} = register(e.email, first_name, last_name, e.password, e.password);

            setRegisteredEmail(data.email);
            // now we need to hide the current content of the register panel and show the content that tells us that the user needs to confirm
            // his account
            setRegisterStage('verify');
        } catch (error) {
            setHasRegisterErrors(true);
            setRegisterErrorMessage('Something went wrong!');
            fns.setSubmitting(false);
        }
    }

    const handleResendVerificationEmail = () => {
        // first we need to show the loading icon
        // and we need to hide the done icon if it was already there
        setShowResendDone(false);
        setShowResendLoading(true);

        // do API call to trigger resend
        setTimeout(() => {
            setShowResendLoading(false);
            setShowResendDone(true);
        }, 2000);
    }

    const ref = useOutsideClick(() => {
        triggerClosePanel()
    });

    const triggerClosePanel = () => {
        setIsClosing(true)
        setIsPanelOpen(false)
    }

    return (
        <div id="register-panel"
             onAnimationEnd={() => {
                 if (isClosing) {
                     closePanels()
                 }
             }}
             className={clsx("liv-side-panel fixed z-50 right-0 top-0 w-full md:w-1/2 sm:w-3/4 h-full bg-liv-tan overflow-y-scroll md:overflow-auto animate__animated",
                 {
                     "animate__slideInRight": !isClosing,
                     "animate__slideOutRight": isClosing
                 })} ref={ref}>
            <div id="register-form-container"
                 className={clsx("absolute z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full sm:w-auto p-5 overflow-y-scroll md:overflow-auto",
                     {
                         'hidden': registerStage == 'verify'
                     })}>
                <div className="flex justify-center mb-5">
                    <img src={toAbsoluteUrl('assets/logo-symbol-black.png')} alt="Livvy logo symbol"
                         className="w-9 md:w-11"/>
                </div>

                <h5 className="text-black text-2xl md:text-3xl uppercase mb-2 md:mb-7">sign up for
                    livvy</h5>

                {hasRegisterErrors && <LivFormErrors errors={[registerErrorMessage]}/>}

                <div className="sm:min-w-80 ">
                    <Formik initialValues={defaultRegisterFormFields} onSubmit={handleRegisterSubmit}
                            validationSchema={RegisterSchema} enableReinitialize>
                        {(formik) => (
                            <Form>
                                <LivFieldGroup name={"full_name"} type={"text"} placeholder={"FULL NAME"}
                                               align='center'/>

                                <LivFieldGroup name={"email"} type={"email"} placeholder={"EMAIL"}
                                               align='center'/>

                                <LivFieldGroup name={"password"} type={"password"} placeholder={"PASSWORD"}
                                               align='center'/>

                                <div className="mt-6">
                                    <LivButton as={'button'} type={'submit'} text={'create account'}
                                               textColor={'text-white'} bgColor={'bg-black'}
                                               borderColor={'border-black'}
                                               isSubmitting={formik.isSubmitting}
                                               isValid={formik.isValid} width={'full'}
                                               className={'mb-2'}/>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="text-center mb-2">
                        <span className="uppercase">or</span>
                    </div>

                    <LivButton text={'continue with google'} borderColor={'border-black'}
                               bgColor={'bg-transparent'} arrowIcon={false}
                               textIcon={'assets/google-icon.svg'}
                               width={'full'} className={'mb-4'}/>

                    <LivButton text={'continue with pinterest'} borderColor={'border-black'}
                               bgColor={'bg-transparent'} arrowIcon={false}
                               textIcon={'assets/pinterest-icon.svg'} width={'full'} className={'mb-4'}/>
                </div>

                <div className={"block sm:hidden w-full mt-10"}>
                    <Disclaimer/>
                </div>
            </div>

            <div id="activate-account-container"
                 className={clsx("absolute z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full sm:w-auto p-5",
                     {
                         "hidden": registerStage == 'signup'
                     })}>
                <div className="flex justify-center mb-5">
                    <img src={toAbsoluteUrl('assets/logo-symbol-black.png')} alt="Livvy logo symbol"
                         className="w-9 md:w-11"/>
                </div>

                <h5 className="text-black text-2xl md:text-3xl uppercase mb-2 md:mb-3">activate account</h5>
                <div className="flex align-middle justify-center mb-11">
                    <p className="text-sm max-w-72">We have sent a verification email to the below address to
                        set up your account.</p>
                </div>

                <div className="mb-6">
                    <span
                        className="block uppercase text-lg border-b border-b-black pb-5 px-11">{registeredEmail}</span>
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
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>

                <div className={clsx('mt-4', {
                    'animate__animated animate__fadeIn': showResendDone,
                    'hidden': !showResendDone
                })}>
                    <LivFormSuccess text={'Email has been sent'}/>
                </div>

                <div className={"block sm:hidden w-full mt-10"}>
                    <Disclaimer/>
                </div>
            </div>

            <div className={clsx("hidden sm:block sm:absolute sm:z-60 sm:left-0 bottom-3 sm:bottom-7 w-full mb-5 sm:mb-0")}>
                <Disclaimer/>
            </div>

            <button className="absolute z-60 right-3 top-2" onClick={triggerClosePanel}>
                <FontAwesomeIcon icon={faXmark} size='lg'/>
            </button>
        </div>
    )
}

const Disclaimer = () => {
    return (
        <div className="text-xs px-5 text-center">
            By continuing, you agree to LIVVY’s <Link to={'#'}
                                                      className="border border-b-black">Terms
            of Service</Link> and <Link to={'#'} className="border border-b-black">Privacy
            Policy</Link>.
        </div>
    )
}