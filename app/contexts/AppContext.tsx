'use client'
import { ReactNode, createContext, useContext, useReducer } from "react"
import { ML_TOKEN_STATUS } from "../types/types"
import axios from "axios"

// State
interface AppState {
    mlCode: string | null
    mlAccessToken: string | null
    mlRefreshToken: string | null
    mlTokenStatus: ML_TOKEN_STATUS
}

const initialAppState: AppState = {
    mlCode: null,
    mlAccessToken: null,
    mlRefreshToken: null,
    mlTokenStatus: ML_TOKEN_STATUS.IDLE
}

// Action
type AppAction = {
    type: 'updateMlCode',
    payload: { mlCode: AppState['mlCode'] }
} | {
    type: 'updateMlTokens',
    payload: {
        mlAccessToken: AppState['mlAccessToken'],
        mlRefreshToken: AppState['mlRefreshToken']
    }
} | {
    type: 'updateMlTokenStatus',
    payload: { mlTokenStatus: AppState['mlTokenStatus'] }
}

const AppReducer = (state: AppState, action: AppAction): AppState => {
    const { type, payload } = action

    switch (type) {
        case 'updateMlCode':
            return {
                ...state,
                mlCode: payload.mlCode
            }
        case "updateMlTokens":
            return {
                ...state,
                mlAccessToken: payload.mlAccessToken,
                mlRefreshToken: payload.mlRefreshToken
            }
        case "updateMlTokenStatus":
            return {
                ...state,
                mlTokenStatus: payload.mlTokenStatus
            }

        default:
            return state
    }
}

// Context
interface AppContextProps extends AppState {
    updateMlCode: (mlCode: AppState['mlCode']) => void
    updateMlTokens: (tokens: {
        mlAccessToken: AppState['mlAccessToken'],
        mlRefreshToken: AppState['mlRefreshToken']
    }) => void
}

interface AppProviderProps {
    children: ReactNode | ReactNode[]
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }: AppProviderProps) => {
    const [state, dispatch] = useReducer(AppReducer, initialAppState)


    const updateMlCode: AppContextProps['updateMlCode'] = (mlCode) => {
        dispatch({
            type: 'updateMlCode',
            payload: { mlCode }
        })
    }

    const updateMlTokens: AppContextProps['updateMlTokens'] = ({ mlAccessToken, mlRefreshToken }) => {
        if (mlAccessToken) {

            dispatch({
                type: 'updateMlTokens',
                payload: { mlAccessToken, mlRefreshToken }
            })
            dispatch({
                type: "updateMlTokenStatus",
                payload: { mlTokenStatus: ML_TOKEN_STATUS.TOKEN_AUTHORIZED }
            })
            axios.defaults.headers.common.Authorization = `Bearer ${mlAccessToken}`

        } else {

            dispatch({
                type: 'updateMlTokens',
                payload: {
                    mlAccessToken: null,
                    mlRefreshToken: null
                }
            })
            dispatch({
                type: "updateMlTokenStatus",
                payload: { mlTokenStatus: ML_TOKEN_STATUS.IDLE }
            })
            axios.defaults.headers.common.Authorization = ''

        }
    }

    const value = { ...state, updateMlCode, updateMlTokens }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}