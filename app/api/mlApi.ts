import axios from "axios"

const mlApi = axios.create({
    baseURL: "http://localhost:5000/mercado-libre"
})

export const authMl = async ({ code, refreshToken }: { code?: string, refreshToken?: string }) => {
    return mlApi.post("/auth", { code, refreshToken })
}