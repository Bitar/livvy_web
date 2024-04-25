import {Outlet} from "react-router-dom";
import {Background} from "../../../modules/background/Background.tsx";
import {LivButton} from "../../../components/buttons/LivButton.tsx";
import React from "react";
import {useAuth} from "../../auth/core/Auth.tsx";

export const AlphaVersionsLayout = () => {
    const {currentUser} = useAuth();

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

            <Outlet/>
        </div>
    )
}