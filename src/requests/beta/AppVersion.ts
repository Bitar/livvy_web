import axios, {AxiosError, AxiosResponse} from 'axios'
import {AppVersion, AppVersionList} from "../../models/beta/AppVersion.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/misc/app-versions`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllAppVersions = async (): Promise<AppVersion[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<AppVersionList>) => response.data.data).catch((error) => {
        return error;
    });
}
