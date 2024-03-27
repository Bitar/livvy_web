import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {toAbsoluteUrl} from "../helpers/toAbsoluteUrl.ts";

export const MasterLayout = () => {
    return (
        <PageDataProvider>
            <div id="wrapper">
                <div className="absolute min-w-full min-h-full -z-10 overflow-hidden">
                    <div className="h-full w-full bg-black opacity-40 absolute top-0 left-0"/>
                    <video src={toAbsoluteUrl('assets/livvy-intro.mp4')} autoPlay={true} controls={false} loop={true}
                           muted={true} poster={toAbsoluteUrl('assets/livvy-intro-poster.jpg')}
                           className="absolute w-auto min-w-full min-h-full max-w-none -z-20"/>
                </div>

                <Header/>

                <Outlet/>

                <Footer/>
            </div>
        </PageDataProvider>
    )
}