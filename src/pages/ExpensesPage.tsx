import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import NumberFormat from "react-number-format";
import {ToastContainer} from 'react-toastify'

import ArrayMap from "../components/ArrayMap";
import ModalGastos from "../components/ModalGastos";
import FormGasto from "../components/Forms/FormGasto";
import { Gasto } from "../interfaces/GastosInterface";
import { PresupuestoContext } from "../context/PresupuestoState";
import GastoComponent from "../components/GastoComponent";
import useGastos from "../hooks/useGastos";
import ConfirmDelete from "../components/ConfirmDelete";
import { colors_light } from "../theme/colors";

const ExpensesPage = () => {
    const { gastos, obtenerGastos, borrarGasto } = useGastos();
    const {push} = useHistory()
    const { state: variables, obtenerPresupuesto, eliminarPresupuesto } = useContext(PresupuestoContext);
    const { presupuesto_restante } = variables;

    const [show, setShow] = useState(false);
    const [registro_seleccionado, setRegistroSeleccionado] = useState<Gasto | undefined>(undefined);
    const [registro_eliminar, setRegistroEliminar] = useState<number | undefined>(undefined);
    const [estado_peticion_eliminacion, setEstadoPeticionEliminacion] = useState(false)

    useEffect(() => {
        obtenerGastos();
        // eslint-disable-next-line
    }, []);

    const handleClose = () => {
        setShow(false);
        setRegistroSeleccionado(undefined);
    };
    const handleShow = (gasto?: Gasto) => {
        setShow(true);
        if (gasto) setRegistroSeleccionado(gasto);
    };

    const getGastosPresupuesto = () => {
        obtenerGastos();
        obtenerPresupuesto();
    };

    const eliminaPresupuesto = () => {
        push("/");
        eliminarPresupuesto()
        
    }

    return (
        <ContainerPageExpenses>
            <ToastContainer/>
            <div className="container">
                <h1 className="text-light text-center">REGISTROS</h1>
                <div className="d-flex justify-content-between align-items-center text-white shadow p-2 radius">
                    <div className="d-md-flex align-items-center">
                        <NumberFormat
                            value={presupuesto_restante}
                            prefix="Restante: $"
                            displayType={"text"}
                            thousandSeparator={true}
                            decimalScale={2}
                            renderText={(value) => (
                                <h5 className="mb-0 me-md-2">
                                    {value}
                                </h5>
                            )}
                        />
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-sm"/>
                            <Dropdown.Menu className="bg-transparent">
                                <div className="d-grid gap-2 mb-2">
                                    <Button variant="danger" onClick={eliminaPresupuesto}>
                                        Eliminar presupuesto
                                    </Button>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            {new Date().toLocaleDateString()}
                        </h5>
                        <Button
                            variant="success"
                            onClick={() => handleShow()}
                            className="ms-2"
                        >
                            +
                        </Button>
                        <ModalGastos
                            title={"Nuevo registro"}
                            footer={`Presupuesto restante $${presupuesto_restante}`}
                            show={show}
                            handleClose={handleClose}
                        >
                            {registro_eliminar ? (
                                <ConfirmDelete
                                    message="¿Está seguro de eliminar el registro?"
                                    alDesmontar={() =>
                                        setRegistroEliminar(undefined)
                                    }
                                    alConfirmar={() => {
                                        setEstadoPeticionEliminacion(true)
                                        const res_delete = borrarGasto(registro_eliminar);
                                        if (!res_delete) {
                                            setEstadoPeticionEliminacion(false)
                                        }
                                        setEstadoPeticionEliminacion(false)
                                        getGastosPresupuesto();
                                        handleClose();
                                    }}
                                    cargando_peticion={estado_peticion_eliminacion}
                                    alCancelar={() => handleClose()}
                                />
                            ) : (
                                <FormGasto
                                    onSubmitSuccess={getGastosPresupuesto}
                                    registro_seleccionado={
                                        registro_seleccionado
                                    }
                                    setRegistroSeleccionado={
                                        setRegistroSeleccionado
                                    }
                                />
                            )}
                        </ModalGastos>
                    </div>
                </div>
                {gastos && (
                    <ArrayMap
                        data={gastos}
                        renderComponent={(element: Gasto, index) => (
                            <div key={index} className="mb-2">
                                <GastoComponent
                                    gasto={element}
                                    returnGastoEditar={(gasto) => handleShow(gasto)}
                                    returnGastoEliminar={(id) => {
                                        handleShow();
                                        setRegistroEliminar(id);
                                    }}
                                />
                            </div>
                        )}
                    />
                )}
            </div>
        </ContainerPageExpenses>
    );
};

const ContainerPageExpenses = styled.div`
    min-height: 100vh;
    background-color: ${colors_light.primary};
    padding: 20px 0;
`;

export default ExpensesPage;
