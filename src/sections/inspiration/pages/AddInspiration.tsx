import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {LivModal} from "../../../components/modals/LivModal.tsx";
import Dropzone from "react-dropzone";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {LivFormSuccess} from "../../../components/form/LivFormSuccess.tsx";
import {useModal} from "../../../layout/ModalProvider.tsx";
import {ErrorMessage, Form, Formik, FormikProps} from "formik";
import {
    defaultInspirationPreferenceFields,
    defaultUploadInspirationFields,
    InspirationPreferenceFormFields, InspirationPreferenceSchema,
    UploadInspirationFormFields,
    UploadInspirationSchema
} from "../core/form.ts";
import Select from "react-select";
import {useNavigate} from "react-router-dom";

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

export const AddInspiration = () => {
    const {setBackgroundType, setBackgroundColor, setShowFooter} = useMasterLayout();
    const {setIsOpen, isOpen} = useModal();

    const [step, setStep] = useState<'upload' | 'details'>('upload');

    const [uploadForm, setUploadForm] = useState<UploadInspirationFormFields>(defaultUploadInspirationFields);
    const [preferenceForm, setPreferenceForm] = useState<InspirationPreferenceFormFields>(defaultInspirationPreferenceFields);

    const navigate = useNavigate();

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setShowFooter(false);
    }, []);

    const handleSubmit = () => {
        // TODO submit preferenceForm
        navigate('/inspiration/loading')
    }

    useEffect(() => {
        if(!isOpen) {
            // we need to reset the steps
            setStep('upload');
            setUploadForm(defaultUploadInspirationFields);
            setPreferenceForm(defaultInspirationPreferenceFields);
        }
    }, [isOpen]);

    return (
        <div>
            <div className="container liv-container">
                <div className="grid grid-cols-1 gap-0 md:gap-10 md:grid-cols-2 xl:gap-20">
                    <div className="relative order-last md:order-first">
                        <div className="md:absolute md:bottom-0 md:left-0 md:z-10">
                            <h1 className={'text-4xl md:text-5xl lg:text-7xl uppercase mb-4'}>add your <br/>
                                <span
                                    style={{fontFamily: "PP Editorial New"}}
                                    className="font-thin italic capitalize">inspiration</span>
                            </h1>

                            <p className="mb-4 md:mb-6">Upload any picture from Pinterest, Instagram, a catalog or even
                                the real
                                world to use as your inspiration. If you don’t have any images, browse our curated
                                library
                                for ideas.</p>

                            <p>If you only upload one image, LIVVY will identify all the pieces from the photo and place
                                them in your space.</p>


                            <div className="mt-6 md:mt-8 lg:flex lg:justify-start lg:items-center">
                                <LivButton as={'button'} text={'upload your images'} borderColor={'border-black'}
                                           bgColor={'bg-white'} textColor={'text-black'} style={'thin'}
                                           className={"text-sm xl:text-base mb-4 lg:mb-0"}
                                           onClickHandler={() => setIsOpen(true)}/>
                                <LivButton as={'a'} url={'/inspiration/library'} text={'browse our library'}
                                           borderColor={'border-black'} bgColor={'bg-white'} textColor={'text-black'}
                                           style={'thin'} className={'lg:ms-4 text-sm xl:text-base'}/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-[url('/assets/inspiration/textiles.jpg')] bg-cover bg-no-repeat bg-center w-full h-60 mb-6 md:mb-0 md:h-[calc(100vh-150px)]"></div>
                </div>
            </div>

            <LivModal>
                <div className={clsx({
                    'hidden': step != 'upload'
                })}>
                    <h3 className='text-2xl italic capitalize font-thin mb-7'
                        style={{fontFamily: "PP Editorial New"}}>add up to 4 images</h3>

                    <Formik initialValues={uploadForm} onSubmit={() => {
                        setStep('details');
                        setPreferenceForm({...preferenceForm, totalInspirations: uploadForm.files.length})
                    }}
                            validationSchema={UploadInspirationSchema} enableReinitialize>
                        {
                            (formik) => (
                                <Form>
                                    <div>
                                        <Dropzone onDrop={acceptedFiles => setUploadForm({files: acceptedFiles})}>
                                            {({getRootProps, getInputProps}) => (
                                                <section>
                                                    <div {...getRootProps()}
                                                         className="h-80 w-full sm:w-[400px] relative rounded-3xl border-2 border-dashed border-slate-300 cursor-pointer">
                                                        <input {...getInputProps()} />

                                                        <div
                                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                                            <FontAwesomeIcon icon={faArrowUpFromBracket}
                                                                             className='text-liv-grey text-2xl'/>
                                                            <p className='text-slate-500 text-center mt-3'>Click
                                                                to browse or <br/> drag and drop your files</p>

                                                            <div className={clsx("mt-3", {
                                                                'hidden': uploadForm.files.length == 0
                                                            })}>
                                                                <LivFormSuccess
                                                                    text={`${uploadForm.files.length} files were uploaded`}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            )}
                                        </Dropzone>

                                        <div className={`text-red-600 text-sm mt-2 text-left`}>
                                            <ErrorMessage name={'files'}/>
                                        </div>
                                    </div>

                                    <div
                                        className='absolute bottom-6 left-1/2 -translate-x-1/2 w-4/5 sm:static sm:-translate-x-0 sm:bottom-0 sm:left-0 sm:w-auto sm:flex sm:justify-end sm:mt-6'>
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
                </div>

                <div className={clsx({
                    'hidden': step != 'details'
                })}>
                    <h3 className='text-2xl italic capitalize font-thin mb-7'
                        style={{fontFamily: "PP Editorial New"}}>What do you like about these images?</h3>

                    <Formik initialValues={preferenceForm} onSubmit={handleSubmit}
                            validationSchema={InspirationPreferenceSchema} enableReinitialize>
                        {
                            (formik) => (
                                <Form>
                                    <div className='sm:grid sm:grid-cols-2 lg:grid-cols-none lg:flex justify-between items-center gap-6'>
                                        {
                                            uploadForm.files?.map((inspiration, idx) => <InspirationDetail
                                                image={URL.createObjectURL(inspiration)} index={idx + 1} key={idx}
                                                formik={formik} form={preferenceForm} setForm={setPreferenceForm}/>)
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
                </div>
            </LivModal>
        </div>

    )
}

const InspirationDetail = ({image, index, formik, form, setForm}: {
    image: string,
    index: number,
    formik: FormikProps<InspirationPreferenceFormFields>,
    form: InspirationPreferenceFormFields,
    setForm: Dispatch<SetStateAction<InspirationPreferenceFormFields>>
}) => {
    return (
        <div className="w-full lg:w-52 mb-10 sm:mb-0">
            <div
                className={`w-full h-72 bg-cover bg-no-repeat bg-center mb-4`}
                style={{background: `url(${image})`}}></div>

            <Select name={`preference${index}`}
                    className={'liv-select'}
                    classNamePrefix={'liv-select'}
                    isSearchable={false}
                    options={preferenceOptions}
                    getOptionLabel={(preference) => preference.name}
                    getOptionValue={(preference) => preference.id.toString()}
                    placeholder={'choose an option'}
                    onChange={(e) => setForm({...form, [`preference${index}`]: e.id})}
            />

            <div className={`text-red-600 text-sm mt-2 text-left`}>
                {formik.errors[`preference${index}`] ? formik.errors[`preference${index}`] : null}
            </div>
        </div>
    )
}