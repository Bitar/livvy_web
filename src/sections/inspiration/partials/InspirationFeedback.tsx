import {Form, Formik, FormikProps} from "formik";
import {InspirationPreferenceFormFields, InspirationPreferenceSchema} from "../core/form.ts";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import React, {Dispatch, SetStateAction, useEffect, useRef} from "react";
import Select from "react-select";

export const InspirationFeedback = ({form, setForm, handleSubmit, files, urls}: {
    form: InspirationPreferenceFormFields,
    setForm: Dispatch<SetStateAction<InspirationPreferenceFormFields>>,
    handleSubmit: any,
    files?: File[],
    urls?: string[]
}) => {
    return (
        <>
            <h3 className='text-2xl italic capitalize font-thin mb-7'
                style={{fontFamily: "PP Editorial New"}}>What do you like about these images?</h3>

            <Formik initialValues={form} onSubmit={handleSubmit}
                    validationSchema={InspirationPreferenceSchema} enableReinitialize>
                {
                    (formik) => (
                        <Form>
                            <div
                                className='sm:grid sm:grid-cols-2 lg:grid-cols-none lg:flex justify-between items-center gap-6'>
                                {
                                    files ?
                                        files.map((inspiration, idx) => <InspirationDetail
                                            image={URL.createObjectURL(inspiration)} index={idx + 1} key={idx}
                                            formik={formik} form={form} setForm={setForm}/>) :
                                        urls.map((url, idx) => <InspirationDetail
                                            image={url} index={idx + 1} key={idx}
                                            formik={formik} form={form} setForm={setForm}/>)
                                }
                            </div>

                            <div className="mt-16 flex justify-end">
                                <LivButton as={'button'} type={'submit'} text={'next'}
                                           borderColor={'border-black'} bgColor={'bg-black'}
                                           textColor={'text-white'} onWhiteBg={true}
                                           className={'w-full sm:w-auto'}
                                           isSubmitting={formik.isSubmitting}
                                           isValid={formik.isValid}
                                />
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

const InspirationDetail = ({image, index, formik, form, setForm}: {
    image: string,
    index: number,
    formik: FormikProps<InspirationPreferenceFormFields>,
    form: InspirationPreferenceFormFields,
    setForm: Dispatch<SetStateAction<InspirationPreferenceFormFields>>
}) => {
    const selectRef = useRef<any>(null);

    useEffect(() => {
        // if the current input name is not in form OR its value is '' then we need to reset
        if (!(`preference${index}` in form) || form[`preference${index}`] == '') {
            selectRef.current?.clearValue();
        }
    }, [form]);

    return (
        <div className="w-full lg:w-52 mb-10 sm:mb-0">
            <div
                className={`w-full h-72 bg-cover bg-no-repeat bg-center mb-4`}
                style={{backgroundImage: `url(${image})`}}></div>

            <Select name={`preference${index}`}
                    ref={selectRef}
                    className={'liv-select'}
                    classNamePrefix={'liv-select'}
                    isSearchable={false}
                    options={preferenceOptions}
                    getOptionLabel={(preference) => preference.name}
                    getOptionValue={(preference) => preference.id.toString()}
                    placeholder={'choose an option'}
                    onChange={(e) => {
                        if (e) {
                            setForm({...form, [`preference${index}`]: e.id});
                        }
                    }}
            />

            <div className={`text-red-600 text-sm mt-2 text-left`}>
                {formik.errors[`preference${index}`] ? formik.errors[`preference${index}`] : null}
            </div>
        </div>
    )
}

const preferenceOptions = [
    {
        id: 1,
        name: "furniture"
    },
    {
        id: 2,
        name: "color palette"
    },
    {
        id: 3,
        name: "design style"
    }
]