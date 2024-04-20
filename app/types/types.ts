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