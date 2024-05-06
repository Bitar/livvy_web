import {LivButton} from "../../components/buttons/LivButton.tsx";
import React, {useState} from "react";
import {stagingPages} from "../../data/staging-pages.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";

export const StagingPages = () => {
    const [show, setShow] = useState<boolean>(false)
    const handleNavigation = (link: string) => {
        // Navigate user to Link
        // Add Auth if need be.
        console.log(link)
    }

    return (
        <div id='stagingPages' className={clsx(`absolute top-0 left-0 bg-black h-screen w-screen`, {
            show
        })}>
            <div className='absolute top-5 right-5'>
                <button onClick={() => {
                    setShow(false)
                }}>
                    <img src="/assets/close-white.svg" alt="close icon" className="w-5 h-5"/>
                </button>
            </div>
            <div className="container mt-10">
                <h1 className='text-6xl uppercase text-white'>Staging Pages</h1>
                <div className="mt-8 page-list grid grid-cols-4 gap-4">
                    {
                        stagingPages.map((stagingPage, index) => (

                                <div key={`staging-page-${index}`} className='bg-white rounded-md overflow-hidden'>
                                    <div className="image w-full h-[270px] relative bg-liv-tan">
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
                                            onClickHandler={() => handleNavigation(stagingPage.link)}
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