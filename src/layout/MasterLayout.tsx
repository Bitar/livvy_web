import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/page-data/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Background} from "../modules/background/Background.tsx";
import {MasterLayoutContext} from "./MasterLayoutContext.tsx";
import {useEffect, useState} from "react";
import {ModalProvider} from "./ModalProvider.tsx";
import {CartProvider} from "./CartProvider.tsx";
import {Cart as CartPanel} from "./Cart.tsx";
import clsx from "clsx";
import {StagingPages} from "../sections/staging/StagingPages.tsx";

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
    const [blurContent, setBlurContent] = useState<boolean>(false);
    const APP_ENV = import.meta.env.VITE_APP_ENV;

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
                setBackgroundPoster,
                blurContent,
                setBlurContent
            }}>
                <ModalProvider.Provider value={{
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen
                }}>
                    <CartProvider>
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

                            <div id="content" className={clsx({
                                "blur-md": blurContent
                            })}>
                                <Outlet/>
                            </div>

                            <CartPanel/>

                            {
                                APP_ENV !== 'production' && <StagingPages/>
                            }

                            {showFooter && <Footer/>}
                        </div>
                    </CartProvider>
                </ModalProvider.Provider>
            </MasterLayoutContext.Provider>
        </PageDataProvider>
    )
}