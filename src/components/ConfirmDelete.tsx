import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

interface Props {
    message: string;
    cargando_peticion: boolean;
    alDesmontar?: () => void;
    alConfirmar: () => void;
    alCancelar: () => void;
}

const ConfirmDelete = ({ cargando_peticion,message, alDesmontar, alConfirmar, alCancelar }: Props) => {
    const [cargando, setCargando] = useState(cargando_peticion);

    useEffect(() => {
        return () => {
            alDesmontar && alDesmontar();
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setCargando(cargando_peticion);
    }, [cargando_peticion])

    return (
        <div>
            <Alert variant="danger">
                <Alert.Heading className="text-center">
                    {message}
                </Alert.Heading>
            </Alert>
            <div className="d-flex justify-content-around">
                <Button
                    variant="danger"
                    onClick={() => alConfirmar()}
                    size="lg"
                    disabled={cargando ? true : false}
                >
                    Confirmar
                </Button>
                <Button
                    variant="warning"
                    onClick={() => alCancelar()}
                    size="lg"
                    disabled={cargando ? true : false}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    );
};

export default ConfirmDelete;
