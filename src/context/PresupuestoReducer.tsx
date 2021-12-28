import { PresupuestoState } from "./PresupuestoState";
type ActionProps =
    | { type: "ESTABLECER_PRESUPUESTO"; payload: number }
    | { type: "OBTENER_PRESUPUESTO" }
    | { type: "ELIMINAR_PRESUPUESTO" };

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
        case "ELIMINAR_PRESUPUESTO":
            localStorage.removeItem("presupuesto_inicial");
            localStorage.removeItem("presupuesto_restante");
            localStorage.removeItem("gastos");
            return {
                ...state,
                presupuesto_incial: 0,
                presupuesto_restante: 0,
                presupuesto_existe: false
            };

        default:
            return state;
    }
};
