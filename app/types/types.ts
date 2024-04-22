// Eventos de socket separados por cada app
export enum EVENT_TYPE {
    BOT = "bot",
    PIPRI = "pipri",
    TSSCRAPPER = "tsscrapper",
    KEVINAPP = "kevinapp"
}

export enum WHATSAPP_EVENT {
    LOADING = "EVT_loading",
    QR = "EVT_qr",
    CLIENT_READY = "EVT_client-ready",
    DISCONNECT = "EVT_disconnected"
}

export enum ML_TOKEN_STATUS {
    IDLE, 
    TOKEN_AUTHORIZED
}

export enum STATUS { IDLE, LOADING, QR_READY, CLIENT_READY }

export interface IState {
    status: STATUS
    qr: string
}

export interface IEvent {
    type: WHATSAPP_EVENT
    payload: any
}