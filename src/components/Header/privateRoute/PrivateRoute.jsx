import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ element, roles }) => {
    const { user, loading } = useContext(AuthContext);

    if(loading) {
        return <div>cargaaanding...</div>
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }


    if (!roles || !roles.includes(user.role)) {
        return <Navigate to="/admin" />;
    }

    return element;
};

export default PrivateRoute;
