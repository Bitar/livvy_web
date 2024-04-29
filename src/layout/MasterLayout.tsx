import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/page-data/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Background} from "../modules/background/Background.tsx";
import {MasterLayoutContext} from "./MasterLayoutContext.tsx";
import {useEffect, useState} from "react";
import {ModalProvider} from "./ModalProvider.tsx";

export const MasterLayout = () => {
    const [showHeader, setShowHeader] = useState<boolean>(true);
    const [showFooter, setShowFooter] = useState<boolean>(true);
    const [footerVariant, setFooterVariant] = useState<'tan' | 'black'>('black');

    const [backgroundType, setBackgroundType] = useState<'video' | 'image' | 'color'>('video');
    const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
    const [backgroundPoster, setBackgroundPoster] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
    const [headerTextColor, setHeaderTextColor] = useState<'white' | 'black'>('white');

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (backgroundType == 'color' && (backgroundColor == 'white' || backgroundColor == 'liv-tan')) {
            // the header text should be black
            setHeaderTextColor('black');
        } else {
            setHeaderTextColor('white');
        }
    }, [backgroundType, backgroundColor]);

    return (
        <PageDataProvider>
            <MasterLayoutContext.Provider value={{
                showHeader,
                setShowHeader,
                headerTextColor,
                setHeaderTextColor,
                showFooter,
                setShowFooter,
                footerVariant,
                setFooterVariant,
                backgroundType,
                setBackgroundType,
                backgroundUrl,
                setBackgroundUrl,
                backgroundColor,
                setBackgroundColor,
                backgroundPoster,
                setBackgroundPoster
            }}>
                <ModalProvider.Provider value={{
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen
                }}>
                    <div id="wrapper">
                        {
                            backgroundType === "image" && <Background type={`${backgroundType}`} url={backgroundUrl}/>
                        }

                        {
                            backgroundType == "video" && <Background type={`${backgroundType}`} url={backgroundUrl} poster={backgroundPoster}/>
                        }

                        {
                            backgroundType === "color" && <Background type={`${backgroundType}`} color={backgroundColor}/>
                        }

                        {showHeader && <Header textColor={headerTextColor}/>}

                        <div id="content">
                            <Outlet/>
                        </div>

                        {showFooter && <Footer/>}
                    </div>
                </ModalProvider.Provider>
            </MasterLayoutContext.Provider>
        </PageDataProvider>
    )
}