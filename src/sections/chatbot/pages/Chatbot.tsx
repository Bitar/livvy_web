import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {useEffect} from "react";
import {LivvyChatbot} from "../../../components/LivvyChatbot.tsx";

export const Chatbot = () => {
    const {setShowFooter, setBackgroundType, setBackgroundUrl, setHeaderBgColor, setBackgroundOverlayOpacity} = useMasterLayout()

    useEffect(() => {
        setHeaderBgColor('transparent')
        setShowFooter(false);
        setBackgroundType('image');
        setBackgroundUrl('/assets/designer-chat.png');
        setBackgroundOverlayOpacity('opacity-20');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <LivvyChatbot />
    )
}