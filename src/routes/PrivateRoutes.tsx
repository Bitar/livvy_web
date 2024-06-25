import {Navigate, Route, Routes} from 'react-router-dom'
import {MasterLayout} from "../layout/MasterLayout.tsx";
import {Home} from "../sections/home/Home.tsx";
import {Test} from "../Test.tsx";
import {Onboarding} from "../sections/onboarding/pages/Onboarding.tsx";
import {CelebrityDesignerRoutes} from "./CelebrityDesignerRoutes.tsx";
import {InspirationRoutes} from "./InspirationRoutes.tsx";
import {Membership} from "../sections/membership/pages/Membership.tsx";
import React from "react";
import {ProductRoutes} from "./ProductRoutes.tsx";
import {StyleQuizRoutes} from "./StyleQuizRoutes.tsx";
import {Chatbot} from "../sections/chatbot/pages/Chatbot.tsx";
import {About} from "../sections/about/pages/About.tsx";

const PrivateRoutes = () => {

    return (
        <Routes>
            <Route element={<MasterLayout/>}>
                <Route path='auth/*' element={<Navigate to={'/'}/>}/>

                <Route path='/' index element={<Home/>}/>

                <Route path='about/' element={<About/>}/>

                <Route path='/membership' element={<Membership/>}/>

                <Route path='/onboarding' element={<Onboarding/>}/>

                <Route path='/celebrity-designers/*' element={<CelebrityDesignerRoutes/>}/>

                <Route path='/inspiration/*' element={<InspirationRoutes />}/>

                <Route path='/product/*' element={<ProductRoutes/>}/>

                <Route path='/style-quiz/*' element={<StyleQuizRoutes/>}/>

                <Route path='/chatbot/:id' element={<Chatbot/>}/>

                <Route path='/test' element={<Test/>}/>

                <Route path='*' element={<Navigate to='/error/404'/>}/>
            </Route>
        </Routes>
    )
}

export {PrivateRoutes}
