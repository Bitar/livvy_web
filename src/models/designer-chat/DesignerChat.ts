import {User} from "../iam/User.ts";
import {DesignerChatStatus} from "./DesignerChatStatus.ts";

export interface DesignerChat {
    "id": number,
    "topic": string,
    "openai_thread_id": string | null,
    "user": User,
    "status": DesignerChatStatus
}