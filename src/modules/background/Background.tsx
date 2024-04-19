import {toAbsoluteUrl} from "../../helpers/toAbsoluteUrl.ts";
import {FC} from "react";

// interface BackgroundProps {
//     type: "video" | "image" | "color"
//     url: string
//     poster?: string
// }

type BackgroundProps = | {
    type?: "video" | "image"
    url?: string,
    poster?: string,
    color?: never
} | {
    type?: "color",
    color?: string,
    url?: never
    poster?: never
}

export const Background: FC<BackgroundProps> = ({type, url, poster, color}) => {

    return (
        <div className="fixed min-w-full min-h-full -z-10 overflow-hidden">
            {
                (type == 'video' || type == 'image') &&
                <div className="h-full w-full bg-black opacity-50 absolute top-0 left-0"/>
            }

            {type == 'video' && url !== null && (
                <video src={url} autoPlay={true} controls={false} loop={true}
                       muted={true} poster={poster && toAbsoluteUrl(`${poster}`)}
                       className="absolute w-auto min-w-full min-h-full max-w-none -z-20"/>
            )}
            {type == 'image' && url !== null && (
                <div
                    className={`absolute w-auto min-w-full min-h-full max-w-none -z-20 bg-no-repeat bg-cover bg-center`}
                    style={{
                        backgroundImage: `url('${url}')`
                    }}/>
            )}
            {type == 'color' && color && (
                <div
                    className={`absolute w-auto min-w-full min-h-full max-w-none -z-20 bg-no-repeat bg-cover bg-center bg-${color}`}/>
            )}
        </div>
    )
}