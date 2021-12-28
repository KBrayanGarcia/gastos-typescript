import { ChangeEvent, useEffect, useState } from "react";
import { default as FormBootstrap } from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik, Form, useFormikContext } from "formik";
import NumberFormat from "react-number-format";
import { ToastContainer } from "react-toastify";

import useGastos from "../../hooks/useGastos";
import { Gasto } from "../../interfaces/GastosInterface";

interface Props {
    registro_seleccionado?: Gasto;
    setRegistroSeleccionado?: React.Dispatch<React.SetStateAction<Gasto | undefined>>;
    cerrarModal?: () => void;
    onSubmitSuccess?: () => void;
}

const FormGasto = ({ registro_seleccionado, cerrarModal, onSubmitSuccess, setRegistroSeleccionado }: Props) => {
    const { validarGastos, postGasto } = useGastos();

    const [cargando, setCargando] = useState(false)

    const initialValues: Gasto = {
        id: registro_seleccionado ? registro_seleccionado.id : undefined,
        nombre: registro_seleccionado ? registro_seleccionado.nombre : "",
        precio: registro_seleccionado ? registro_seleccionado.precio : 0,
        cantidad_productos: registro_seleccionado ? registro_seleccionado.cantidad_productos : 0,
        fecha_registro: registro_seleccionado ? registro_seleccionado.fecha_registro : new Date().toLocaleString(),
        total: registro_seleccionado ? registro_seleccionado.total : 0,
    };

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={async (datos, { resetForm }) => {
                    setCargando(true)
                    const datosValidados = await validarGastos(datos);
                    if (!datosValidados) {
                        setCargando(false)
                        return;
                    }
                    await postGasto(datosValidados);
                    setCargando(false)

                    if (cerrarModal) cerrarModal();
                    if (onSubmitSuccess) onSubmitSuccess();
                    if (setRegistroSeleccionado) setRegistroSeleccionado(undefined);
                    resetForm();
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <FormBootstrap.Group
                            className="mb-3"
                            controlId="nombre"
                        >
                            <FormBootstrap.Label>Nombre</FormBootstrap.Label>
                            <FormBootstrap.Control
                                type="text"
                                value={values.nombre}
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setFieldValue("nombre", e.target.value)
                                }
                            />
                        </FormBootstrap.Group>
                        <div className="d-flex justify-content-between">
                            <FormBootstrap.Group className="mb-3 me-2">
                                <FormBootstrap.Label htmlFor="precio">
                                    Precio
                                </FormBootstrap.Label>
                                <NumberFormat
                                    id="precio"
                                    value={values.precio || ""}
                                    className="form-control"
                                    prefix="$"
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    type="text"
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        setFieldValue("precio", Number(value));
                                    }}
                                />
                            </FormBootstrap.Group>
                            <FormBootstrap.Group className="mb-3">
                                <FormBootstrap.Label htmlFor="cantidad">
                                    Cantidad
                                </FormBootstrap.Label>
                                <NumberFormat
                                    id="cantidad"
                                    value={values.cantidad_productos || ""}
                                    min={1}
                                    className="form-control text-end"
                                    thousandSeparator={true}
                                    decimalScale={3}
                                    type="text"
                                    onValueChange={(values) => {
                                        const { value } = values;
                                        setFieldValue(
                                            "cantidad_productos",
                                            Number(value)
                                        );
                                    }}
                                />
                            </FormBootstrap.Group>
                        </div>
                        <Total />
                        <div className="d-grid gap-2">
                            {
                                registro_seleccionado ? (
                                    <>
                                        <Button
                                            variant="success"
                                            type="submit"
                                            className="mt-2"
                                            size="lg"
                                            disabled={cargando ? true : false}
                                        >
                                            Actualizar
                                        </Button>
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            onClick={() => setRegistroSeleccionado && setRegistroSeleccionado(undefined)}
                                            className="mt-2"
                                            size="lg"
                                        >
                                            Cancelar
                                        </Button>

                                    </>
                                ) : (
                                    <Button
                                        variant="success"
                                        type="submit"
                                        className="mt-2"
                                        size="lg"
                                        disabled={cargando ? true : false}
                                    >
                                        Agregar
                                    </Button>                                        
                                )
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

const Total = () => {
    const { values, setFieldValue } = useFormikContext<Gasto>();

    useEffect(() => {
        let total: number = values.precio * values.cantidad_productos;
        setFieldValue("total", total);
        // eslint-disable-next-line
    }, [values.precio, values.cantidad_productos]);

    return (
        <>
            {values.cantidad_productos > 1 && (
                <FormBootstrap.Group className="mb-3">
                    <FormBootstrap.Label htmlFor="total">
                        Total
                    </FormBootstrap.Label>
                    <NumberFormat
                        id="total"
                        value={values.total || ""}
                        prefix="$"
                        className="form-control"
                        thousandSeparator={true}
                        decimalScale={2}
                        type="text"
                        disabled
                    />
                </FormBootstrap.Group>
            )}
        </>
    );
};

export default FormGasto;
