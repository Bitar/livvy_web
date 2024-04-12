import {useState} from "react";

export const LivQuantityPicker = () => {
    const [value, setValue] = useState<number>(0);

    const decreaseValue = () => {
        if(value > 0) {
            setValue(value - 1);
        }
    }

    const increaseValue = () => {
        if(value < 98) {
            setValue(value + 1)
        }
    }

    return (
        <div className="flex justify-start items-center">
            <button className="w-8 h-8 relative border border-black" onClick={decreaseValue}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">-</span>
            </button>
            <input type='text' className="w-8 h-8 border-t border-b border-t-black border-b-black focus-visible:outline-0 p-1 text-center text-sm"/>
            <button className="w-8 h-8 relative border border-black">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10" onClick={increaseValue}>+</span>
            </button>
        </div>
    )
}