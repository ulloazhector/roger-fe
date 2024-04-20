'use client'
import { ReactNode, createContext, useContext, useReducer } from "react"

// State
interface AppState {
    mlCode: string | null
}

const initialAppState: AppState = {
    mlCode: null
}

// Action
type AppAction = {
    type: 'updateMlCode',
    payload: { mlCode: string | null }
}

const AppReducer = (state: AppState, action: AppAction): AppState => {
    const { type, payload } = action

    switch (type) {
        case 'updateMlCode':
            return {
                ...state,
                mlCode: payload.mlCode
            }

        default:
            return state
    }
}

// Context
interface AppContextProps extends AppState {
    updateMlCode: (mlCode: string | null) => void
}

interface AppProviderProps {
    children: ReactNode | ReactNode[]
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }: AppProviderProps) => {
    const [state, dispatch] = useReducer(AppReducer, initialAppState)


    const updateMlCode = (mlCode: AppState['mlCode']) => {
        dispatch({
            type: 'updateMlCode',
            payload: { mlCode }
        })
    }

    const value = { ...state, updateMlCode }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}