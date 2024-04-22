'use client'
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useApp } from "./contexts/AppContext"
import { authMl } from "./api/mlApi"

export default function Home() {
    const { updateMlCode, updateMlTokens, mlAccessToken, mlRefreshToken } = useApp()
    const code = useSearchParams().get("code")

    useEffect(() => {
        if (code !== "")
            updateMlCode(code)
    }, [code])

    const handleGetTokenML = async () => {
        if (typeof code === "string") {

            const { data } = await authMl({ code })
            updateMlTokens({
                mlAccessToken: data.access_token,
                mlRefreshToken: data.refresh_token
            })
            console.log("data: ", data)
        }
    }
    
    const handleChangeRefreshToAccess = async () => {
        if (typeof mlRefreshToken === "string") {
            
            const { data } = await authMl({ refreshToken: mlRefreshToken })
            updateMlTokens({
                mlAccessToken: data.access_token,
                mlRefreshToken: data.refresh_token
            })
        }
    }

    return (
        <div>
            <Link href="/whatsapp">Ir a WhatsApp</Link>
            <h1>Roger</h1>
            <button
                onClick={handleGetTokenML}
            >
                Obtener Token de Mercado Libre
            </button>
            <button
                onClick={handleChangeRefreshToAccess}
            >
                Actualizar Access Token con Refresh Token
            </button>
            <p>mlAccessToken: {mlAccessToken}</p>
            <p>mlRefreshToken: {mlRefreshToken}</p>
        </div>
    )
}