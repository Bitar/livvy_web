import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/page-data/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Background} from "../modules/background/Background.tsx";

export const MasterLayout = () => {
    return (
        <PageDataProvider>
            <div id="wrapper">
                <Background type='video' url={'assets/livvy-intro.mp4'}/>

                <Header/>

                <div id="content">
                    <Outlet/>
                </div>

                <Footer/>
            </div>
        </PageDataProvider>
    )
}