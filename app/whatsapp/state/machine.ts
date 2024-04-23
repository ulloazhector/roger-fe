import { IState, IEvent, STATUS, WHATSAPP_EVENT } from "@/app/types/types"

export const machine = (currentStatus: IState, event: IEvent): IState => {
    if (event.type === WHATSAPP_EVENT.MESSAGE) return {
        ...currentStatus,
        message: [...currentStatus.message, event.payload.message.body]
    }

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