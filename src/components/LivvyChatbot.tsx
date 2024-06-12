import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-regular-svg-icons";
import {faChevronRight, faMinus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {genericOnChangeHandler} from "../helpers/form.ts";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {DesignerChatMessage} from "../models/designer-chat/DesignerChatMessage.ts";
import {DesignerChat} from "../models/designer-chat/DesignerChat.ts";
import {useAuth} from "../sections/auth/core/Auth.loader.ts";

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
    const {currentUser} = useAuth();

    const [threadId, setThreadId] = useState<string | null>(null);

    const [chat, setChat] = useState<DesignerChat | null>(null);
    const [chatMessages, setChatMessages] = useState<DesignerChatMessage[]>([]);

    const [form, setForm] = useState<MessageFormFields>(defaultMessageFormFields);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
    // set true when the startchat API returns a chat object so that we don't request more than one in a single session
    const [isChatRequested, setIsChatRequested] = useState<boolean>(false);
    // this is set to true when we receive the welcome message from the chatbot
    const [isChatLaunched, setIsChatLaunched] = useState<boolean>(false);

    const [showToggle, setShowToggle] = useState<boolean>(true);
    const [isPendingReply, setIsPendingReply] = useState<boolean>(false);

    const endOfChatRef = useRef<HTMLDivElement>(null);

    const [connection, setConnection] = useState<WebSocket>(null);

    // const addMessage = (message: DesignerChatMessage) => {
    //     const oldMessages = [...chatMessages];
    //
    //     oldMessages.push(message);
    //
    //     setChatMessages(oldMessages);
    // }

    useEffect(() => {
        if (connection) {
            connection.onopen = () => {
                connection.send(JSON.stringify({
                    type: 'init'
                }));
            }

            connection.onmessage = evt => {
                const data = JSON.parse(evt.data);

                setChatMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        source: 'bot',
                        timestamp: '9:00 AM', // TODO integrate the time to show the user
                        text: data.message,
                        isLoading: false
                    }
                ]);

                setThreadId(data.threadId);
                setIsPendingReply(false);
            };
        }

        return () => {
            if (connection) connection.close();
        }

    }, [connection]);

    // TODO below functionality
    // On first land we have the text so they know what it is
    // And then after than when they minimize, it shows just the icon

    // TODO add pagination (scroll top) for messages
    const handleSendMessage = () => {
        connection.send(JSON.stringify({
            type: 'message',
            threadId: threadId,
            message: form.message
        }));

        setChatMessages((prevMessages) => [
            ...prevMessages,
            {
                source: 'user',
                timestamp: '9:00 AM', // TODO add timestamp
                text: form.message,
                isLoading: false
            }
        ]);

        setForm(defaultMessageFormFields);
        setIsPendingReply(true);
    }

    const showChatToggle = () => {
        if (isCollapsed) {
            setShowToggle(true);
        }
    }

    const openChat = () => {
        setIsCollapsed(false);
        setShowToggle(false);
    }

    useEffect(() => {
        const webSocket = new WebSocket('ws://localhost:9010');

        setConnection(webSocket);
    }, []);

    useEffect(() => {
        if (chatMessages.length >= 1 && !isChatLaunched) {
            const {innerWidth: width} = window;

            // open the chat only if we're not on mobile
            if (width > 768) {
                openChat();
            }

            setIsChatLaunched(true);
        }

        // everytime the chatmessages array gets updated, we scroll to the end of the chat
        endOfChatRef.current?.scrollIntoView({behavior: "smooth"});
    }, [chatMessages]);

    useEffect(() => {
        if(!isCollapsed) {
            // everytime we open the chat, we need to scroll to last message
            endOfChatRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [isCollapsed]);

    return (
        <>
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
                        <div className="flex justify-around items-start">
                            <div>
                                <h6 style={{fontFamily: "PP Editorial New"}} className="italic font-extralight text-lg mb-1">Shea McGee AI</h6>

                                <p className="text-xs w-full">Description here regarding how Livvy can adjust the items in their space via chat.</p>
                            </div>

                            <div className="text-right">
                                <button type="button" onClick={() => setIsCollapsed(true)}><FontAwesomeIcon icon={faMinus}/></button>
                            </div>
                        </div>

                    </div>
                    {/*-------------------- Header --------------------*/}

                    {/*-------------------- Body --------------------*/}
                    <div className="chat-body bg-white bg-opacity-40 p-6 flex-grow overflow-auto md:max-h-[500px]">
                        {
                            chatMessages.map((chatMessage, index) => (
                                chatMessage.source == 'bot' ?
                                    <BotMessage text={chatMessage.text} timestamp={chatMessage.timestamp} key={`chat-message-${index}`}/>
                                    :
                                    <UserMessage text={chatMessage.text} timestamp={chatMessage.timestamp} key={`chat-message-${index}`}/>
                            ))
                        }
                        {
                            isPendingReply && <BotMessage text="" timestamp="" isLoading={true}/>
                        }
                        <div style={{float: "left", clear: "both"}} ref={endOfChatRef}></div>
                    </div>
                    {/*-------------------- Body --------------------*/}

                    {/*-------------------- Footer --------------------*/}
                    <div className="chat-reply md:rounded-b-lg flex-none">
                        <Formik initialValues={form} onSubmit={handleSendMessage}
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
        </>
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
                                    <p style={{whiteSpace: "pre-wrap"}}>{text}</p>

                                    <span className="absolute inline -bottom-5 right-0 text-black opacity-40 text-xs">{timestamp}</span>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}