import {FormEvent, useEffect, useRef, useState} from "react";
import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {questions, StyleQuizAnswer, StyleQuizQuestion} from "../../../data/style-quiz.ts";
import {useWizard, Wizard} from 'react-use-wizard';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link} from "react-router-dom";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import clsx from "clsx";
import {QuestionForm, QuestionSchema} from "../core/form.ts";
import toast from "react-hot-toast";

export const Quiz = () => {
    const {setBackgroundType, setBackgroundColor, setFooterVariant} = useMasterLayout();

    const [form, setForm] = useState<QuestionForm[]>([])

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setFooterVariant('black');

        setForm(questions.map((current) => (
            {id: current.id, answer: ""}
        )))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = () => {
        console.log(form);
    }

    const handleOnChange = (e: FormEvent<HTMLFormElement>) => {
        const target = e.target as HTMLInputElement;

        const name = target.name
        const value = target.value

        const start = name.indexOf('[') + 1;
        const end = name.indexOf(']');
        const questionIndex = Number(name.substring(start, end));

        setForm((prevForm) =>
            prevForm.map((item, idx) =>
                idx === questionIndex ? {...item, answer: value} : item
            )
        );
    }

    return (
        <div className="container liv-container">
            <div className="inline-block m-auto">
                <Formik
                    initialValues={form}
                    onSubmit={handleSubmit}
                    enableReinitialize>
                    <Form onChange={handleOnChange}>
                        {form && form.length > 0 && (
                            <>
                                {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
                                {/*<pre>{JSON.stringify(form, null, 2)}</pre>*/}
                                <Wizard>
                                    {questions.map((question, idx) => {
                                        return (
                                            <div key={`question-${question.id}`}>
                                                <Question idx={idx} question={question} form={form}
                                                          handleSubmit={handleSubmit}/>
                                            </div>
                                        )
                                    })}
                                </Wizard>
                            </>
                        )}
                    </Form>
                </Formik>
            </div>
        </div>
    )
}


const Question = ({idx, question, form, handleSubmit}: {
    idx: number,
    question: StyleQuizQuestion,
    form: QuestionForm[],
    handleSubmit: () => void
}) => {
    const {
        isFirstStep,
        isLastStep,
        previousStep,
        nextStep
    } = useWizard();

    const submitQuestion = () => {
        QuestionSchema.validate(form[idx])
            .then(() => {
                if (!isLastStep) {
                    nextStep().then()
                } else {
                    handleSubmit()
                }
            })
            .catch(() => {
                toast.error('Choose an answer to proceed to next question.', {
                    duration: 3000
                });
            })
    }

    return (
        <div className="max-w-lg">
            <h1 className="text-xl md:text-2xl italic font-extralight mb-8 text-center"
                style={{fontFamily: "PP Editorial New"}}>{idx + 1}. {question.text}</h1>

            <div className="ps-3.5">
                {question.answers.map((answer, answerIndex) => {
                    return (
                        <Answer key={`answer-${answer.id}`} answer={answer} questionIndex={idx} answerIndex={answerIndex} form={form}/>
                    )
                })}

                <div className="text-right">
                    <div className="inline-flex justify-between items-center mt-6">
                        {!isFirstStep &&
                            <Link to={'#'} onClick={() => previousStep()}
                                  className="uppercase text-xs border-0 border-b border-b-black me-4">back</Link>
                        }

                        <div className="w-24">
                            <LivButton as={'button'} text={isLastStep ? 'Submit' : 'next'}
                                       borderColor={'border-black'}
                                       bgColor={'bg-black'} textColor={'text-white'} textSize={'text-xs'}
                                       style={'mid'} width={'full'} onClickHandler={() => submitQuestion()}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Answer = ({questionIndex, answerIndex, answer, form}: {
    questionIndex: number,
    answerIndex: number,
    answer: StyleQuizAnswer,
    form: QuestionForm[]
}) => {
    const radioRef = useRef<HTMLInputElement>(null);
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="mb-2" key={`answer-${answer.id}`} onClick={() => radioRef.current.click()}>
            <div
                className={clsx("inline-flex justify-start items-center p-2.5 bg-opacity-50 rounded-3xl border border-black border-opacity-50 w-60 cursor-pointer hover:bg-liv-green hover:bg-opacity-50", {
                    'bg-liv-green': form[questionIndex].answer == answer.id.toString(),
                    'bg-white': form[questionIndex].answer != answer.id.toString()
                })}>
                <div
                    className="w-6 h-6 bg-liv-green text-white rounded-full relative border border-black me-2.5">
                                <span
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase">{alphabet[answerIndex]}</span>
                </div>
                <Field type="radio" name={`[${questionIndex}].answer`} value={answer.id}
                       checked={form[questionIndex].answer == answer.id.toString()} innerRef={radioRef}
                       className={'invisible'}/>

                <ErrorMessage name={`[${questionIndex}].answer`}/>
                <div>{answer.text}</div>
            </div>
        </div>
    )
}