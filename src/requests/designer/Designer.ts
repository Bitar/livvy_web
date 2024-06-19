import {Designer} from "../../models/designer/Designer.ts";
import axios, {AxiosError} from 'axios'

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/designers`

export const getDesigner = async (designerId: number): Promise<Designer | AxiosError | undefined> => {
    const url = `${ENDPOINT}/${designerId}/`;

    return await axios.get(url)
        .then(res => res.data.data).catch((error) => {
            return error;
        });
}