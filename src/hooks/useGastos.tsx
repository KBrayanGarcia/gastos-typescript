import { useState } from "react";
import { Gasto } from "../interfaces/GastosInterface";
import { alertaPersonalizada } from "../components/Alertas";

const useGastos = () => {
    const [gastos, setGastos] = useState<Gasto[]>([]);

    const validarGastos = (gasto: Gasto): Gasto | void => {
        let errores: number = 0;
        
        if (gasto.nombre.trim() === "") {
            alertaPersonalizada({
                mensaje: "El nombre es obligatorio",
                tipo: "error",
            });
            errores++;
        }
        if (gasto.precio < 0) {
            alertaPersonalizada({
                mensaje: "El precio no puede ser negativo",
                tipo: "error",
            });
            errores++;
        }
        if (gasto.cantidad_productos <= 0) {
            alertaPersonalizada({
                mensaje: "La cantidad debe ser mayor a 0",
                tipo: "error",
            });
            errores++;
        }
        if (errores > 0) {
            return;
        }

        return gasto;
    };

    const postGasto = async (gasto: Gasto) => {
        const gastos_guardados: Gasto[] = await JSON.parse(localStorage.getItem("gastos") || "[]");
        const presupuesto_restante: number = await JSON.parse(localStorage.getItem("presupuesto_restante") || "0");
        let nuevo_presupuesto;

        if (gasto.id) {
            gastos_guardados.forEach((gasto_guardado, index) => {
                if (gasto_guardado.id === gasto.id) {
                    nuevo_presupuesto = presupuesto_restante + (gasto_guardado.total - gasto.total);
                    gastos_guardados[index] = gasto;
                }
            })
        } else {
            gasto.id = Date.now();
            gastos_guardados.push(gasto);
            nuevo_presupuesto = presupuesto_restante - gasto.total!;
        }

        localStorage.setItem("presupuesto_restante", JSON.stringify(nuevo_presupuesto));
        localStorage.setItem("gastos", JSON.stringify(gastos_guardados));
        alertaPersonalizada({ mensaje: "Gasto guardado correctamente", tipo: "success" });
        return gasto;
    }

    const borrarGasto = (id: number) => {
        const gastos_guardados: Gasto[] = JSON.parse(localStorage.getItem("gastos") || "[]");
        const presupuesto_restante: number = JSON.parse(localStorage.getItem("presupuesto_restante") || "0");
        let nuevo_presupuesto;

        let nuevos_gastos_filtrados;
        gastos_guardados.forEach((gasto_guardado) => {
            if (gasto_guardado.id === id) {
                nuevo_presupuesto = presupuesto_restante + gasto_guardado.total;
                nuevos_gastos_filtrados = gastos_guardados.filter((gasto_guardado, index) => gasto_guardado.id !== id);
            }
        })
        localStorage.setItem("presupuesto_restante", JSON.stringify(nuevo_presupuesto));
        localStorage.setItem("gastos", JSON.stringify(nuevos_gastos_filtrados));
        alertaPersonalizada({ mensaje: "Gasto eliminado correctamente", tipo: "success" });
        return id;
    }

    const obtenerGastos = () => {
        const gastos_guardados: Gasto[] = JSON.parse(
            localStorage.getItem("gastos")!
        );
        setGastos(gastos_guardados);
    };

    return {
        gastos,
        obtenerGastos,
        validarGastos,
        postGasto,
        borrarGasto
    };
};

export default useGastos;
