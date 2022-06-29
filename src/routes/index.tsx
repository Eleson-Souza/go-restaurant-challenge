import { Routes as Routers, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";

//import Dashboard from '../pages/Dashboard';

const Routes = () => (
  <Routers>
    <Route path="/" element={<Dashboard />} />
  </Routers>
);

export default Routes;
