"use client"
import { useEffect, useState } from "react"
import { closeClient, initClient } from "../api/botApi"
import { useQRCode } from "next-qrcode"
import socket from "../sockets/socket"
import { EVENT_TYPE, WHATSAPP_EVENT } from "../types/types"
import Link from "next/link"

enum STATUS { IDLE, LOADING, QR_READY, CLIENT_READY }


interface IState {
    status: STATUS
    qr: string
}

interface IEvent {
    type: WHATSAPP_EVENT
    payload: any
}

const machine = (currentStatus: IState, event: IEvent): IState => {
    switch (currentStatus.status) {
        case STATUS.IDLE:
            if (event.type === WHATSAPP_EVENT.LOADING) return {
                ...currentStatus,
                status: STATUS.LOADING,
            }
        case STATUS.LOADING:
            if (event.type === WHATSAPP_EVENT.QR) return {
                ...currentStatus,
                status: STATUS.QR_READY,
                qr: event.payload.qr
            }
        case STATUS.QR_READY:
            if (event.type === WHATSAPP_EVENT.CLIENT_READY) return {
                ...currentStatus,
                status: STATUS.CLIENT_READY,
                qr: ""
            }
            if (event.type === WHATSAPP_EVENT.QR) return {
                ...currentStatus,
                qr: event.payload.qr
            }
        case STATUS.CLIENT_READY:
            if (event.type === WHATSAPP_EVENT.DISCONNECT) return {
                ...currentStatus,
                status: STATUS.IDLE,
                qr: ""
            }
        default: return currentStatus
    }
}

export default function WhatsappPage() {
    const { Canvas } = useQRCode()
    const [state, setState] = useState<IState>({
        status: STATUS.IDLE,
        qr: ""
    })

    socket.on(EVENT_TYPE.BOT, (event) => setState(machine(state, event)))

    const handleInitClient = async () => await initClient()
    const handleCloseClient = async () => await closeClient()

    const renderButton = () => {
        switch (state.status) {
            case STATUS.IDLE:
                return <button onClick={handleInitClient}>Generar QR</button>
            case STATUS.LOADING:
                return <button disabled>Cargando...</button>;
            case STATUS.CLIENT_READY:
                return <button onClick={handleCloseClient}>Cerrar sesión</button>
            default:
                return <></>
        }
    }

    return (
        <main>
            <Link href="/">Ir a home</Link>
            <h1>B0T web</h1>
            {renderButton()}
            {state.status === STATUS.CLIENT_READY && <p>B0T conectado</p>}
            {state.qr !== "" && <Canvas text={state.qr} />}
        </main>
    )
}
