import {Response} from "../../helpers/response.ts";

export type AppVersion = {
    id: number,
    title: string,
    version: string,
    url: string,
    poster: string
}

export type AppVersionList = {
    data: AppVersion[]
}

export type AppVersionPaginate = Response<AppVersion[]>;