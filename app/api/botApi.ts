import axios from "axios"

export const botApi = axios.create({
    baseURL: "http://localhost:5000"
})

export const initClient = async () => {
    return botApi.post("/whatsapp/init-client")
}

export const closeClient = async () => {
    return botApi.post("/whatsapp/close-client")
}