import {useEffect} from "react";
import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {Link} from "react-router-dom";

export const QuizQuestion = () => {
    const {setBackgroundType, setBackgroundColor, setFooterVariant} = useMasterLayout();

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setFooterVariant('black');
    }, []);

    return (
        <Question idx={1} question={'How do you want your space to feel?'} />
    )
}

const Question = ({idx, question} : {idx: number, question: string}) => {
    return (
        <div className="container liv-container">
            <div className="inline-block m-auto">
                <h1 className="text-2xl italic font-extralight mb-8 text-center" style={{fontFamily: "PP Editorial New"}}>{idx}. {question}</h1>

                <div className="ps-3.5">
                    <Answer idx={'A'} answer={'Welcoming and warm'}/>
                    <Answer idx={'B'} answer={'Airy and minimal'}/>
                    <Answer idx={'c'} answer={'Unique and vintage'}/>
                    <Answer idx={'d'} answer={'Cool and modern'}/>
                    <Answer idx={'e'} answer={'Relaxing and cozy'}/>
                    <Answer idx={'f'} answer={'Glamorous and feminine'}/>
                    <Answer idx={'g'} answer={'Rustic and warm'}/>

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