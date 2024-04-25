import {Response} from "../../helpers/response.ts";

export type AppVersion = {
    id: number,
    title: string,
    description: string,
    version: string,
    url: string,
    poster: string,
    slug: string,
    created_at?: number
}

export type AppVersionList = {
    data: AppVersion[]
}

export type AppVersionPaginate = Response<AppVersion[]>;