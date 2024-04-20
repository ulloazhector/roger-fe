"use client"
import Link from "next/link"
import { useState } from "react";
import { useQRCode } from "next-qrcode"
import { closeClient, initClient } from "@/app/api/botApi"
import { EVENT_TYPE, IState, STATUS } from "@/app/types/types"
import { machine } from "@/app/whatsapp/state/machine"
import socket from "@/app/sockets/socket"

export default function WhatsappPage() {
    const { Canvas } = useQRCode()
    const [state, setState] = useState<IState>({
        status: STATUS.IDLE,
        qr: ""
    })

    socket.on(EVENT_TYPE.BOT, (event) => setState(machine(state, event)))

    const handleInitClient = async () => {
        try {
            await initClient()
        } catch (error) {
            console.log(error)
        }
    }
    const handleCloseClient = async () => {
        try {
            await closeClient()
        } catch (error) {
            console.log(error)
        }
    }

    const renderControl = () => {
        switch (state.status) {
            case STATUS.IDLE:
                return <button onClick={handleInitClient}>Generar QR</button>
            case STATUS.LOADING:
                return <p>Cargando...</p>
            case STATUS.CLIENT_READY:
                return <button onClick={handleCloseClient}>Cerrar sesión</button>
            default:
                return <></>
        }
    }

    return (
        <div>
            <Link href="/">Ir a home</Link>
            <h2>B0T web</h2>
            {renderControl()}
            {state.status === STATUS.CLIENT_READY && <p>B0T conectado</p>}
            {state.qr !== "" && <Canvas text={state.qr} />}
        </div>
    )
}
