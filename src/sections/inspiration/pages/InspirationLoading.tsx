import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import {useEffect} from "react";

export const InspirationLoading = () => {
    const {setBackgroundType, setBackgroundColor, setShowFooter} = useMasterLayout();

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
        setShowFooter(false);
    }, []);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <p className="uppercase text-[80px] sm:text-[150px] lg:text-[270px]">design</p>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-40 sm:w-52 lg:w-96">
                <img
                    className="w-full h-auto animate__animated animate__pulse animate__infinite"
                    src="/assets/inspiration/chair.png" alt="furniture chair"/>
            </div>
        </div>
    )
}