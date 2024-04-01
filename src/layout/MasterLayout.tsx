import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/page-data/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Background} from "../modules/background/Background.tsx";
import {MasterLayoutProvider} from "./MasterLayoutProvider.tsx";
import {useEffect, useState} from "react";

export const MasterLayout = () => {
    const [showHeader, setShowHeader] = useState<boolean>(true)
    const [showFooter, setShowFooter] = useState<boolean>(true)

    const [backgroundType, setBackgroundType] = useState<'video' | 'image' | 'color'>('video');
    const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
    const [headerTextColor, setHeaderTextColor] = useState<'white' | 'black'>('white');

    useEffect(() => {
        if(backgroundType == 'color' && (backgroundColor == 'white' || backgroundColor == 'liv-tan')) {
            // the header text should be black
            setHeaderTextColor('black');
        } else {
            setHeaderTextColor('white');
        }
    }, [backgroundType, backgroundColor]);

    return (
        <PageDataProvider>
            <MasterLayoutProvider.Provider value={{
                showHeader,
                setShowHeader,
                showFooter,
                setShowFooter,
                backgroundType,
                setBackgroundType,
                backgroundUrl,
                setBackgroundUrl,
                backgroundColor,
                setBackgroundColor
            }}>
                <div id="wrapper">
                    {
                        backgroundType === "image" || backgroundType == "video" ?
                            <Background type={`${backgroundType}`} url={backgroundUrl}/> :
                            <Background type={`${backgroundType}`} color={backgroundColor}/>
                    }

                    {showHeader && <Header textColor={headerTextColor}/>}

                    <div id="content">
                        <Outlet/>
                    </div>

                    {showFooter && <Footer/>}
                </div>
            </MasterLayoutProvider.Provider>
        </PageDataProvider>
    )
}