import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-regular-svg-icons";
import {faChevronRight, faMinus} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import clsx from "clsx";
import {genericOnChangeHandler} from "../helpers/form.ts";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";

interface MessageFormFields {
    message: string
}

const defaultMessageFormFields: MessageFormFields = {
    message: ''
}

const MessageValidationSchema = Yup.object().shape({
    message: Yup.string().min(3, 'minimum 3 characters').required()
})

export const LivvyChatbot = () => {
    const [form, setForm] = useState<MessageFormFields>(defaultMessageFormFields);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    // TODO add pagination (scroll top) for messages
    const sendMessage = () => {
        // TODO implement below flow
        // send message through API
        // when the API acknowledges receipt, we show the message in the chat window
        // add the bot loading message until we receive a reply
        // reset the form + clear the message input field
        console.log(form);
        console.log("message sent");
    }

    return (
        <div className="fixed bottom-8 right-8">
            <button type="button" className={clsx("py-4 px-6 bg-liv-green text-white italic capitalize font-extralight rounded-full liv-white-hover bg-opacity-70 backdrop-blur-md", {
                "hidden": !isCollapsed
            })} style={{fontFamily: "PP Editorial New"}} onClick={() => setIsCollapsed(false)}>Shea McGee Virtual Assistant <FontAwesomeIcon icon={faComment} className="ms-2"/></button>

            <div className={clsx("chat-container backdrop-blur-md w-96", {
                'hidden': isCollapsed
            })}>
                <div className="chat-header bg-liv-green bg-opacity-70 text-white  p-4 rounded-t-lg">
                    <div className="text-right mb-0.5">
                        <button type="button" onClick={() => setIsCollapsed(true)}><FontAwesomeIcon icon={faMinus}/></button>
                    </div>

                    <h6 style={{fontFamily: "PP Editorial New"}} className="italic font-extralight text-lg mb-1">Shea McGee AI</h6>

                    <p className="text-xs w-full max-w-64">Description here regarding how Livvy can adjust the items in their space via chat.</p>
                </div>

                <div className="chat-body bg-white bg-opacity-40 p-6 overflow-y-auto max-h-[600px]">
                    <UserMessage text={'Lorem ipsum dolar sit amet.'} timestamp={'08:15 AM'}/>
                    <BotMessage text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed?'} timestamp={'08:17 AM'}/>
                    <UserMessage text={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto aut autem blanditiis cum cupiditate deserunt dignissimos eius, eos expedita facere modi nam odit officia quisquam reiciendis' +
                        ' saepe voluptate voluptates.'} timestamp={'08:25 AM'}/>
                    <BotMessage text={'Great choice!'} timestamp={'08:26 AM'}/>
                    <UserMessage text={'Can I design another room?'} timestamp={'08:30 AM'}/>
                    <BotMessage isLoading={true}/>
                </div>

                <div className="chat-reply rounded-b-lg">
                    <Formik initialValues={form} onSubmit={sendMessage}
                            validationSchema={MessageValidationSchema} enableReinitialize>
                        {
                            () => (
                                <Form onChange={(e) => genericOnChangeHandler(e, form, setForm)} className="rounded-b-lg relative">
                                    <Field type={'text'}
                                           name={'message'}
                                           placeholder={'Reply ...'}
                                           className="w-full placeholder-black placeholder:text-sm placeholder:opacity-60 px-6 py-4 rounded-b-lg ring-0 outline-0"/>

                                    <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-6 h-6 w-6 bg-black rounded-full">
                                        <FontAwesomeIcon icon={faChevronRight} className="text-white text-xs"/>
                                    </button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        </div>
    )
}

const UserMessage = ({text, timestamp}: { text: string, timestamp: string }) => {
    return (
        <div className="mb-8 text-right last:mb-0">
            <div className="rounded-b-lg px-4 py-2 text-sm inline-block relative bg-white text-black rounded-tl-lg">
                <p>{text}</p>

                <span className="absolute inline -bottom-5 text-black opacity-40 text-xs left-0">{timestamp}</span>
            </div>
        </div>
    )
}

const BotMessage = ({text, timestamp, isLoading = false}: { text?: string, timestamp?: string, isLoading?: boolean }) => {
    return (
        <div className="mb-8 text-left last:mb-0">
            <div className="flex justify-between items-start gap-x-2.5">
                <div className="w-8 h-8 rounded-full bg-no-repeat bg-center bg-cover bg-[url('/assets/celebrities/shea-mcgee-headshot.png')] flex-none"></div>

                <div className="flex-auto">
                    <div className="text-sm mb-1">Shea McGee AI</div>


                    <div className="rounded-b-lg px-4 py-2 text-sm inline-block relative bg-liv-green text-white rounded-tr-lg">
                        {
                            isLoading ?
                                <div className='flex space-x-1 justify-center items-center h-4 w-12'>
                                    <div className='h-1.5 w-1.5 bg-white opacity-40 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                    <div className='h-1.5 w-1.5 bg-white opacity-40 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                    <div className='h-1.5 w-1.5 bg-white opacity-40 rounded-full animate-bounce'></div>
                                </div>
                                :
                                <>
                                    <p>{text}</p>

                                    <span className="absolute inline -bottom-5 right-0 text-black opacity-40 text-xs">{timestamp}</span>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}