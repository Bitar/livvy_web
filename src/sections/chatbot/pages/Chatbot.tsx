import {useMasterLayout} from "../../../layout/MasterLayoutContext.loader.ts";
import {useEffect, useState} from "react";
import {LivvyChatbot} from "../../../components/LivvyChatbot.tsx";
import {useParams} from "react-router-dom";
import {submitRequest} from "../../../helpers/requests.ts";
import {getDesigner} from "../../../requests/designer/Designer.ts";
import {Designer} from "../../../models/designer/Designer.ts";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

export const Chatbot = () => {
    const {id} = useParams();

    const [designer, setDesigner] = useState<Designer | null>(null);
    const {setShowFooter, setBackgroundType, setBackgroundUrl, setHeaderBgColor, setBackgroundOverlayOpacity} = useMasterLayout()

    useEffect(() => {
        setHeaderBgColor('transparent')
        setShowFooter(false);
        setBackgroundType('image');
        setBackgroundUrl('/assets/designer-chat.png');
        setBackgroundOverlayOpacity('opacity-20');

        // get the designer to fetch its openai assistant ID
        submitRequest(getDesigner, [id], (response) => {
            if(response instanceof AxiosError) {
                if(response.response.status == 404) {
                    toast.error("The requested designer doesn't exist.", {
                        duration: 3000
                    });
                } else {
                    toast.error('Something went wrong while trying to fetch the designer.', {
                        duration: 3000
                    });
                }
            } else {
                setDesigner(response);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        designer !== null ? <LivvyChatbot designer={designer}/> : <></>
    )
}