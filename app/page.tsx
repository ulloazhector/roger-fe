'use client'
import { useState } from "react"
import { closeClient, initClient } from "./api/botApi"
import { useQRCode } from 'next-qrcode'
import socket from "./sockets/socket"

type Status = "idle" | "loading" | "qr-ready" | "client-ready"

export default function Home() {
    const { Canvas } = useQRCode()
    const [status, setStatus] = useState<Status>("idle")
    const [qr, setQr] = useState("")

    socket.on("EVT_qr", (arg) => {
        setStatus("qr-ready")
        setQr(arg)
    })

    socket.on("EVT_client-ready", () => {
        setStatus("client-ready")
    })

    socket.on("EVT_disconnected", () => {
        console.log("disconnected")
        setStatus("idle")
        setQr("")
    })

    const handleInitClient = async () => {
        setStatus("loading")
        await initClient()
    }

    const handleCloseClient = async () => {
        setQr("")
        setStatus("idle")
        await closeClient()
    }

    return (
        <main>
            <h1>B0T web</h1>
            {(status === "idle" || status === "loading" || status === "client-ready") && <div>
                <button
                    onClick={status === "client-ready" ? handleCloseClient : handleInitClient}
                    disabled={status === "loading"}
                >
                    {status === "idle" && "Generar QR"}
                    {status === "loading" && "Cargando..."}
                    {status === "client-ready" && "Cerrar sesión"}
                </button>
            </div>}
            {status === "client-ready" && <p>B0T conectado :)</p>}
            {qr !== "" && status !== "client-ready" && <Canvas text={qr} />}
        </main>
    )
}
