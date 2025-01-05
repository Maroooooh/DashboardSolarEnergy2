import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Guard({ children }) {
    const isLoggedIn = useSelector((state) => state.isLoggin.isLoggin);
    if (isLoggedIn ==  false) {
        return <Navigate to="/login" />;
    } else {
        return children;
    }
}