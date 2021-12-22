const usePresupuesto = () => {

    const validarPresupuesto = async (presupuesto: number = 0) => {
        const datos = {
            presupuesto: presupuesto,
            presupuesto_restante: presupuesto,
        };
        if (presupuesto <= 0) {
            return;
        }
        return datos;
    };
    return {
        validarPresupuesto,
    };
};

export default usePresupuesto;
