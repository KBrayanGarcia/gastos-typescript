import { Form, Formik } from "formik";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import NumberFormat from "react-number-format";
import usePresupuesto from "../../hooks/usePresupuesto";

interface datosForm {
    presupuesto: number | undefined;
}

interface Props {
    toGo?: (presupuesto?: number) => void;
}

const FormPresupuesto = ({ toGo }: Props) => {
    const { validarPresupuesto } = usePresupuesto();
    const initial_values: datosForm = {
        presupuesto: undefined,
    };

    return (
        <>
            <Formik
                initialValues={initial_values}
                onSubmit={async (datos: datosForm) => {
                    const datos_validados = await validarPresupuesto(
                        datos.presupuesto
                    );
                    if (!datos_validados) return;

                    localStorage.setItem(
                        "presupuesto_inicial",
                        JSON.stringify(datos_validados.presupuesto)
                    );
                    localStorage.setItem(
                        "presupuesto_restante",
                        JSON.stringify(datos_validados.presupuesto_restante)
                    );
                    localStorage.setItem(
                        "gastos",
                        JSON.stringify([])
                    );
                    if (toGo) toGo(datos_validados.presupuesto);
                }}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$</InputGroup.Text>
                            <NumberFormat
                                value={values.presupuesto || undefined}
                                className="form-control"
                                thousandSeparator={true}
                                type="text"
                                onValueChange={(values, sourceInfo) => {
                                    const { value } = values;
                                    setFieldValue("presupuesto", Number(value));
                                }}
                            />
                        </InputGroup>

                        <div className="d-grid gap-2 mt-2">
                            <Button variant="success" type="submit" size="lg">
                                Ingresar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default FormPresupuesto;
