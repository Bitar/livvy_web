import {Response} from "../../helpers/response.ts";
import {Role} from "./Role.ts";
import {UserSource} from "./UserSource.ts";

export type User = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    is_email_verified?: boolean,
    source?: UserSource,
    roles?: Role[]
}

export type UserList = {
    data: User[]
}

export type UserPaginate = Response<User[]>;