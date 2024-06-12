import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import React, {useEffect, useState} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {LivModal} from "../../../components/modals/LivModal.tsx";
import Dropzone from "react-dropzone";
import {faArrowUpFromBracket} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import {LivFormSuccess} from "../../../components/form/LivFormSuccess.tsx";
import {useModal} from "../../../layout/ModalProvider.loader.ts";
import {ErrorMessage, Form, Formik} from "formik";
import {
    defaultInspirationPreferenceFields,
    defaultUploadInspirationFields,
    InspirationPreferenceFormFields,
    UploadInspirationFormFields,
    UploadInspirationSchema
} from "../core/form.ts";
import {useNavigate} from "react-router-dom";
import {InspirationFeedback} from "../partials/InspirationFeedback.tsx";

export const AddInspiration = () => {
    const {setBackgroundType, setBackgroundColor, setHeaderBgColor} = useMasterLayout();
    const {setIsOpen, isOpen} = useModal();

    const [step, setStep] = useState<'upload' | 'details'>('upload');

    const [uploadForm, setUploadForm] = useState<UploadInspirationFormFields>(defaultUploadInspirationFields);
    const [preferenceForm, setPreferenceForm] = useState<InspirationPreferenceFormFields>(defaultInspirationPreferenceFields);

    const navigate = useNavigate();

    useEffect(() => {
        setHeaderBgColor('liv-tan');
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        // TODO submit preferenceForm
        // mark the modal as closed before navigating away
        setIsOpen(false);

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
                                           bgColor={'bg-white'} textColor={'text-black'} style={'mid'}
                                           className={"mb-4 lg:mb-0"} textSize={'text-xs xl:text-sm'}
                                           onClickHandler={() => setIsOpen(true)}/>
                                <LivButton as={'a'} url={'/inspiration/browse'} text={'browse our library'}
                                           borderColor={'border-black'} bgColor={'bg-white'} textColor={'text-black'}
                                           style={'mid'} className={'lg:ms-4'} textSize={'text-xs xl:text-sm'}/>
                            </div>
                        </div>
                    </div>

                    <div
                        className="bg-[url('/assets/inspiration/textiles.jpg')] bg-cover bg-no-repeat bg-center w-full h-60 mb-6 md:mb-0 md:h-[calc(100vh-150px)]"></div>
                </div>
            </div>

            <LivModal>
                <div className={clsx('relative h-full sm:min-w-[400px]',{
                    'hidden': step != 'upload'
                })}>
                    <h3 className='text-2xl italic capitalize font-thin mb-7 text-center'
                        style={{fontFamily: "PP Editorial New"}}>add up to 4 images</h3>

                    <Formik initialValues={uploadForm} onSubmit={() => {
                        setStep('details');
                        setPreferenceForm({...preferenceForm, totalInspirations: uploadForm.files.length})
                    }}
                            validationSchema={UploadInspirationSchema} enableReinitialize>
                        {
                            (formik) => (
                                <Form>
                                    <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full sm:static sm:translate-y-0">
                                        <Dropzone onDrop={acceptedFiles => setUploadForm({files: acceptedFiles})}>
                                            {({getRootProps, getInputProps}) => (
                                                <section>
                                                    <div {...getRootProps()}
                                                         className="h-80 w-full lg:w-[400px] relative rounded-3xl border-2 border-dashed border-slate-300 cursor-pointer">
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
                                        className='absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:static sm:-translate-x-0 sm:bottom-0 sm:left-0 sm:w-auto sm:flex sm:justify-end sm:mt-6'>
                                        <LivButton as={'button'} type={'submit'} text={'next'}
                                                   borderColor={'border-black'} bgColor={'bg-black'}
                                                   textColor={'text-white'} onWhiteBg={true}
                                                   className={'w-full sm:w-auto'}
                                                   width={'custom'}
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
                    <InspirationFeedback form={preferenceForm} setForm={setPreferenceForm} files={uploadForm.files} handleSubmit={handleSubmit} />
                </div>
            </LivModal>
        </div>

    )
}