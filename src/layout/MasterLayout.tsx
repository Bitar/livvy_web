import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/page-data/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Background} from "../modules/background/Background.tsx";

export const MasterLayout = () => {
    return (
        <PageDataProvider>
            <div id="wrapper">

                <Background type='image' url={'assets/livvy-intro-poster.jpg'}/>

                <Header/>

                <div id="content">
                    <Outlet/>
                </div>

                <Footer/>
            </div>
        </PageDataProvider>
    )
}