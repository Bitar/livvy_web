import {ChangeEvent, Dispatch, SetStateAction} from 'react';

export const genericOnChangeHandler = (
    e: ChangeEvent<HTMLElement>,
    // form: any,
    form: Record<string, unknown>,
    setForm: Dispatch<SetStateAction<typeof form>>) => {

    const target = e.target as HTMLInputElement;

    const value = target.value;
    const name = target.name;

    if (name) {
        setForm({
            ...form,
            [name]: value
        });
    }
};

export const GenericErrorMessage: string = 'Oops! Something went wrong. Try again later.';

// export interface CreatableSelectProps {
//     value: string,
//     label: string
// }
//
// export const genericMultiSelectOnChangeHandler = (e: any, form: any, setForm: Dispatch<SetStateAction<any>>, key: string) => {
//     if (e.length > 0) {
//         setForm({...form, [key]: e.map((entity: any) => entity.id)});
//     } else {
//         setForm({...form, [key]: []});
//     }
// };
//
// export const genericSingleSelectOnChangeHandler = (e: any, form: any, setForm: Dispatch<SetStateAction<any>>, key: string) => {
//     if (e) {
//         setForm({...form, [key]: e.id});
//     } else {
//         // this happens when we're trying to unselect an option
//         // we need to remove the [key] property from the form and set the new value as form
//         const {[key]: _, ...newForm} = form;
//
//         setForm(newForm);
//     }
// }
//
// export const SUPPORTED_IMAGE_FORMATS = [
//     'image/jpg',
//     'image/jpeg',
//     'image/gif',
//     'image/png'
// ];
//
// export const genericHandleSingleFile = (e: any, formik: FormikProps<any>, form: any, setForm: Dispatch<SetStateAction<any>>, key: string) => {
//     const file = e.target.files[0];
//
//     setForm({...form, [key]: file});
//
//     formik.setFieldValue(key, file);
// };
//
// export const genericHandleMultipleFiles = (e: any, formik: FormikProps<any>, form: any, setForm: Dispatch<SetStateAction<any>>, key: string) => {
//     const files: File[] = [];
//
//     for (let i = 0; i < e.target.files.length; i++) {
//         files.push(e.target.files[i]);
//     }
//
//     setForm({...form, [key]: files});
//
//     formik.setFieldValue(key, files);
// };
//
//
// export const genericDateOnChangeHandler = (date: Date | null, form: any, setForm: Dispatch<SetStateAction<any>>, key: string) => {
//     if (date) {
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//
//         const formattedDate = `${year}-${month}-${day}`;
//
//         setForm({...form, [key]: formattedDate});
//     } else {
//         // in case the user removed the date then we should reset it (date will be null)
//         setForm({...form, [key]: date});
//     }
// };
//
// export const genericDateRangeOnChangeHandler = (dateRange: DateRange | null, form: any, setForm: Dispatch<SetStateAction<any>>, key: string) => {
//     if (dateRange) {
//         const startDate = dateRange[0];
//         const endDate = dateRange[1];
//
//         const formattedStartDate = startDate.getFullYear() + '-' + String(startDate.getMonth() + 1).padStart(2, '0') + '-' + String(startDate.getDate()).padStart(2, '0');
//         const formattedEndDate = endDate.getFullYear() + '-' + (String(endDate.getMonth() + 1).padStart(2, '0')) + '-' + String(endDate.getDate()).padStart(2, '0');
//
//         // we should use comma separator as this is the separator used in the backend to parse the date range
//         const dateRangeString = formattedStartDate + ',' + formattedEndDate;
//
//         setForm({...form, [key]: dateRangeString});
//     } else {
//         // in case the user removed the dateRange then we should reset it (dateRange will be null)
//         setForm({...form, [key]: dateRange});
//     }
// };
//
// export const genericCreatableSelectOnChangeHandler = (e: any, form: any, setForm: Dispatch<SetStateAction<any>>, key: string, newOptionsName: string) => {
//     const newOptions: string [] = [];
//     const selectedOptions: number[] = [];
//
//     if (e.length > 0) {
//         e.forEach((option: any) => {
//             if (isNaN(parseInt(option.value))) {
//                 // this is a new option
//                 newOptions.push(option.value);
//             } else {
//                 // this is a selected option
//                 selectedOptions.push(parseInt(option.value));
//             }
//
//             setForm({...form, [key]: selectedOptions, [newOptionsName]: newOptions});
//         });
//     } else {
//         // we need to make both as empty arrays
//         setForm({...form, [key]: selectedOptions, [newOptionsName]: newOptions});
//     }
// }
//
// export const genericFilterHandler = (setExportQuery: Dispatch<SetStateAction<string>>, filters: object, updateState: (updates: Partial<QueryState>) => void, reset: boolean) => {
//     setExportQuery(createFilterQueryParam(filters));
//
//     const cleanFilters = removeEmptyFromObject(filters);
//
//     for (const key in cleanFilters) {
//         cleanFilters[key] = encodeURIComponent(cleanFilters[key]);
//     }
//
//     updateState({
//         filter: reset ? undefined : cleanFilters,
//         ...initialQueryState,
//     });
// }