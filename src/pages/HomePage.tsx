import styled from "styled-components";
import FormPresupuesto from "../components/Forms/FormPresupuesto";
import { colors_light } from "../theme/colors";
import { useHistory } from 'react-router-dom';
import { useContext } from "react";
import { PresupuestoContext } from '../context/PresupuestoState';

const HomePage = () => {

    const {establecerPresupuesto} = useContext(PresupuestoContext);
    const {push} = useHistory()

    const toGoExpenses = (presupuesto?: number) => {
        if(presupuesto) establecerPresupuesto(presupuesto)
        push("/expenses");
    }

    return (
        <ContainerHomePage className="d-flex justify-content-center align-items-center">
            <ContainerFormPresupuesto>
                <h1 className="text-light">Presupuesto Inicial</h1>
                <FormPresupuesto toGo={toGoExpenses}/>
            </ContainerFormPresupuesto>
        </ContainerHomePage>
    );
};

const ContainerHomePage = styled.div`
    min-height: 100vh;
    background: linear-gradient(
        90deg,
        #1b2f33 0%,
        rgba(40, 80, 46, 0.7) 66.9%,
        rgba(71, 104, 44, 0.5) 100%
    );
`;

const ContainerFormPresupuesto = styled.div`
    border-radius:5px;
    padding: 10px;
    background-color: ${colors_light.primary};

`;

export default HomePage;
