import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import NumberFormat from "react-number-format";
import Button from "react-bootstrap/Button";

import { Gasto } from "../interfaces/GastosInterface";

interface Props {
    gasto: Gasto;
    returnGastoEditar?: (
        gastoParam: Gasto
    ) => Gasto | void;
    returnGastoEliminar?: (
        id: number | undefined
    ) => number | void;
}

const GastoComponent = ({ gasto, returnGastoEditar, returnGastoEliminar }: Props) => {
    return (
        <>
            <Card>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-top">
                        <div className="me-2">
                            <Card.Title className="text-break">{gasto.nombre}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {gasto.fecha_registro}
                            </Card.Subtitle>
                        </div>
                        <div className="d-flex flex-column">
                            <NumberFormat
                                value={gasto.precio}
                                prefix="$"
                                displayType={"text"}
                                thousandSeparator={true}
                                decimalScale={2}
                                className="text-end text-muted fw-bold"
                            />
                            <div>
                                Cantidad:
                                <NumberFormat
                                    value={gasto.cantidad_productos}
                                    prefix=" "
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    decimalScale={2}
                                    className="text-end text-muted fw-bold"
                                />
                            </div>
                        </div>
                    </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div>
                        <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            onClick={() =>
                                returnGastoEliminar && returnGastoEliminar(gasto.id)
                            }
                        >
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                        <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                                returnGastoEditar && returnGastoEditar(gasto)
                            }
                        >
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="text-white"
                            />
                        </Button>
                    </div>

                    <div>
                        Total:
                        <NumberFormat
                            value={gasto.total}
                            prefix=" $"
                            displayType={"text"}
                            thousandSeparator={true}
                            decimalScale={2}
                            className="text-success fw-bold"
                        />
                    </div>
                </Card.Footer>
            </Card>
        </>
    );
};

export default GastoComponent;
