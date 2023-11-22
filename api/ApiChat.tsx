import { sendGet, sendPost } from "./axios";

export interface ChatAnswer {
    answer: string,
    action: string,
    image: string
}

const path = {
    getAnswer: "http://localhost:8080/chat-answer"
}

export function getAnswer (param): Promise<ChatAnswer> {
    return sendPost(path.getAnswer, param)
}