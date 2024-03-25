import {Permission} from "./Permission.ts";
import {Response} from "../../helpers/response.ts";

export type Role = {
    id: number,
    name: string,
    permissions?: Permission[]
}

export type RoleList = {
    data: Role[]
}

export type RolePaginate = Response<Role[]>;