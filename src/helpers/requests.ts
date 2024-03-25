import axios, {AxiosError, AxiosResponse} from 'axios'
import {Dispatch, SetStateAction} from 'react'
import {GenericErrorMessage} from "./form.ts";

export const extractErrors = (error: any) => {
    if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors

        const errorMessages: string[] = []

        for (const field in errors) {
            errorMessages.push(errors[field])
        }

        return errorMessages
    } else {
        return []
    }
}

export const createFormData = (form: any) => {
    const formData = new FormData()

    for (const key in form) {
        insertInForm(formData, key, form[key])
    }

    return formData
}

export const insertInForm = (formData: FormData, formDataKey: string, formItem: any) => {
    if (formItem !== null && formItem !== undefined && formItem !== '') {
        if (formItem instanceof Array) {
            if (formItem.length > 0) {
                for (const itemKey in formItem) {
                    if (
                        formItem[itemKey] instanceof Object &&
                        !(formItem[itemKey] instanceof File) &&
                        !(formItem[itemKey] instanceof Date)
                    ) {
                        Object.keys(formItem[itemKey]).forEach((key: string) => {
                            insertInForm(formData, `${formDataKey}[${itemKey}][${key}]`, formItem[itemKey][key])
                        })
                    } else {
                        formData.append(`${formDataKey}[]`, formItem[itemKey])
                    }
                }
            }
        } else {
            formData.append(formDataKey, formItem)
        }
    }
}

export const deleteObject = async (link: string): Promise<void> => {
    const API_URL = import.meta.env.VITE_APP_API_URL;

    return axios.delete(`${API_URL}/${link}`)
}

export const exportObjects = async (
    endpoint: string,
    query?: string
): Promise<ExportUrl | AxiosError | undefined> => {
    let url = `${endpoint}`

    if (query) {
        url += `?${query}`
    }

    return axios
        .get(url)
        .then((response: AxiosResponse) => response.data)
        .catch((error) => {
            return error
        })
}

export const createFilterQueryParam = (query: any) => {
    const queryArray: string[] = []

    for (const key in query) {
        const value = query[key]

        if (value instanceof Array) {
            if (value.length > 0) {
                value.forEach((item) => {
                    queryArray.push(`filter[${key}][]=${item}`)
                })
            }
        } else if (value instanceof Object) {
            queryArray.push(`filter[${key}]=${value.id}`)
        } else {
            queryArray.push(`filter[${key}]=${value}`)
        }
    }

    return queryArray.join('&')
}

export type ExportUrl = {
    data: {
        status: string
        url?: string
    }
}

export const asyncSelectLoadOptions = (inputValue: string, apiCall: any, setFormErrors: Dispatch<SetStateAction<string[]>>) => {
    return new Promise<any[]>((resolve) => {
        setTimeout(() => {
            apiCall(`filter[search]=${inputValue}`).then((response: any) => {
                if (axios.isAxiosError(response)) {
                    setFormErrors(extractErrors(response));
                } else if (response === undefined) {
                    setFormErrors([GenericErrorMessage])
                } else {
                    resolve(response);
                }
            });
        }, 1000);
    });
}

export const submitRequest = (apiRequest: (...params: any[]) => Promise<any>, params: any[], callback: (response: any) => void, setErrors?: Dispatch<SetStateAction<any>>, fns?: any) => {
    apiRequest(...params).then(response => {
            if (axios.isAxiosError(response) && setErrors) {
                // we need to show the errors
                setErrors(extractErrors(response));

                if (fns) {
                    fns.setSubmitting(false);
                }
            } else if (response === undefined && setErrors) {
                // show generic error message
                setErrors([GenericErrorMessage])

                if (fns) {
                    fns.setSubmitting(false);
                }
            } else {
                // make sure that we reset the list of errors in case we have leftover from a previous api call
                if (setErrors) {
                    setErrors([]);
                }

                callback(response);

                if (fns) {
                    setTimeout(() => {
                        fns.setSubmitting(false);
                    }, 500);
                }
            }
        }
    );
}

export const getErrorPage = (response: any) => {
    if (axios.isAxiosError(response)) {
        return '/error/404'
    } else if (response === undefined) {
        return '/error/400'
    }

    return null
}
