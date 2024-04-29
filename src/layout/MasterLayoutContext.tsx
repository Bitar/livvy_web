import {createContext, Dispatch, SetStateAction} from "react";

interface MasterLayoutContextProps {
    showHeader?: boolean
    setShowHeader?: (show: boolean) => void,
    showFooter?: boolean,
    setShowFooter?: (show: boolean) => void,
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
    showFooter: true,
    setShowFooter: () => {
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

