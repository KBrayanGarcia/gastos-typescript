import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { PresupuestoContext } from '../../context/PresupuestoState';


const RoutePrivateExpenses = ({ component: Component, ...props }: any) => {
    const {state ,obtenerPresupuesto } = useContext(PresupuestoContext);

    const {presupuesto_existe} = state

    useEffect(() => {
        obtenerPresupuesto()
    // eslint-disable-next-line
    }, [])

    return (
        <Route { ...props } render={ props => !presupuesto_existe ?
            
                <Redirect to='/' />
            :
                <Component { ...props } />}
        />
    )
}

export default RoutePrivateExpenses
