import {Background} from "../modules/background/Background.tsx";
import {Outlet} from "react-router-dom";

export const BetaAuthLayout = () => {
    return (
        <div>
            <Background type={'image'} url={'/assets/beta/beta-bg.jpeg'}/>

            <div
                className='fixed top-0 left-0 sm:top-1/2 sm:left-1/2 z-10 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-liv-tan h-full min-w-full sm:h-auto sm:min-w-[500px]'>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full bg-liv-tan p-4 sm:p-14">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}