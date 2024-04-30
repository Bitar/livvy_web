import {useState} from "react";

export const LivCheckbox = ({checked = false}: { checked?: boolean }) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    return (
        <label className="liv-checkbox">
            <input type="checkbox" checked={isChecked} onChange={() => console.log("here")}/>
            <span className="checkmark" onClick={() => setIsChecked(!isChecked)}></span>
        </label>
    )
}