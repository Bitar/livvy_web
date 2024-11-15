import {Outlet} from "react-router-dom";
import {Background} from "../../../modules/background/Background.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import React, {useEffect, useRef, useState} from "react";
import {PopupButton} from "@typeform/embed-react";
import { AppVersionLayoutContext } from "../core/AlphaVersionContext.tsx";
import {useAuth} from "../../auth/core/Auth.loader.ts";

export const AlphaVersionsLayout = () => {
    const {currentUser} = useAuth();
    const typeformPopup = useRef<HTMLDivElement>(null)

    const [trackingData, setTrackingData] = useState<Record<string, string>>(null)

    const [showTypeForm, setShowTypeForm] = useState<boolean>(false)

    useEffect(() => {
        if (currentUser) {
            setTrackingData({
                email: currentUser.email,
                name: currentUser.first_name + ' ' + currentUser?.last_name,
                version_id: currentUser.apple_build_version_id
            })
        }
    }, [currentUser]);

    useEffect(() => {
        if (showTypeForm) {
            {/*@ts-expect-error: Ref doesn't work when we assign HTMLDivElement to the Slider*/}
            typeformPopup.current?.open();
        }
    }, [showTypeForm])

    return (
        <div>
            <Background type='color' color='liv-tan'/>

            <div className="container md:px-0 px-4">
                <div className='sm:flex justify-between'>
                    <div className="py-3.5 flex justify-center items-center">
                        <img src="/assets/livvy-logo-black.png" alt="livvy logo black" className="w-[68px] me-3.5"/>

                        <span className="h-5 w-px border-s border-s-black"></span>

                        <span style={{fontFamily: "PP Editorial New"}}
                              className="font-thin italic ms-3.5 capitalize text-[22px] mt-1">alpha</span>
                    </div>
                    <div className='sm:py-3.5 pb-3.5 text-center'>
                        <LivButton as={'button'}
                                   borderColor={'border-black'}
                            // newTab={true}
                                   bgColor={'bg-black'}
                                   textColor={'text-white'}
                                   arrowIcon={false}
                                   rounded={true}
                                   text={'TESTING FEEDBACK FORM'}
                                   style={'thin'}
                                   onClickHandler={() => {
                                       setShowTypeForm(true);
                                   }}
                        />

                        {/*@ts-expect-error: PopupButton Ref*/}
                        <PopupButton id="FFMbaQjU" onClose={() => setShowTypeForm(false)} className="my-button hidden" ref={typeformPopup} tracking={trackingData}/>
                    </div>
                </div>
            </div>

            <AppVersionLayoutContext.Provider value={{
                setShowTypeForm
            }}>
                <Outlet/>
            </AppVersionLayoutContext.Provider>
        </div>
    )
}

