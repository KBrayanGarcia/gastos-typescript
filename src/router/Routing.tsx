import {BrowserRouter as Router, Switch} from "react-router-dom"
import HomePage from '../pages/HomePage';
import ExpensesPage from '../pages/ExpensesPage';
import RoutePrivateHome from "./Routes/RoutePrivateHome";
import PresupuestoProvider from "../context/PresupuestoState";
import RoutePrivateExpenses from './Routes/RoutePrivateExpenses';

const Routing = () => {
    return (
        <Router>
            <Switch>
                <PresupuestoProvider>
                    <RoutePrivateHome exact path={"/"} component={HomePage} />
                    <RoutePrivateExpenses exact path={"/expenses"} component={ExpensesPage} />
                </PresupuestoProvider>
            </Switch>
        </Router>
    )
}


export default Routing
