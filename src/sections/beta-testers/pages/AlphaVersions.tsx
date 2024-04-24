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


export const AlphaVersions = () => {
    const {currentUser} = useAuth();

    const [selected, setSelected] = useState<AppVersion | null>(null);
    const [appVersions, setAppVersions] = useState<AppVersion[]>([]);
    const [showNotice, setShowNotice] = useState<boolean>(true);

    const livvyApp = useLivvyApp();
    const vimeoRef = useRef(null);

    useEffect(() => {
        livvyApp.setPageTitle('Livvy | Alpha');
    }, []);

    useEffect(() => {
        if (selected) {
            const player = new Player(vimeoRef.current);

            player.on('play', function () {
                setShowNotice(false);
            });

            player.on('pause', function () {
                setShowNotice(true);
            });
        }
    }, [selected]);

    useEffect(() => {
        submitRequest(getAllAppVersions, [], (response) => {
            setAppVersions(response);

            setSelected(response[0]);
        });
    }, []);

    return (
        <div>
            <Background type='color' color='liv-tan'/>

            <div className="container">
                <div className='flex justify-between'>
                    <div className="py-3.5 flex justify-start items-center">
                        <img src="/assets/livvy-logo-black.png" alt="livvy logo black" className="w-[68px] me-3.5"/>

                        <span className="h-5 w-px border-s border-s-black"></span>

                        <span style={{fontFamily: "PP Editorial New"}}
                              className="font-thin italic ms-3.5 capitalize text-[22px] mt-1">alpha</span>
                    </div>
                    <div className='py-3.5'>
                        <LivButton as={'button'} onClickHandler={() => {
                        }} text={'TESTING FEEDBACK FORM'} borderColor={'border-black'} bgColor={'bg-black'} textColor={'text-white'} arrowIcon={false} rounded={true} style={'thin'}/>
                    </div>
                </div>
            </div>

            <div className="container">

                <div className="card">
                    
                </div>



                <div style={{padding: "56.25% 0 0 0"}} className="relative">
                    <span className={clsx("absolute rounded-md text-xs top-2 left-2 py-1 md:text-base md:top-5 md:left-6 z-20 px-3 md:py-2 bg-white md:rounded-lg", {
                        hidden: !showNotice
                    })}>
                        <span className="font-medium">Note</span>: An iPad Pro is necessary for this version of the app
                    </span>
                    <iframe
                        src={selected?.url}
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                        className="absolute top-0 left-0 w-full h-full"
                        title="Livvy Alpha App Tutorial" ref={vimeoRef}></iframe>
                </div>
            </div>

            <div className='border-b border-b-black'>
                <div className="container p-4">
                    <div className="sm:flex sm:justify-start sm:items-center">
                        <div className="text-md block sm:inline-block sm:text-xl mb-2 sm:mb-0">
                            <span className="font-medium capitalize me-4">{selected?.version}</span>
                        </div>

                        <LivButton as={'a'}
                                   url={`https://form.typeform.com/to/FFMbaQjU#email=${currentUser.email}&name=${currentUser.first_name + ' ' + currentUser.last_name}&version_id=${currentUser.apple_build_version_id}`}
                                   newTab={true}
                                   text={'survey'}
                                   borderColor={'border-black'}
                                   bgColor={'bg-black'}
                                   textColor={'text-white'}
                                   style={'thin'}/>
                    </div>
                </div>
            </div>

            <div className="container py-7 px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        appVersions.map((appVersion, idx) => <VideoPreview
                            clickHandler={() => setSelected(appVersion)} appVersion={appVersion} key={idx}/>)
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