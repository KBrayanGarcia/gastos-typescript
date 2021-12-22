import styled from 'styled-components';
import { colors_light } from '../theme/colors';
import useGastos from '../hooks/useGastos';
import { useEffect } from 'react';
import ArrayMap from '../components/ArrayMap';

const ExpensesPage = () => {

    const {gastos, obtenerGastos} = useGastos()

    useEffect(() => {
        
        obtenerGastos()
        
    // eslint-disable-next-line
    }, [])

    return (
        <ContainerPageExpenses>
            <div className='container'>
                <h1 className='text-light text-center'>REGISTROS</h1>
                <div className='d-flex justify-content-between align-items-center text-white shadow p-2 radius'>
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>+</span>
                    {/* Pendiente modal */}
                </div>
                <ArrayMap
                    data={gastos}
                />
            </div>
        </ContainerPageExpenses>
    )
}

const ContainerPageExpenses = styled.div`
    min-height: 100vh;
    background-color: ${colors_light.primary};
`;

export default ExpensesPage
