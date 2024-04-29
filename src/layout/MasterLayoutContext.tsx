import {createContext, Dispatch, SetStateAction} from "react";

interface MasterLayoutContextProps {
    showHeader?: boolean
    setShowHeader?: (show: boolean) => void,
    headerTextColor?: 'white' | 'black',
    setHeaderTextColor?: Dispatch<SetStateAction<'white' | 'black'>>,
    showFooter?: boolean,
    setShowFooter?: (show: boolean) => void,
    footerVariant?: 'tan' | 'black',
    setFooterVariant?: Dispatch<SetStateAction<'tan' | 'black'>>
    backgroundType: 'video' | 'image' | 'color',
    setBackgroundType: Dispatch<SetStateAction<'video' | 'image' | 'color'>>,
    backgroundUrl: string | null,
    setBackgroundUrl: Dispatch<SetStateAction<string | null>>,
    backgroundColor: string | null,
    setBackgroundColor: Dispatch<SetStateAction<string | null>>,
    backgroundPoster: string | null,
    setBackgroundPoster: Dispatch<SetStateAction<string | null>>
}

export const MasterLayoutContext = createContext<MasterLayoutContextProps>({
    showHeader: true,
    setShowHeader: () => {
    },
    headerTextColor: 'black',
    setHeaderTextColor: () => {
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
    backgroundUrl: null,
    setBackgroundUrl: () => {
    },
    backgroundColor: null,
    setBackgroundColor: () => {
    },
    backgroundPoster: null,
    setBackgroundPoster: () => {
    }
})
