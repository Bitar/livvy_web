import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

export const LivFormSuccess = ({text}: { text: string }) => {
    return (
        <div className="flex justify-center align-middle p-3 min-w-64 bg-[#f7f6f3] rounded-md">
            <FontAwesomeIcon icon={faCheck} size='1x' className="text-green-700 me-2 mt-0.5"/> <span>{text}</span>
        </div>
    )
}