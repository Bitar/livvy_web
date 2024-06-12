import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment} from "@fortawesome/free-regular-svg-icons";
import {faChevronRight, faMinus} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {genericOnChangeHandler} from "../helpers/form.ts";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {DesignerChatMessage} from "../models/designer-chat/DesignerChatMessage.ts";
import {initializeApp} from "firebase/app";
import {getMessaging, getToken, onMessage} from "firebase/messaging";
import {submitRequest} from "../helpers/requests.ts";
import {registerUserToken} from "../requests/iam/Firebase.ts";
import toast from "react-hot-toast";
import {sendMessage, startChat} from "../requests/chatbot/DesignerChat.ts";
import {DesignerChat} from "../models/designer-chat/DesignerChat.ts";
import {LivModal} from "./modals/LivModal.tsx";
import {useModal} from "../layout/ModalProvider.loader.ts";
import {LivButton} from "./buttons/LivButton.tsx";

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
    const {setIsOpen, isOpen} = useModal();

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

    // start: firebase states
    const [isTokenFound, setTokenFound] = useState<boolean>(false);
    const [token, setToken] = useState<string>(null);
    const [tokenRegistrationErrors, setTokenRegistrationErrors] = useState<string[]>([]);

    const [notificationsAccepted, setNotificationsAccepted] = useState<boolean>(true);
    // end: firebase state

    const endOfChatRef = useRef<HTMLDivElement>(null);

    // START FIREBASE
    const firebaseConfig = {
        apiKey: "AIzaSyA_Qwl9-5Vjlr3AHh5piiPDsMJZFeXHPrw",
        authDomain: "livvy-791d3.firebaseapp.com",
        projectId: "livvy-791d3",
        storageBucket: "livvy-791d3.appspot.com",
        messagingSenderId: "508730217674",
        appId: "1:508730217674:web:ea232c83fd5a6cf2c25033",
        measurementId: "G-45XDPH3GZN"
    };

    // Initialize Firebase
    const firebaseApp = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebaseApp);

    const getAppToken = () => {
        return getToken(messaging, {vapidKey: 'BPePZxodyaclbumEEGyOR-ydl9OW1TeF0o16nUustBIgFv6T-Wwanni1Ni_5BYYBYMcVi623sJmThR2_gFPU9vI'}).then((currentToken) => {
            if (currentToken) {
                submitRequest(registerUserToken, [{'platform': 3, 'token': currentToken}], () => {
                }, setTokenRegistrationErrors);

                setTokenFound(true);
                setToken(currentToken);
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                toast.error('Failure to establish connection with designer chat. Make sure notifications are enabled for browser.', {
                    duration: 5000
                });

                setTokenFound(false);
                // shows on the UI that permission is required
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Failure to establish connection with designer chat. Make sure you\'re not in incognito mode.', {
                duration: 5000
            });
            // catch error while creating client token
        });
    }

    const onMessageListener = () =>
        new Promise((resolve) => {
            onMessage(messaging, (payload) => {
                resolve(payload);
            });
        });

    onMessageListener().then((payload: { notification: { title: string, body: string } }) => {
        console.log(payload);

        setChatMessages([...chatMessages, {
            source: 'bot',
            timestamp: '9:00 AM', // TODO integrate the time to show the user
            text: payload.notification.body,
            isLoading: false
        }]);

        setIsPendingReply(false);
    }).catch(err => console.log('failed: ', err));

    // END FIREBASE

    // TODO below functionality
    // On first land we have the text so they know what it is
    // And then after than when they minimize, it shows just the icon

    // TODO add pagination (scroll top) for messages
    const handleSendMessage = () => {
        // TODO send message through API
        // TODO when the API acknowledges receipt, we show the message in the chat window
        // TODO add the bot loading message until we receive a reply
        // TODO reset the form + clear the message input field
        submitRequest(sendMessage, [chat.id, form], (response) => {
            setChatMessages([...chatMessages, {
                source: 'user',
                timestamp: '9:00 AM', // TODO add timestamp
                text: form.message,
                isLoading: false
            }])

            setForm(defaultMessageFormFields);
            setIsPendingReply(true);
        });

        //
        // // TODO add a flag to show the bot loading messages instead of adding it to the chat messages because if we add it to chat messages we'll have to worry about removing it
        //
        // setTimeout(() => {
        //     setIsPendingReply(false);
        //     endOfChatRef.current?.scrollIntoView({behavior: "smooth"});
        // }, 5000);
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
        if (!("Notification" in window)) {
            console.log("browser doesn't support notifications")
        } else {
            setNotificationsAccepted(Notification.permission === 'granted');
        }
    }, []);

    useEffect(() => {
        if (notificationsAccepted) {
            getAppToken();
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [notificationsAccepted]);

    useEffect(() => {
        if (tokenRegistrationErrors.length > 0) {
            toast.error(tokenRegistrationErrors[0], {
                duration: 3000
            });
        }
    }, [tokenRegistrationErrors]);

    useEffect(() => {
        if (isTokenFound && token && !isChatRequested) {
            // initiate chat
            submitRequest(startChat, [], (response) => {
                console.log(response);
                setChat(response);
                setIsChatRequested(true);
            })
        }
    }, [token, isTokenFound]);

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

            {
                isOpen &&
                <LivModal bgColor={'bg-liv-tan'} showClose={false}>
                    <div className="bg-liv-tan py-4 px-8 absolute top-1/2 -translate-y-1/2 left-0 w-full sm:static sm:translate-y-0">
                        <h2 style={{fontFamily: "PP Editorial New"}} className="text-4xl font-thin italic capitalize text-center mb-4">Notifications</h2>

                        <p className="text-center max-w-xs mb-7">Our app uses notifications to let you chat with our celebrity designers.</p>

                        <div className="mb-2.5">
                            <LivButton as={'button'} text={'Allow Notifications'} borderColor={'border-black'} bgColor={'bg-white'} onClickHandler={() => {
                                setNotificationsAccepted(true);
                                setIsOpen(false);
                            }} style={'mid'} width={'full'}/>
                        </div>

                        <div className="text-center">
                            <button type="button" onClick={() => {
                                setNotificationsAccepted(false);
                                setIsOpen(false);
                            }} className="uppercase border-b border-b-black text-xs m-auto outline-0">No thanks
                            </button>
                        </div>
                    </div>
                </LivModal>
            }
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