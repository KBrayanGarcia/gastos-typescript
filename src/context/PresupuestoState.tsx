import { createContext, useReducer } from 'react'
import {presupuestoReducer} from './PresupuestoReducer'

export interface PresupuestoState {
    presupuesto_incial: number;
    presupuesto_restante: number;
    presupuesto_existe: boolean;
}

export const initialState: PresupuestoState = {
    presupuesto_incial: 0,
    presupuesto_restante: 0,
    presupuesto_existe: false
}

export interface PresupuestoContextProps {
    state: PresupuestoState,
    establecerPresupuesto: (presupuesto: number) => void
    obtenerPresupuesto: () => void
}

export const PresupuestoContext = createContext({} as PresupuestoContextProps)

const PresupuestoProvider = ({children}: any) => {

    const [state_modificado, dispatch] = useReducer(presupuestoReducer, initialState)

    const establecerPresupuesto = (presupuesto: number) => {
        dispatch({
            type: "ESTABLECER_PRESUPUESTO",
            payload: presupuesto
        })
    }
    const obtenerPresupuesto = () => {
        dispatch({
            type: "OBTENER_PRESUPUESTO",
        })
    }

    return (
        <PresupuestoContext.Provider
            value={{
                state: {
                    presupuesto_incial: state_modificado.presupuesto_incial,
                    presupuesto_restante: state_modificado.presupuesto_restante,
                    presupuesto_existe: state_modificado.presupuesto_existe
                },
                establecerPresupuesto,
                obtenerPresupuesto
            }}
        >
            {children}
        </PresupuestoContext.Provider>
    )
}

export default PresupuestoProvider

