import {Response} from "../../helpers/response.ts";

export type Designer = {
    id: number,
    name: string,
    image: string,
    openai_assistant_id: string | null
}

export type DesignerList = {
    data: Designer[]
}

export type DesignerPaginate = Response<Designer[]>;