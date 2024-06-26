import {Outlet} from "react-router-dom";
import {PageDataProvider} from "../modules/page-data/PageData.tsx";
import {Header} from "./Header.tsx";
import {Footer} from "./Footer.tsx";
import {Background} from "../modules/background/Background.tsx";
import {MasterLayoutContext} from "./MasterLayoutContext.tsx";
import {useEffect, useRef, useState} from "react";
import {ModalProvider} from "./ModalProvider.tsx";
import {CartProvider} from "./CartProvider.tsx";
import {Cart as CartPanel} from "./Cart.tsx";
import clsx from "clsx";
import {MenuPanel} from "./menu/MenuPanel.tsx";

export const MasterLayout = () => {
    const [showHeader, setShowHeader] = useState<boolean>(true);
    const [showFooter, setShowFooter] = useState<boolean>(true);
    const [footerVariant, setFooterVariant] = useState<'tan' | 'black'>('black');

    const [backgroundType, setBackgroundType] = useState<'video' | 'image' | 'color'>('video');
    const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
    const [backgroundPoster, setBackgroundPoster] = useState<string | null>(null);
    const [backgroundColor, setBackgroundColor] = useState<string | null>(null);
    const [backgroundOverlayOpacity, setBackgroundOverlayOpacity] = useState<string>('opacity-50');
    const [headerTextColor, setHeaderTextColor] = useState<'white' | 'black'>('white');
    const [headerBgColor, setHeaderBgColor] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [blurContent, setBlurContent] = useState<boolean>(false);

    const [showMenu, setShowMenu] = useState<boolean>(false)

    useEffect(() => {
        if (backgroundType == 'color' && (backgroundColor == 'white' || backgroundColor == 'liv-tan')) {
            // the header text should be black
            setHeaderTextColor('black');
        } else {
            setHeaderTextColor('white');
        }
    }, [backgroundType, backgroundColor]);

    useEffect(() => {
        if (showMenu) {
            // setHeaderBgColor('liv-tan')
            setHeaderTextColor('black')
        } else {
            // setHeaderBgColor('transparent')
            setHeaderTextColor('white')
        }
    }, [showMenu]);


    return (
        <PageDataProvider>
            <MasterLayoutContext.Provider value={{
                showHeader,
                setShowHeader,
                headerTextColor,
                setHeaderTextColor,
                headerBgColor,
                setHeaderBgColor,
                showFooter,
                setShowFooter,
                footerVariant,
                setFooterVariant,
                backgroundType,
                setBackgroundType,
                backgroundOverlayOpacity,
                setBackgroundOverlayOpacity,
                backgroundUrl,
                setBackgroundUrl,
                backgroundColor,
                setBackgroundColor,
                backgroundPoster,
                setBackgroundPoster,
                blurContent,
                setBlurContent,
                showMenu,
                setShowMenu
            }}>
                <ModalProvider.Provider value={{
                    isOpen: isModalOpen,
                    setIsOpen: setIsModalOpen
                }}>
                    <CartProvider>
                        <div id="wrapper" className='relative'>
                            {
                                backgroundType === "image" && <Background type={`${backgroundType}`} url={backgroundUrl}
                                                                          backgroundOverlayOpacity={backgroundOverlayOpacity}/>
                            }

                            {
                                backgroundType == "video" &&
                                <Background type={`${backgroundType}`} url={backgroundUrl} poster={backgroundPoster}
                                            backgroundOverlayOpacity={backgroundOverlayOpacity}/>
                            }

                            {
                                backgroundType === "color" &&
                                <Background type={`${backgroundType}`} color={backgroundColor}/>
                            }

                            {showHeader &&
                                <Header textColor={headerTextColor} bgColor={headerBgColor}/>}

                            <div id="content" className={clsx('items-center', {
                                "blur-md": blurContent,
                                "pt-16": showHeader,
                                "pb-[710px] md:pb-[500px] lg:pb-80": showFooter
                            })}>
                                <div className='w-full flex flex-col'>
                                    <Outlet/>
                                </div>
                            </div>

                            <CartPanel/>

                            <MenuPanel/>


                            {/*{*/}
                            {/*    APP_ENV !== 'production' && <StagingPages/>*/}
                            {/*}*/}

                            {showFooter && <Footer/>}
                        </div>
                    </CartProvider>
                </ModalProvider.Provider>
            </MasterLayoutContext.Provider>
        </PageDataProvider>
    )
}