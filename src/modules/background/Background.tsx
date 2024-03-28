import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";
import {FC} from "react";

interface BackgroundProps {
    type: "video" | "image"
    url: string
    poster?: string
}

export const Background: FC<BackgroundProps> = ({type, url, poster}) => {
    return (
        <div className="absolute min-w-full min-h-full -z-10 overflow-hidden">
            <div className="h-full w-full bg-black opacity-40 absolute top-0 left-0"/>
            {type == 'video' && (
                <video src={toAbsoluteUrl(`${url}`)} autoPlay={true} controls={false} loop={true}
                       muted={true} poster={poster && toAbsoluteUrl('assets/livvy-intro-poster.jpg')}
                       className="absolute w-auto min-w-full min-h-full max-w-none -z-20"/>
            )}
            {type == 'image' && (
                <div className={`bg-[url('${url}')] w-full h-full`}/>
            )}
        </div>
    )
}