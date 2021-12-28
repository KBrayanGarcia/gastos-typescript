import {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Switch } from "react-router-dom"
import RoutePrivateHome from "./Routes/RoutePrivateHome";
import PresupuestoProvider from "../context/PresupuestoState";
import RoutePrivateExpenses from './Routes/RoutePrivateExpenses';
import LoaderApp from '../components/Loaders/LoaderApp';

const HomePage = lazy(() => import('../pages/HomePage'))
const ExpensesPage = lazy(() => import('../pages/ExpensesPage'))

const Routing = () => {
    return (
        <Router>
            <Switch>
                <PresupuestoProvider>
                    <Suspense fallback={<LoaderApp/>}>
                        <RoutePrivateHome exact path={"/"} component={HomePage} />
                        <RoutePrivateExpenses exact path={"/expenses"} component={ExpensesPage} />
                    </Suspense>
                </PresupuestoProvider>
            </Switch>
        </Router>
    )
}


export default Routing
