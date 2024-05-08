import {AuthModel} from "../models/iam/Auth.tsx";
import {User} from "../models/iam/User.ts";

export const user: User = {
    id: 1,
    first_name: 'Ayman',
    last_name: 'Bitar',
    email: 'ayman@livvy.com',
    apple_build_version_id: null
}

export const loginObject : AuthModel = {
    data: user,
    token: 'API-ACCESSTOKEN'
}