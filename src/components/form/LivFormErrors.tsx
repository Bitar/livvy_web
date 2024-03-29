import React from "react";

interface Props {
    errors: string[]
}

const LivFormErrors: React.FC<Props> = ({errors}) => {
    return <div className="bg-red-50 border border-red-300 text-red-800 rounded-md py-3 px-5 my-4 text-left">
        <ul className="list-disc list-inside">
            {
                errors.map((error, index) => <li key={index}>{error}</li>)
            }
        </ul>
    </div>
}

export default LivFormErrors;