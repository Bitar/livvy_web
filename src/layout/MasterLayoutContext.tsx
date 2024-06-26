import {createContext, Dispatch, SetStateAction} from "react";

interface MasterLayoutContextProps {
    showHeader?: boolean
    setShowHeader?: (show: boolean) => void,
    headerTextColor?: 'white' | 'black',
    setHeaderTextColor?: Dispatch<SetStateAction<'white' | 'black'>>,
    headerBgColor: string | null,
    setHeaderBgColor: Dispatch<SetStateAction<string | null>>,
    showFooter?: boolean,
    setShowFooter?: (show: boolean) => void,
    footerVariant?: 'tan' | 'black',
    setFooterVariant?: Dispatch<SetStateAction<'tan' | 'black'>>
    backgroundType: 'video' | 'image' | 'color',
    setBackgroundType: Dispatch<SetStateAction<'video' | 'image' | 'color'>>,
    backgroundOverlayOpacity: string,
    setBackgroundOverlayOpacity: Dispatch<SetStateAction<string>>,
    backgroundUrl: string | null,
    setBackgroundUrl: Dispatch<SetStateAction<string | null>>,
    backgroundColor: string | null,
    setBackgroundColor: Dispatch<SetStateAction<string | null>>,
    backgroundPoster: string | null,
    setBackgroundPoster: Dispatch<SetStateAction<string | null>>,
    blurContent: boolean,
    setBlurContent: Dispatch<SetStateAction<boolean>>
    showMenu: boolean,
    setShowMenu: Dispatch<SetStateAction<boolean>>
}

export const MasterLayoutContext = createContext<MasterLayoutContextProps>({
    showHeader: true,
    setShowHeader: () => {
    },
    headerTextColor: 'black',
    setHeaderTextColor: () => {
    },
    headerBgColor: null,
    setHeaderBgColor: () => {
    },
    showFooter: true,
    setShowFooter: () => {
    },
    footerVariant: 'black',
    setFooterVariant: () => {
    },
    backgroundType: 'video',
    setBackgroundType: () => {
    },
    backgroundOverlayOpacity: 'opacity-50',
    setBackgroundOverlayOpacity: () => {
    },
    backgroundUrl: null,
    setBackgroundUrl: () => {
    },
    backgroundColor: null,
    setBackgroundColor: () => {
    },
    backgroundPoster: null,
    setBackgroundPoster: () => {
    },
    blurContent: false,
    setBlurContent: () => {
    },
    showMenu: false,
    setShowMenu: () => {
    },
})

