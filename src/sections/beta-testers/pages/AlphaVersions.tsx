import {Background} from "../../../modules/background/Background.tsx";
import React, {useEffect, useRef, useState} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AppVersion} from "../../../models/beta/AppVersion.ts";
import {submitRequest} from "../../../helpers/requests.ts";
import {getAllAppVersions} from "../../../requests/beta/AppVersion.ts";
import {useAuth} from "../../auth/core/Auth.tsx";
import {useLivvyApp} from "../../auth/core/LivvyApp.tsx";
import Player from '@vimeo/player'
import clsx from "clsx";
import {Link} from "react-router-dom";


export const AlphaVersions = () => {
    const {currentUser} = useAuth();

    const [latestVersion, setLatestVersion] = useState<AppVersion | null>(null)
    const [appVersions, setAppVersions] = useState<AppVersion[]>([]);
    const [showNotice, setShowNotice] = useState<boolean>(true);

    const livvyApp = useLivvyApp();
    const vimeoRef = useRef(null);

    useEffect(() => {
        livvyApp.setPageTitle('Livvy | Alpha');
    }, []);

    // useEffect(() => {
    //     if (selected) {
    //         const player = new Player(vimeoRef.current);
    //
    //         player.on('play', function () {
    //             setShowNotice(false);
    //         });
    //
    //         player.on('pause', function () {
    //             setShowNotice(true);
    //         });
    //     }
    // }, [selected]);

    useEffect(() => {
        submitRequest(getAllAppVersions, [], (response) => {
            setLatestVersion(response[0])
            response.shift()
            setAppVersions(response)
        });
    }, []);

    return (
        <div>
            <Background type='color' color='liv-tan'/>

            <div className="container px-4 sm:px-0">
                <div className='sm:flex justify-between'>
                    <div className="py-3.5 flex justify-center items-center">
                        <img src="/assets/livvy-logo-black.png" alt="livvy logo black" className="w-[68px] me-3.5"/>

                        <span className="h-5 w-px border-s border-s-black"></span>

                        <span style={{fontFamily: "PP Editorial New"}}
                              className="font-thin italic ms-3.5 capitalize text-[22px] mt-1">alpha</span>
                    </div>
                    <div className='sm:py-3.5 pb-3.5 text-center'>
                        <LivButton as={'a'}
                                   borderColor={'border-black'}
                                   newTab={true}
                                   bgColor={'bg-black'}
                                   textColor={'text-white'}
                                   arrowIcon={false}
                                   rounded={true}
                                   text={'TESTING FEEDBACK FORM'}
                                   style={'thin'}
                                   url={`https://form.typeform.com/to/FFMbaQjU#email=${currentUser.email}&name=${currentUser.first_name + ' ' + currentUser.last_name}&version_id=${currentUser.apple_build_version_id}`}
                        />
                    </div>
                </div>
            </div>

            <div className="container">

                {
                    latestVersion && (
                        <div style={{backgroundImage: `url(${latestVersion.poster})`}} className="relative bg-no-repeat bg-cover bg-center lg:pt-[56.25%]">
                            <div className="overlay absolute w-full h-full bg-black opacity-40 top-0 left-0"></div>
                            <div className="overlay absolute w-full h-full bg-gradient-to-b from-transparent from-30% to-black top-0 left-0"></div>
                            <div className='lg:absolute lg:top-10 mt-10 mb-10 px-10 relative uppercase'>
                                <span className='rounded-full bg-white py-4 px-5 sm:text-sm text-xs me-4'>New Release</span>
                                <span className='text-white sm:text-sm text-xs'>{latestVersion.created_at}</span>
                            </div>
                            <div className="content lg:absolute lg:bottom-10 relative mb-10 px-10 text-white">
                                <h1 className="title lg:text-6xl sm:text-4xl text-3xl uppercase mb-5">Version ({latestVersion.version})</h1>
                                <div className="description max-w-2xl mb-5">{latestVersion.description}</div>
                                <Link to={'/'} className='inline-block'>
                                    <span style={{fontFamily: "PP Editorial New"}} className='cta italic border-b font-thin sm:text-2xl text-xl'>Explore Details</span>
                                </Link>
                            </div>
                        </div>
                    )
                }


                {/*<div style={{padding: "56.25% 0 0 0"}} className="relative ">*/}
                {/*    <span className={clsx("absolute rounded-md text-xs top-2 left-2 py-1 md:text-base md:top-5 md:left-6 z-20 px-3 md:py-2 bg-white md:rounded-lg", {*/}
                {/*        hidden: !showNotice*/}
                {/*    })}>*/}
                {/*        <span className="font-medium">Note</span>: An iPad Pro is necessary for this version of the app*/}
                {/*    </span>*/}
                {/*    <iframe*/}
                {/*        src={selected?.url}*/}
                {/*        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"*/}
                {/*        className="absolute top-0 left-0 w-full h-full"*/}
                {/*        title="Livvy Alpha App Tutorial" ref={vimeoRef}></iframe>*/}
                {/*</div>*/}
            </div>

            <div className="container my-7 px-4 sm:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {
                        appVersions.map((appVersion, idx) =>
                                (
                                    <div key={idx} style={{backgroundImage: `url(${appVersion.poster})`}} className="relative bg-no-repeat bg-cover bg-center lg:aspect-square">
                                        <div className="overlay absolute w-full h-full bg-black opacity-40 top-0 left-0"></div>
                                        <div className="overlay absolute w-full h-full bg-gradient-to-b from-transparent from-30% to-black top-0 left-0"></div>
                                        <div className='lg:absolute lg:top-10 mb-10 mt-10 px-10 relative uppercase'>
                                            <span className='text-white sm:text-sm text-xs'>{appVersion.created_at}</span>
                                        </div>
                                        <div className="content lg:absolute relative lg:bottom-10 mb-10 bottom-0 text-white px-10">
                                            <h1 className="title lg:text-6xl text-4xl uppercase mb-5">Version ({appVersion.version})</h1>
                                            <div className="description mb-5">{appVersion.description}</div>
                                            <Link to={'/'} className='inline-block'>
                                                <span style={{fontFamily: "PP Editorial New"}} className='cta italic border-b font-thin sm:text-2xl text-xl'>Explore Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            // <VideoPreview
                            //     clickHandler={() => setSelected(appVersion)}
                            //     appVersion={appVersion}
                            //     key={idx}/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}


const VideoPreview = ({appVersion, clickHandler}: { appVersion: AppVersion, clickHandler: () => void }) => {
    return (
        <div>
            <div
                className="relative bg-no-repeat bg-cover bg-center aspect-video rounded-lg"
                style={{backgroundImage: `url(${appVersion.poster})`}}>
                <button className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 rounded-lg"
                        onClick={clickHandler}>
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full">
                        <FontAwesomeIcon icon={faPlay}
                                         className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70"/>
                    </div>
                </button>
            </div>

            <div className="mt-2">
                <span className="text-sm"><span className="capitalize">{appVersion.version}</span>
                </span>
            </div>
        </div>
    )
}