import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-regular-svg-icons";
import {faChevronRight, faMinus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import clsx from "clsx";
import {genericOnChangeHandler} from "../helpers/form.ts";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {designerChatMessages} from "../data/designerChatMessages.ts";
import {DesignerChatMessage} from "../models/designer-chat/DesignerChatMessage.ts";

interface MessageFormFields {
    message: string
}

const defaultMessageFormFields: MessageFormFields = {
    message: ''
}

const MessageValidationSchema = Yup.object().shape({
    message: Yup.string().min(3, 'minimum 3 characters').required()
});

export const LivvyChatbot = () => {
    const [chatMessages, setChatMessages] = useState<DesignerChatMessage[]>(designerChatMessages);

    const [form, setForm] = useState<MessageFormFields>(defaultMessageFormFields);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

    const [showToggle, setShowToggle] = useState<boolean>(true);

    // TODO below functionality
    // On first land we have the text so they know what it is
    // And then after than when they minimize, it shows just the icon

    // TODO add pagination (scroll top) for messages
    const sendMessage = () => {
        // TODO send message through API
        // TODO when the API acknowledges receipt, we show the message in the chat window
        // TODO add the bot loading message until we receive a reply
        // TODO reset the form + clear the message input field
        const oldForm = {...form};

        console.log([...chatMessages, {
            source: 'user',
            timestamp: '9:00 AM',
            text: oldForm.message,
            isLoading: false
        }]);

        setChatMessages([...chatMessages, {
            source: 'user',
            timestamp: '9:00 AM',
            text: oldForm.message,
            isLoading: false
        }]);

        setForm(defaultMessageFormFields);

        // TODO add a flag to show the bot loading messages instead of adding it to the chat messages because if we add it to chat messages we'll have to worry about removing it

        // setTimeout(() => {
        //     console.log(chatMessages);
        //
        //     setChatMessages([...chatMessages, {
        //         source: 'bot',
        //         text: '',
        //         timestamp: '',
        //         isLoading: true
        //     }]);
        // }, 5000);

        console.log(form);
        console.log("message sent");
    }

    useEffect(() => {
        const {innerWidth: width} = window;

        if (width > 768) {
            setTimeout(() => {
                openChat();
            }, 1000);
        }
    }, []);

    const showChatToggle = () => {
        if (isCollapsed) {
            setShowToggle(true);
        }
    }

    const openChat = () => {
        setIsCollapsed(false);
        setShowToggle(false);
    }

    return (
        <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 z-40 text-right">
            <button type="button" className={clsx("mb-4 me-4 md:m-0 w-12 h-12 bg-liv-green text-white rounded-full bg-opacity-70 backdrop-blur-md overflow-visible", {
                "animate__animated animate__fadeIn": showToggle,
                "hidden": !showToggle
            })} onClick={openChat}>
                <FontAwesomeIcon icon={faComment} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                <span className="absolute -top-1.5 -right-1.5 bg-black rounded-full w-6 h-6">
                    <span className="text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">3</span>
                </span>
            </button>

            <div onTransitionEnd={showChatToggle} className={clsx("chat-container backdrop-blur-md w-full md:w-96 md:rounded-t-lg h-screen md:h-auto flex flex-col", {
                'expanded': !isCollapsed
            })}>
                {/*-------------------- Header --------------------*/}
                <div className="chat-header bg-liv-green bg-opacity-70 text-white p-4 md:rounded-t-lg flex-none text-left">
                    <div className="text-right mb-0.5">
                        <button type="button" onClick={() => setIsCollapsed(true)}><FontAwesomeIcon icon={faMinus}/></button>
                    </div>

                    <h6 style={{fontFamily: "PP Editorial New"}} className="italic font-extralight text-lg mb-1">Shea McGee AI</h6>

                    <p className="text-xs w-full max-w-64">Description here regarding how Livvy can adjust the items in their space via chat.</p>
                </div>
                {/*-------------------- Header --------------------*/}

                {/*-------------------- Body --------------------*/}
                <div className="chat-body bg-white bg-opacity-40 p-6 flex-grow overflow-auto md:max-h-[500px]">
                    {
                        chatMessages.map((chatMessage, index) => (
                            chatMessage.source == 'bot' ?
                                (
                                    chatMessage.isLoading ?
                                        <BotMessage isLoading={true} key={`chat-message-${index}`}/>
                                        :
                                        <BotMessage text={chatMessage.text} timestamp={chatMessage.timestamp} key={`chat-message-${index}`}/>
                                )
                                :
                                <UserMessage text={chatMessage.text} timestamp={chatMessage.timestamp} key={`chat-message-${index}`}/>
                        ))
                    }
                </div>
                {/*-------------------- Body --------------------*/}

                {/*-------------------- Footer --------------------*/}
                <div className="chat-reply md:rounded-b-lg flex-none">
                    <Formik initialValues={form} onSubmit={sendMessage}
                            validationSchema={MessageValidationSchema} enableReinitialize>
                        {
                            () => (
                                <Form onChange={(e) => genericOnChangeHandler(e, form, setForm)} className="md:rounded-b-lg relative">
                                    <Field type={'text'}
                                           name={'message'}
                                           placeholder={'Reply ...'}
                                           className="w-full placeholder-black placeholder:text-sm placeholder:opacity-60 px-6 py-4 md:rounded-b-lg ring-0 outline-0"/>

                                    <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-6 h-6 w-6 bg-black rounded-full">
                                        <FontAwesomeIcon icon={faChevronRight} className="text-white text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                                    </button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
                {/*-------------------- Footer --------------------*/}
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