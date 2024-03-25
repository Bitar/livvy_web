import {User} from "./User.ts";

export interface AuthModel {
    data: User,
    token: string
}