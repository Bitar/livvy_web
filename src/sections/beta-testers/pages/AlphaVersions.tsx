import React, {useEffect, useState} from "react";
import {AppVersion} from "../../../models/beta/AppVersion.ts";
import {submitRequest} from "../../../helpers/requests.ts";
import {getAllAppVersions} from "../../../requests/beta/AppVersion.ts";
import {useLivvyApp} from "../../auth/core/LivvyAppContext.loader.ts";
import {Link} from "react-router-dom";
import clsx from "clsx";
import moment from 'moment'


export const AlphaVersions = () => {

    const [latestVersion, setLatestVersion] = useState<AppVersion | null>(null)
    const [appVersions, setAppVersions] = useState<AppVersion[]>([]);

    const livvyApp = useLivvyApp();

    useEffect(() => {
        livvyApp.setPageTitle('Livvy | Alpha');
    }, [livvyApp]);

    useEffect(() => {
        submitRequest(getAllAppVersions, [], (response) => {
            setLatestVersion(response[0])
            response.shift()
            setAppVersions(response)
        });
    }, []);

    return (
        <div>
            <div className="container">
                {
                    latestVersion && <AppVersionCard appVersion={latestVersion} isHero={true}/>
                }
            </div>

            <div className="container my-7 px-4 sm:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                    {
                        appVersions.map((appVersion, idx) => <AppVersionCard key={idx} appVersion={appVersion} isHero={false}/>)
                    }
                </div>
            </div>
        </div>
    )
}


export const AppVersionCard = ({appVersion, isHero, isThumbnail = false}: { appVersion: AppVersion, isHero: boolean, isThumbnail?: boolean }) => {
    return (
        <div style={{backgroundImage: `url(${appVersion.poster})`}} className={clsx("relative bg-no-repeat bg-cover bg-center", {
            "lg:aspect-square": !isHero && !isThumbnail,
            "lg:pt-[56.25%]": isHero && !isThumbnail
        })}>
            <div className="overlay absolute w-full h-full bg-black opacity-40 top-0 left-0"></div>
            <div className="overlay absolute w-full h-full bg-gradient-to-b from-transparent from-30% to-black top-0 left-0"></div>
            <div className={clsx("mb-10 mt-10 px-10 relative uppercase", {
                'lg:absolute lg:top-10': !isThumbnail
            })}>
                {
                    isHero &&
                    <span className='rounded-full bg-white py-4 px-5 sm:text-sm text-xs me-4'>New Release</span>
                }
                <span className='text-white sm:text-sm text-xs'>{moment.unix(appVersion.created_at).format('MMM DD, YYYY')}</span>
            </div>
            <div className={clsx("content relative mb-10 px-10 text-white", {
                "lg:absolute lg:bottom-10 ": !isThumbnail
            })}>
                <h1 className={clsx("title sm:text-4xl text-3xl uppercase mb-5", {
                    'lg:text-6xl sm:text-4xl text-3xl': !isThumbnail,
                    'sm:text-4xl text-3xl': isThumbnail
                })}>Version ({appVersion.version})</h1>
                <div
                    className={clsx("description mb-5", {
                        "max-w-2xl": isHero
                    })}>

                    {appVersion.description?.substring(0, 250)}{appVersion.description.length > 250 && "..."}
                </div>
                <Link to={`/alpha/${appVersion.slug}`} className='inline-block'>
                    <span style={{fontFamily: "PP Editorial New"}} className='cta italic border-b font-thin sm:text-2xl text-xl'>Explore Details</span>
                </Link>
            </div>
        </div>
    )
}