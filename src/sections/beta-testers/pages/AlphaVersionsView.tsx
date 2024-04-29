import clsx from "clsx";
import React, {useEffect, useRef, useState} from "react";
import {AppVersion} from "../../../models/beta/AppVersion.ts";
import {submitRequest} from "../../../helpers/requests.ts";
import {getAppVersion, getAppVersions} from "../../../requests/beta/AppVersion.ts";
import {useParams} from "react-router-dom";
import Player from '@vimeo/player'
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {AppVersionCard} from "./AlphaVersions.tsx";
import {useAppVersion} from "../core/AlphaVersionContext.loader.ts";

export const AlphaVersionsView = () => {
    const {setShowTypeForm} = useAppVersion()
    const params = useParams();
    const [appVersion, setAppVersion] = useState<AppVersion | null>(null)
    const [latestAppVersions, setLatestAppVersions] = useState<AppVersion[]>([])
    const [showNotice, setShowNotice] = useState<boolean>(true);
    const vimeoRef = useRef(null);

    useEffect(() => {
        if (appVersion) {
            const player = new Player(vimeoRef.current);

            player.on('play', function () {
                setShowNotice(false);
            });

            player.on('pause', function () {
                setShowNotice(true);
            });
        }
    }, [appVersion]);

    useEffect(() => {
        submitRequest(getAppVersion, [params?.slug], (response) => {
            setAppVersion(response)
        });

        submitRequest(getAppVersions, ['per_page=3'], (response) => {
            setLatestAppVersions(response)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {appVersion &&
                <>
                    <div className="container">
                        <div className="relative pt-[56.25%]">
                            <span className={clsx("absolute rounded-md text-xs top-2 left-2 py-1 md:text-base md:top-5 md:left-6 z-20 px-3 md:py-2 bg-white md:rounded-lg", {
                                hidden: !showNotice
                            })}>
                                <span className="font-medium">Note</span>: An iPad Pro is necessary for this version of the app
                            </span>
                            <iframe
                                src={appVersion?.url}
                                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                                className="absolute top-0 left-0 w-full h-full"
                                title="Livvy Alpha App Tutorial" ref={vimeoRef}></iframe>
                        </div>
                    </div>

                    <div className="container mt-10 md:px-0 px-5">
                        <h1 className='lg:text-6xl sm:text-4xl text-3xl  uppercase'>Version ({appVersion?.version})</h1>
                        <p className='md:max-w-3xl mt-5 whitespace-pre-line'>{appVersion?.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-10">
                            <div className="key-points">
                                <h2 className='md:text-3xl text-2xl uppercase mb-4'>Key Points</h2>
                                <p className='whitespace-pre-line'>{appVersion?.key_points}</p>
                            </div>
                            <div className="devices">
                                <h2 className='md:text-3xl text-2xl uppercase mb-4'>Devices</h2>
                                <p className='whitespace-pre-line'>{appVersion?.devices}</p>
                            </div>
                            <div className="feedback-form">
                                <h2 className='md:text-3xl text-2xl uppercase mb-4'>Feedback Form</h2>
                                <LivButton as={'button'}
                                           borderColor={'border-black'}
                                           bgColor={'bg-white'}
                                           textColor={'text-black'}
                                           arrowIcon={false}
                                           rounded={true}
                                           text={'Click Here'}
                                           style={'thin'}
                                           onClickHandler={() => {
                                               setShowTypeForm(true)
                                           }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="container mt-10 mb-20 md:px-0 px-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {
                                latestAppVersions.map((appVersion, idx) => <AppVersionCard key={idx} appVersion={appVersion} isHero={false} isThumbnail={true}/>)
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}