import {useEffect} from "react";
import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";
import {questions, StyleQuizAnswer, StyleQuizQuestion} from "../../../data/style-quiz.ts";

export const Quiz = () => {
    const {setBackgroundType, setBackgroundColor, setFooterVariant} = useMasterLayout();
    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setFooterVariant('black');
    }, []);

    return (
        <></>
        // <Question idx={index} question={question} key={`question-${question.id}`}/>
    )
}

const Question = ({idx, question} : {idx: number, question: StyleQuizQuestion}) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="container liv-container">
            <div className="inline-block m-auto">
                <h1 className="text-2xl italic font-extralight mb-8 text-center" style={{fontFamily: "PP Editorial New"}}>{idx}. {question.text}</h1>

                <div className="ps-3.5">
                    {
                        question.answers.map((answer: StyleQuizAnswer, index: number) => (
                            <Answer idx={alphabet[index]} answer={answer.text} key={`answer-${answer.id}`}/>
                        ))
                    }

                    <div className="text-right">
                        <div className="inline-flex justify-between items-center mt-6">
                            <Link to={'#'} className="uppercase text-xs border-0 border-b border-b-black me-4">back</Link>

                            <div className="w-24">
                                <LivButton as={'a'} url={'#'} text={'next'} borderColor={'border-black'} bgColor={'bg-black'} textColor={'text-white'} textSize={'text-xs'} style={'mid'} width={'full'}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Answer = ({idx, answer}: { idx: string, answer: string }) => {
    return (
        <div className="mb-2">
            <div className="inline-flex justify-start items-center p-2.5 bg-white bg-opacity-50 rounded-3xl border border-black border-opacity-50 w-60 cursor-pointer hover:bg-liv-green hover:bg-opacity-50">
                <div className="w-6 h-6 bg-liv-green text-white rounded-full relative border border-black me-2.5">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase">{idx}</span>
                </div>
                <div>{answer}</div>
            </div>
        </div>
    )
}