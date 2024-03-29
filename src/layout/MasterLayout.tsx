import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/page-data/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Background} from "../modules/background/Background.tsx";
import {MasterLayoutProvider} from "./MasterLayoutProvider.tsx";
import {useState} from "react";

export const MasterLayout = () => {
    const [showHeader, setShowHeader] = useState<boolean>(true)
    const [showFooter, setShowFooter] = useState<boolean>(true)

    return (
        <PageDataProvider>
            <MasterLayoutProvider.Provider value={{
                showHeader,
                setShowHeader,
                showFooter,
                setShowFooter
            }}>
                <div id="wrapper">
                    <Background type='video' url={'assets/livvy-intro.mp4'}/>

                    {showHeader && <Header/>}

                    <div id="content">
                        <Outlet/>
                    </div>

                    {showFooter && <Footer/>}
                </div>
            </MasterLayoutProvider.Provider>
        </PageDataProvider>
    )
}