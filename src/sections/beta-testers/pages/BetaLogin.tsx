import {Form, Formik} from "formik";
import {BetaLoginFormFields, BetaLoginSchema, defaultBetaLoginFormFields} from "../core/form.ts";
import {genericOnChangeHandler} from "../../../helpers/form.ts";
import LivFieldGroup from "../../../components/form/LivFieldGroup.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserByToken, login, resendAccountActivationEmail} from "../../../requests/iam/auth.ts";
import {useAuth} from "../../auth/core/Auth.tsx";
import LivFormErrors from "../../../components/form/LivFormErrors.tsx";
import clsx from "clsx";
import {LivFormSuccess} from "../../../components/form/LivFormSuccess.tsx";
import {submitRequest} from "../../../helpers/requests.ts";
import {useLivvyApp} from "../../auth/core/LivvyApp.tsx";

export const BetaLogin = () => {
    const [hasLoginErrors, setHasLoginErrors] = useState<boolean>(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');
    const [form, setForm] = useState<BetaLoginFormFields>(defaultBetaLoginFormFields);

    const [showResendLoading, setShowResendLoading] = useState<boolean>(false);
    const [showResendDone, setShowResendDone] = useState<boolean>(false);
    const [verificationError, setVerificationError] = useState<boolean>(false);
    const [showVerified, setShowVerified] = useState<boolean>(false);

    const {saveAuth, setCurrentUser} = useAuth();
    const [searchParams] = useSearchParams();
    const livvyApp = useLivvyApp();

    useEffect(() => {
        if(searchParams.get('verified') === 'success') {
            setShowVerified(true);
        }

        livvyApp.setPageTitle('Login | Livvy | Alpha')
    }, []);

    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        try {
            const {data: auth} = await login(form.email, form.password)

            if (auth.data.is_email_verified) {
                saveAuth(auth)

                const {data: user} = await getUserByToken(auth.token)

                setCurrentUser(user)
            } else {
                saveAuth(undefined)
                setHasLoginErrors(false)
                setLoginErrorMessage('')
                setVerificationError(true);
                setSubmitting(false)
            }
        } catch (error) {
            saveAuth(undefined)
            setHasLoginErrors(true)
            setLoginErrorMessage('These credentials do not match our records.')
            setVerificationError(false);
            setSubmitting(false)
        }
    }

    const resendVerification = () => {
        // first we need to show the loading icon
        // and we need to hide the done icon if it was already there
        setShowResendDone(false);
        setShowResendLoading(true);

        // do API call to trigger resend

        submitRequest(resendAccountActivationEmail, [form], (response) => {
            setShowResendLoading(false);
            setShowResendDone(true);

            setTimeout(() => {
                setVerificationError(false);
                setHasLoginErrors(false);
                setLoginErrorMessage('');
                setShowResendDone(false);
            }, 4000);
        })
    }

    return (
        <>
            <div className="text-center mb-4">
                <img src="/assets/logo-symbol-black.png" alt="livvy logo symbol" className="w-11 m-auto"/>
            </div>

            <h1 className="text-center uppercase text-3xl">sign in</h1>

            {showVerified && <div className="mt-2"><LivFormSuccess text={'Your email has been verified. Login below.'}/></div>}

            {hasLoginErrors && <LivFormErrors errors={[loginErrorMessage]}/>}

            <div className={clsx("bg-red-50 border border-red-300 text-red-800 rounded-md py-3 px-5 text-left flex justify-center align-middle mt-2", {
                "hidden": !verificationError
            })}>
                <span className="me-2">Your account has not been verified. Click <button className="underline" onClick={resendVerification}>here</button> to resend verification
                    email.</span> <svg className={clsx("animate-spin h-4 w-4 text-brand-green mt-0.5", {
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

            <div className="mt-4">
                <Formik initialValues={form} onSubmit={handleSubmit}
                        validationSchema={BetaLoginSchema} enableReinitialize>
                    {
                        (formik) => (
                            <Form onChange={(e) => genericOnChangeHandler(e, form, setForm)}>

                                <LivFieldGroup name="email" type="email" placeholder="EMAIL ADDRESS"
                                               align="center" margin='mb-4'/>

                                <LivFieldGroup name={"password"} type={"password"} placeholder={"PASSWORD"}
                                               align='center'/>

                                <div className="mt-10 mb-4">
                                    <LivButton as={'button'} type={'submit'} text={'sign in'}
                                               textColor={'text-white'} bgColor={'bg-black'}
                                               borderColor={'border-black'}
                                               isSubmitting={formik.isSubmitting}
                                               isValid={formik.isValid} fullWidth={true}/>

                                    <div className="text-center">
                                        <span className="text-xs">Don't have an account? <Link
                                            to={'/beta/auth/register'} className="underline uppercase">Sign
                                            up</Link></span>
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