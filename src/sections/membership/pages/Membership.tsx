import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import {useEffect} from "react";

export const Membership = () => {
    const {setBackgroundType, setBackgroundColor} = useMasterLayout()

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
    }, []);

    return (
        <div>
            <div>
                <h1 className={'text-7xl uppercase'}>select your <br/> <span style={{fontFamily: "PP Editorial New"}} className="font-thin italic capitalize">membership</span></h1>
            </div>
        </div>
    )
}