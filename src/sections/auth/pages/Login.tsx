import {toAbsoluteUrl} from "../../../helpers/toAbsoluteUrl.ts";
import {defaultLoginFormFields, LoginSchema} from "../core/form.ts";
import {Form, Formik, FormikHelpers} from "formik";
import {getUserByToken, login} from "../../../requests/iam/auth.ts";
import {useEffect, useState} from "react";
import LivFieldGroup from "../../../components/form/LivFieldGroup.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import clsx from "clsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {useAuthLayout} from "../../../layout/AuthLayoutContext.loader.ts";
import {useNavigate} from "react-router-dom";
import {useOutsideClick} from "../../../helpers/outsideClick.ts";
import {BetaRegisterFormFields} from "../../beta-testers/core/form.ts";
import {useAuth} from "../core/Auth.loader.ts";

export const Login = () => {
    const {closePanels, setIsPanelOpen} = useAuthLayout();

    const {saveAuth, setCurrentUser} = useAuth();

    const [hasLoginErrors, setHasLoginErrors] = useState<boolean>(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    const [isClosing, setIsClosing] = useState<boolean>(false)

    useEffect(() => {
        setIsPanelOpen(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLoginSubmit = async (e: BetaRegisterFormFields, fns: FormikHelpers<BetaRegisterFormFields>) => {
        try {
            const {data: auth} = await login(e.email, e.password)

            saveAuth(auth)

            const {data: user} = await getUserByToken(auth.token)

            setCurrentUser(user)
        } catch (error) {
            saveAuth(undefined)
            setHasLoginErrors(true)
            setLoginErrorMessage('These credentials do not match our records.')
            fns.setSubmitting(false)
        }
    }

    const ref = useOutsideClick(() => {
        triggerClosePanel()
    });

    const triggerClosePanel = () => {
        setIsClosing(true)
        setIsPanelOpen(false)
    }

    return (
        <div id="login-panel"
             onAnimationEnd={() => {
                 if (isClosing) {
                     closePanels()
                 }
             }}
             className={clsx("liv-side-panel fixed z-50 right-0 top-0 w-full md:w-1/2 sm:w-3/4 h-full bg-liv-tan animate__animated overflow-y-scroll", {
                 "animate__slideInRight": !isClosing,
                 "animate__slideOutRight": isClosing

             })} ref={ref}>
            <div id="login-form-container"
                 className="absolute z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full sm:w-auto p-5 overflow-y-scroll md:overflow-auto">
                <div className="flex justify-center mb-5">
                    <img src={toAbsoluteUrl('assets/logo-symbol-black.png')} alt="Livvy logo symbol"
                         className="w-11"/>
                </div>

                <h5 className="text-black text-3xl uppercase mb-7">log in</h5>

                {hasLoginErrors && <p className="text-red-600">{loginErrorMessage}</p>}

                <div className="sm:min-w-80 ">
                    <Formik initialValues={defaultLoginFormFields} onSubmit={handleLoginSubmit}
                            validationSchema={LoginSchema} enableReinitialize>
                        {(formik) => (
                            <Form>
                                <LivFieldGroup name={"email"} type={"email"} placeholder={"EMAIL"}
                                               align='center'/>

                                <LivFieldGroup name={"password"} type={"password"} placeholder={"PASSWORD"}
                                               align='center'/>

                                <div className="mt-6">
                                    <LivButton as={'button'} type={'submit'} text={'Log in'}
                                               textColor={'text-white'} bgColor={'bg-black'}
                                               borderColor={'border-black'}
                                               isSubmitting={formik.isSubmitting}
                                               isValid={formik.isValid} fullWidth={true}
                                               className={'mb-4'}/>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <LivButton text={'continue with google'} borderColor={'border-black'}
                               bgColor={'bg-transparent'} arrowIcon={false}
                               textIcon={'assets/google-icon.svg'}
                               fullWidth={true} className={'mb-4'}/>

                    <LivButton text={'continue with pinterest'} borderColor={'border-black'}
                               bgColor={'bg-transparent'} arrowIcon={false}
                               textIcon={'assets/pinterest-icon.svg'} fullWidth={true} className={'mb-4'}/>

                    <div>
                        <button className="uppercase text-xs border-0 border-b border-b-black" onClick={() => navigate('/auth/reset-password')}>reset password</button>
                    </div>
                </div>

                <div className="block mt-[30%] mb-4 sm:hidden sm:mt-0 sm:mb-0">
                    <CreateAccount />
                </div>
            </div>

            <div id="login-footer" className="hidden sm:block absolute z-60 left-0 bottom-3 sm:bottom-7 w-full">
                <CreateAccount />
            </div>

            <button className="absolute z-60 right-3 top-2" onClick={triggerClosePanel}>
                <FontAwesomeIcon icon={faXmark} size='lg'/>
            </button>
        </div>
    )
}

const CreateAccount = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center align-middle">
            <span className="uppercase me-1">no account?</span>

            <button className="uppercase border-0 border-b border-b-black" onClick={() => navigate('/auth/register')}>create one</button>
        </div>
    )
}