import {useMasterLayout} from "../../../layout/MasterLayoutProvider.tsx";
import {useEffect} from "react";

export const Membership = () => {
    const {setBackgroundType, setBackgroundColor} = useMasterLayout()

    useEffect(() => {
        setBackgroundType('color');
        setBackgroundColor('liv-tan');
    }, []);
    return <>sdfd</>
}