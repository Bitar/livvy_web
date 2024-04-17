import {Background} from "../../../modules/background/Background.tsx";
import React, {useEffect, useState} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AppVersion} from "../../../models/beta/AppVersion.ts";
import {submitRequest} from "../../../helpers/requests.ts";
import {getAppVersions} from "../../../requests/beta/AppVersion.ts";
import {useAuth} from "../../auth/core/Auth.tsx";
import InfiniteScroll from 'react-infinite-scroller';
import {useLivvyApp} from "../../auth/core/LivvyApp.tsx";


export const BetaVersions = () => {
    const {currentUser} = useAuth();

    const [selected, setSelected] = useState<AppVersion | null>(null);
    const [appVersions, setAppVersions] = useState<AppVersion[]>([]);

    const [hasMore, setHasMore] = useState<boolean>(true);

    const livvyApp = useLivvyApp();

    useEffect(() => {
        livvyApp.setPageTitle('App Versions | Livvy')
    }, []);

    const loadMore = (page: number) => {
        submitRequest(getAppVersions, [`page=${page}`], (response) => {
            setAppVersions(appVersions.concat(response.data));

            if (selected === null) {
                setSelected(response.data[0]);
            }

            if (response.meta.current_page != response.meta.last_page) {
                setHasMore(true);
            } else {
                setHasMore(false);
            }
        });
    }

    return (
        <div>
            <Background type='color' color='liv-tan'/>

            <div className="py-3.5">
                <img src="/assets/livvy-logo-black.png" alt="livvy logo black" className="w-20 m-auto"/>
            </div>

            <div className="container">
                <div style={{padding: "56.25% 0 0 0"}} className="relative">
                    <iframe
                        src={selected?.url}
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                        className="absolute top-0 left-0 w-full h-full"
                        title="Livvy Alpha App Tutorial"></iframe>
                </div>
                <script src="https://player.vimeo.com/api/player.js"></script>
            </div>

            <div className='border-b border-b-black'>
                <div className="container p-4">
                    <div className="sm:flex sm:justify-start sm:items-center">
                        <div className="text-md block sm:inline-block sm:text-xl mb-2 sm:mb-0">
                            <span className="font-semibold uppercase me-1">{selected?.version}</span> <span
                            className="capitalize me-4">- {selected?.title}</span>
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

            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}
                hasMore={hasMore}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                <div className="container py-7 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                        {
                            appVersions.map((appVersion, idx) => <VideoPreview
                                clickHandler={() => setSelected(appVersion)} appVersion={appVersion} key={idx}/>)
                        }

                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

const VideoPreview = ({appVersion, clickHandler}: { appVersion: AppVersion, clickHandler: () => void }) => {
    return (
        <div>
            <div
                className="relative bg-no-repeat bg-cover bg-center aspect-video rounded-lg"
                style={{backgroundImage: `url('${appVersion.poster}')`}}>
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
                <span className="text-sm"><span className="uppercase">{appVersion.version}</span> - {appVersion.title}
                </span>
            </div>
        </div>
    )
}