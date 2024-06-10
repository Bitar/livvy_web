import {AppVersion} from "../../models/beta/AppVersion.ts";
import axios, {AxiosError, AxiosResponse} from "axios";
import {Response} from "../../helpers/response.ts";
import {DesignerChat} from "../../models/designer-chat/DesignerChat.ts";
import {createFormData} from "../../helpers/requests.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/chats/designers`

export const startChat = async (): Promise<DesignerChat | AxiosError | undefined> => {
    return axios.get(`${ENDPOINT}/create`).then((response: AxiosResponse<Response<AppVersion>>) => response.data.data).catch((error) => {
        return error;
    });
}

export const sendMessage = async (chatId: number, form: string): Promise<any | AxiosError | undefined> => {
    const formData = createFormData(form);

    return await axios.post(`${ENDPOINT}/${chatId}/send`, formData)
        .then(res => res.data)
        .catch((error) => {
            return error;
        });
}