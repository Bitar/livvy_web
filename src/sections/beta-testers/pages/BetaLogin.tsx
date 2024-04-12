import {Form, Formik} from "formik";
import {BetaLoginFormFields, BetaLoginSchema, defaultBetaLoginFormFields} from "../core/form.ts";
import {genericOnChangeHandler} from "../../../helpers/form.ts";
import LivFieldGroup from "../../../components/form/LivFieldGroup.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";
import {useState} from "react";
import {getUserByToken, login} from "../../../requests/iam/auth.ts";
import {useAuth} from "../../auth/core/Auth.tsx";

export const BetaLogin = () => {
    const [hasLoginErrors, setHasLoginErrors] = useState<boolean>(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');
    const [form, setForm] = useState<BetaLoginFormFields>(defaultBetaLoginFormFields);

    const {saveAuth, setCurrentUser} = useAuth();

    const handleSubmit = async (values: any, {setSubmitting}: any) => {
        try {
            const auth = await login(form.email, form.password)

            saveAuth(auth)

            const {data: user} = await getUserByToken(auth.token)

            setCurrentUser(user)
        } catch (error) {
            saveAuth(undefined)
            setHasLoginErrors(true)
            setLoginErrorMessage('These credentials do not match our records.')
            setSubmitting(false)
        }
    }

    return (
        <>
            <div className="text-center mb-4">
                <img src="/assets/logo-symbol-black.png" alt="livvy logo symbol" className="w-11 m-auto"/>
            </div>

            <h1 className="text-center uppercase text-3xl">sign in</h1>

            {hasLoginErrors && <p className="text-red-600">{loginErrorMessage}</p>}

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
                                    <div className="w-[300px] m-auto">
                                        <LivButton as={'button'} type={'submit'} text={'sign in'}
                                                   textColor={'text-white'} bgColor={'bg-black'}
                                                   borderColor={'border-black'}
                                                   isSubmitting={formik.isSubmitting}
                                                   isValid={formik.isValid} fullWidth={true}/>

                                        <span className="text-xs">Don't have an account? <Link to={'/beta/auth/register'} className="underline uppercase">Sign up</Link></span>
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