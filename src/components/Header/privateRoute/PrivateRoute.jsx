import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ element, roles }) => {
    const { user, loading } = useContext(AuthContext);

    console.log("PrivateRoute - Usuario:", user);
    console.log("PrivateRoute - Roles requeridos:", roles);

    if(loading) {
        console.log('cargando', loading);
        return <div>cargaaanding...</div>
    }

    if (!user) {
        console.log("PrivateRoute - Redirigiendo a Login");
        return <Navigate to="/login" replace />;
    }


    if (!roles || !roles.includes(user.role)) {
        console.log("PrivateRoute - Redirigiendo a /admin");
        return <Navigate to="/admin" />;
    }

    console.log("PrivateRoute - Renderizando componente protegido");
    return element;
};

export default PrivateRoute;
