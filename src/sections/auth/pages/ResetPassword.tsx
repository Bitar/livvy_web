import clsx from "clsx";
import {useEffect, useState} from "react";
import {useAuthLayout} from "../../../layout/AuthLayoutContext.loader.ts";
import {toAbsoluteUrl} from "../../../helpers/toAbsoluteUrl.ts";
import LivFormErrors from "../../../components/form/LivFormErrors.tsx";
import {defaultResetPasswordFields, ResetPasswordFormFields, ResetPasswordSchema} from "../core/form.ts";
import {Form, Formik, FormikHelpers} from "formik";
import LivFieldGroup from "../../../components/form/LivFieldGroup.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {genericOnChangeHandler} from "../../../helpers/form.ts";
import {submitRequest} from "../../../helpers/requests.ts";
import {requestPassword} from "../../../requests/iam/auth.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {LivFormSuccess} from "../../../components/form/LivFormSuccess.tsx";
import {useOutsideClick} from "../../../helpers/outsideClick.ts";

export const ResetPassword = () => {
    const {closePanels, setIsPanelOpen} = useAuthLayout();

    const [form, setForm] = useState<ResetPasswordFormFields>(defaultResetPasswordFields);
    const [formErrors, setFormErrors] = useState<string[]>([]);

    const [resetStage, setResetStage] = useState<'reset' | 'confirm'>("reset");
    const [isClosing, setIsClosing] = useState<boolean>(false);

    useEffect(() => {
        setIsPanelOpen(true)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleResetPassword = (e: ResetPasswordFormFields, fns: FormikHelpers<ResetPasswordFormFields>) => {
        submitRequest(requestPassword, [form], () => {
            // we have success
            setTimeout(() => {
                setResetStage('confirm');
            }, 2000);
        }, setFormErrors, fns);
    }

    const ref = useOutsideClick(() => {
        triggerClosePanel()
    });

    const triggerClosePanel = () => {
        setIsClosing(true)
        setIsPanelOpen(false)
    }

    return (
        <div id="reset-password-panel"
             onAnimationEnd={() => {
                 if (isClosing) {
                     closePanels()
                 }
             }}
             className={clsx("liv-side-panel absolute z-50 right-0 top-0 w-full md:w-1/2 sm:w-3/4 h-full bg-liv-tan animate__animated", {
                 "animate__slideInRight": !isClosing,
                 "animate__slideOutRight": isClosing

             })} ref={ref}>

            <div id="reset-form-container"
                 className={"md:absolute md:z-60 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-center w-full sm:w-auto p-5"}>

                <div className="flex justify-center mb-5">
                    <img src={toAbsoluteUrl('assets/logo-symbol-black.png')} alt="Livvy logo symbol"
                         className="w-9 md:w-11"/>
                </div>

                <h5 className="text-black text-2xl md:text-3xl uppercase mb-2 md:mb-7">reset password</h5>

                <div className={clsx({
                    'hidden': resetStage == 'confirm'
                })}>
                    <LivFormErrors errors={formErrors}/>

                    <div className="sm:min-w-80">
                        <Formik initialValues={form} onSubmit={handleResetPassword}
                                validationSchema={ResetPasswordSchema} enableReinitialize>
                            {(formik) => (
                                <Form onChange={(e) => genericOnChangeHandler(e, form, setForm)}>
                                    <LivFieldGroup name={"email"} type={"email"} placeholder={"EMAIL"}
                                                   align='center'/>

                                    <LivFieldGroup name={"password"} type={"password"} placeholder={"PASSWORD"}
                                                   align='center'/>

                                    <LivFieldGroup name={"password_confirmation"} type={"password"}
                                                   placeholder={"CONFIRM PASSWORD"}
                                                   align='center'/>

                                    <div className="mt-6">
                                        <LivButton as={'button'} type={'submit'} text={'reset password'}
                                                   textColor={'text-white'} bgColor={'bg-black'}
                                                   borderColor={'border-black'}
                                                   isSubmitting={formik.isSubmitting}
                                                   isValid={formik.isValid} width={'full'}
                                                   className={'mb-4'}/>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

                <div className={clsx({
                    'hidden': resetStage == 'reset',
                    'animate__animated animate__fadeIn': resetStage == 'confirm'
                })}>
                    <LivFormSuccess text={'Email has been sent'} />
                </div>
            </div>

            <button className="absolute z-60 left-3 top-2" onClick={triggerClosePanel}>
                <FontAwesomeIcon icon={faXmark} size='lg'/>
            </button>
        </div>
    )
}