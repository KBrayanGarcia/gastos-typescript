import { useState } from 'react';
import { Gasto } from '../interfaces/GastosInterface';

const useGastos = () => {

    const [gastos, setGastos] = useState<Gasto[]>([])

    const obtenerGastos = () => {
        const gastos_guardados: Gasto[] = JSON.parse(localStorage.getItem("gastos")!);
        setGastos(gastos_guardados)
    }

    return {
        gastos,
        obtenerGastos
    }
}

export default useGastos
