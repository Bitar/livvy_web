import React, {useRef} from "react";
import Select, {GroupBase, SelectInstance} from "react-select";

interface SelectOptions {
    id: number,
    name: string
}

interface Props {
    name: string,
    placeholder: string,
    options: SelectOptions[],
    searchable?: boolean,
    clearable?: boolean,
    className?: string
}

export const LivSelect = ({name, placeholder, options, searchable = false, clearable = false, className}: Props) => {
    const selectRef = useRef<SelectInstance<SelectOptions, false, GroupBase<SelectOptions>>>(null);

    return (
        <Select name={name}
                ref={selectRef}
                className={`liv-select-new ${className}`}
                classNamePrefix={'liv-select'}
                isSearchable={searchable}
                isClearable={clearable}
                options={options}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id.toString()}
                placeholder={placeholder}
                onChange={(e) => {
                    console.log(e)
                    // if (e) {
                    //     setForm({...form, [`preference${index}`]: e.id});
                    // }
                }}
        />
    )
}