import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return ( 
        auth?.user ? <Outlet /> : <Redirect to={{ pathname: "/login", state: { from: location } }} />
     );
}

export default RequireAuth;