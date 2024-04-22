import {createContext, Dispatch, SetStateAction, useContext} from "react";

interface MasterLayoutProviderProps {
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
    blurContent: boolean,
    setBlurContent: Dispatch<SetStateAction<boolean>>
}

export const MasterLayoutProvider = createContext<MasterLayoutProviderProps>({
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
    blurContent: false,
    setBlurContent: () => {
    }
})

export const useMasterLayout = () => {
    return useContext(MasterLayoutProvider)
}