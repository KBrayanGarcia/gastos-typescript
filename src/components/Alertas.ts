import {toast, ToastOptions} from 'react-toastify'

type TiposAlerta = "info" | "success" | "warning" | "error";

interface Params {
    mensaje: string;
    tipo: TiposAlerta;
}

export const alertaPersonalizada = ({ mensaje, tipo }: Params) => {
    
    const opciones: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    }

    switch (tipo) { 
        case "info":
            toast.info(mensaje, opciones);
            break;
        case "success":
            toast.success(mensaje, opciones);
            break;
        case "warning":
            toast.warn(mensaje, opciones);
            break;
        case "error":
            toast.error(mensaje, opciones);
            break;
        default:
            toast(mensaje, opciones);
            break;
    }
}