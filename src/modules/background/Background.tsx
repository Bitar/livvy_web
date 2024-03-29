import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";
import {FC} from "react";

interface BackgroundProps {
    type: "video" | "image"
    url: string
    poster?: string
}

export const Background: FC<BackgroundProps> = ({type, url, poster}) => {

    return (
        <div className="fixed min-w-full min-h-full -z-10 overflow-hidden">
            <div className="h-full w-full bg-black opacity-40 absolute top-0 left-0"/>
            {type == 'video' && (
                <video src={url} autoPlay={true} controls={false} loop={true}
                       muted={true} poster={poster && toAbsoluteUrl(`${poster}`)}
                       className="absolute w-auto min-w-full min-h-full max-w-none -z-20"/>
            )}
            {type == 'image' && (
                <div className={`absolute w-auto min-w-full min-h-full max-w-none -z-20 bg-no-repeat bg-cover bg-center`} style={{
                    backgroundImage: `url('${url}')`
                }}/>
            )}
        </div>
    )
}