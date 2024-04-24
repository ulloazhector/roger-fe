import axios from "axios"

export const botApi = axios.create({
    baseURL: "http://localhost:5000/whatsapp"
})

export const initClient = async () => {
    return botApi.post("/init-client")
}

export const closeClient = async () => {
    return botApi.post("/close-client")
}

export const getClientStatus = async () => {
    return botApi.get("/status")
}