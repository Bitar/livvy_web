import axios, {AxiosError, AxiosResponse} from 'axios'
import {AppVersion, AppVersionList, AppVersionPaginate} from "../../models/beta/AppVersion.ts";
import {Response} from "../../helpers/response.ts";

const API_URL = import.meta.env.VITE_APP_API_URL
const ENDPOINT = `${API_URL}/misc/app-versions`
export const EXPORT_ENDPOINT = `${ENDPOINT}/export`;

export const getAllAppVersions = async (): Promise<AppVersion[] | AxiosError | undefined> => {
    return axios.get(ENDPOINT + '/all').then((response: AxiosResponse<AppVersionList>) => response.data.data).catch((error) => {
        return error;
    });
}


export const getAppVersion = async (slug: string): Promise<AppVersion | AxiosError | undefined> => {
    return axios.get(ENDPOINT + `/${slug}`).then((response: AxiosResponse<Response<AppVersion>>) => response.data.data).catch((error) => {
        return error;
    });
}

export const getAppVersions = async (query?: string): Promise<AppVersion[]> => {
    let url = `${ENDPOINT}`

    if (query) {
        url += `?${query}`
    }

    return axios.get(url)
        .then((response: AxiosResponse<AppVersionPaginate>) => response.data)
        .then((response: Response<AppVersion[]>) => response.data)
}
