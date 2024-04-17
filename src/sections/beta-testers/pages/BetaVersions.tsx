import {Background} from "../../../modules/background/Background.tsx";
import React, {useEffect, useState} from "react";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import Slider from "react-slick";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AppVersion} from "../../../models/beta/AppVersion.ts";
import {submitRequest} from "../../../helpers/requests.ts";
import {getAllAppVersions} from "../../../requests/beta/AppVersion.ts";
import {useAuth} from "../../auth/core/Auth.tsx";

export const BetaVersions = () => {
    const {currentUser} = useAuth();

    const [selected, setSelected] = useState<AppVersion | null>(null);
    const [appVersions, setAppVersions] = useState<AppVersion[]>([]);

    const settings = {
        arrows: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1439,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    useEffect(() => {
        submitRequest(getAllAppVersions, [], (response) => {
            setAppVersions(response);
            setSelected(response[0]);
        });
    }, []);

    return (
        <div>
            <Background type='color' color='liv-tan'/>

            <div className="py-3.5">
                <img src="/assets/livvy-logo-black.png" alt="livvy logo black" className="w-20 m-auto"/>
            </div>

            <div className="container">
                <video src={selected?.url} autoPlay={false}
                       controls={true} loop={false}
                       muted={true} poster={selected?.poster}
                       className="w-full h-auto"/>
            </div>

            <div className='border-b border-b-black'>
                <div className="container p-4">
                    <div className="sm:flex sm:justify-start sm:items-center">
                        <div className="text-md block sm:inline-block sm:text-xl mb-2 sm:mb-0">
                            <span className="font-semibold uppercase me-1">version {selected?.version}</span> <span
                            className="capitalize me-4">- {selected?.title}</span>
                        </div>

                        <LivButton as={'a'} url={`https://form.typeform.com/to/FFMbaQjU#email=${currentUser.email}&name=${currentUser.first_name + ' ' + currentUser.last_name}&version_id=${currentUser.apple_build_version_id}`}
                                   newTab={true}
                                   text={'survey'}
                                   borderColor={'border-black'}
                                   bgColor={'bg-black'}
                                   textColor={'text-white'}
                                   style={'thin'}/>
                    </div>
                </div>
            </div>

            <div className="container py-7 px-4">
                {
                    appVersions.length > 0 && <Slider {...settings}>
                        {
                            appVersions.map((appVersion, idx) => <VideoPreview
                                clickHandler={() => setSelected(appVersion)} appVersion={appVersion} key={idx}/>)
                        }
                    </Slider>
                }
            </div>
        </div>
    )
}

const VideoPreview = ({appVersion, clickHandler}: { appVersion: AppVersion, clickHandler: () => void }) => {
    return (
        <div>
            <div
                className="relative bg-no-repeat bg-cover bg-center w-full h-32 sm:w-48 sm:h-28 lg:w-72 lg:h-36 rounded-lg"
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
                <span className="text-sm"><span className="uppercase">Version {appVersion.version}</span> - {appVersion.title}</span>
            </div>
        </div>
    )
}