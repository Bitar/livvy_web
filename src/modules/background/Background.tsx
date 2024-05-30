import {FC} from "react";
import clsx from "clsx";

type BackgroundProps = | {
    type?: "video" | "image"
    url?: string,
    poster?: string,
    color?: never,
    backgroundOverlayOpacity?: string
} | {
    type?: "color",
    color?: string,
    url?: never
    poster?: never,
    backgroundOverlayOpacity?: never
}

export const Background: FC<BackgroundProps> = ({type, url, poster, color, backgroundOverlayOpacity = 'opacity-50'}) => {
    return (
        <div className="fixed min-w-full min-h-full -z-10 overflow-hidden">
            {
                (type == 'video' || type == 'image') &&
                <div className={clsx("h-full w-full bg-black absolute top-0 left-0", backgroundOverlayOpacity)}/>
            }

            {type == 'video' && url !== null && (
                <div className="absolute w-auto min-w-full min-h-full max-w-none -z-20" dangerouslySetInnerHTML={{
                    __html: `<video autoPlay loop muted playsinline poster=${poster} style="position: absolute; top:0; left: 0; z-index: -20; height: 100%; width: 100%; object-fit: cover"><source src=${url} type="video/mp4" /></video>`
                }}>
                </div>

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