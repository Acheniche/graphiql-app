import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../Login Page/firebase";


const PrivateRoute = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        user ? <Outlet /> : <Navigate to="/Login" />
    );
};

export default PrivateRoute;