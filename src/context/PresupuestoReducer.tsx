import { PresupuestoState } from "./PresupuestoState";
type ActionProps =
    | { type: "ESTABLECER_PRESUPUESTO"; payload: number }
    | { type: "OBTENER_PRESUPUESTO" };

export const presupuestoReducer = (
    state: PresupuestoState,
    action: ActionProps
): PresupuestoState => {
    switch (action.type) {
        case "ESTABLECER_PRESUPUESTO":
            return {
                ...state,
                presupuesto_incial: action.payload,
                presupuesto_restante: action.payload,
                presupuesto_existe: true,
            };
        case "OBTENER_PRESUPUESTO":
            return {
                ...state,
                presupuesto_incial: JSON.parse(
                    localStorage.getItem("presupuesto_inicial")!
                ),
                presupuesto_restante: JSON.parse(
                    localStorage.getItem("presupuesto_restante")!
                ),
                presupuesto_existe: JSON.parse(
                    localStorage.getItem("presupuesto_inicial")!
                )
                    ? true
                    : false,
            };

        default:
            return state;
    }
};
