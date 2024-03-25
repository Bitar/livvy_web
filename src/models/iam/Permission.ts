import {Response} from "../../helpers/response.ts";

export type Permission = {
    id: number,
    name: string
};

export type PermissionPaginate = Response<Permission[]>;

export type PermissionList = {
    data: Permission[]
}