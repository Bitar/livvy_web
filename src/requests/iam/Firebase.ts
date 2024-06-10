import axios, {AxiosError} from "axios";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/push`

export const registerUserToken = async (form: any): Promise<any | AxiosError | undefined> => {
    const formData = createFormData(form);

    return await axios.post(ENDPOINT + '/', formData)
        .then(res => res.data)
        .catch((error) => {
            return error;
        });
}