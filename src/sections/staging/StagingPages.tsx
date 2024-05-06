import {LivButton} from "../../components/buttons/LivButton.tsx";
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import {stagingPages} from "../../data/staging-pages.ts";
import {useAuth} from "../auth/core/Auth.loader.ts";
import {useNavigate} from "react-router-dom";
import {loginObject, user} from "../../data/user.ts";

export const StagingPages = () => {
    const {saveAuth, setCurrentUser} = useAuth();
    const [show, setShow] = useState<boolean>(false)
    const [showScroll, setShowScroll] = useState<boolean>(false)
    const {logout} = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
        if(show) {
            document.body.classList.add('overflow-hidden');
            setShowScroll(true)
        } else {
            document.body.classList.remove('overflow-hidden');
            setShowScroll(false)
        }
    }, [show])
    const handleNavigation = (link: string, needAuth: boolean) => {
        // Navigate user to Link
        // Add Auth if need be.
        if(needAuth) {
            saveAuth(loginObject)
            setCurrentUser(user)
            navigate(link)
            setShow(false)
        } else {
            logout();
            navigate(link)
            setShow(false)
        }
    }

    return (
        <div id='stagingPages' className={clsx(`fixed top-0 left-0 bg-black h-screen w-full z-50 pb-20 sm:px-0 px-4`, {
            show,
            'overflow-y-scroll': showScroll
        })}>
            <div className='absolute top-5 right-5'>
                <button onClick={() => {
                    setShow(false)
                }}>
                    <img src="/assets/close-white.svg" alt="close icon" className="w-5 h-5"/>
                </button>
            </div>
            <div className="container mt-10">
                <h1 className='text-2xl md:text-4xl xl:text-5xl uppercase text-white'>Staging Pages</h1>
                <div className="mt-8 page-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        stagingPages.map((stagingPage, index) => (

                                <div key={`staging-page-${index}`} className='bg-white rounded-md overflow-hidden'>
                                    <div className="image w-full aspect-video relative bg-liv-tan">
                                        <div className={`absolute top-0 left-0 w-full h-full bg-no-repeat bg-top bg-auto`}
                                             style={{
                                                 backgroundSize: '100% auto',
                                                 backgroundImage: `url('${stagingPage.image}')`
                                             }}/>
                                    </div>
                                    <div className='p-4'>
                                        <p className='uppercase text-xl mb-4'>{stagingPage.title}</p>
                                        <LivButton
                                            fullWidth={true}
                                            as={'button'}
                                            text={'View Page'}
                                            borderColor={'border-white'}
                                            bgColor={'bg-liv-green'}
                                            textColor={'text-white'}
                                            style={'thin'}
                                            className='rounded-xl'
                                            onClickHandler={() => handleNavigation(stagingPage.link, stagingPage.needAuth)}
                                        />
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <div className={clsx('absolute top-50 top-1/2 bg-black -right-6 py-4 px-2 cursor-pointer', {
                hidden: show
            })} onClick={() => setShow(!show)}>
                <FontAwesomeIcon icon={faChevronRight} className='text-white text-xl'/>
            </div>
        </div>
    )
}