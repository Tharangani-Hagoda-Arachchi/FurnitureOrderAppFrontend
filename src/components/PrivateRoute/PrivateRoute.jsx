import React, { useContext } from 'react'
import { authContext } from '../../context/authContext';
import NotFound from '../NotFound/NotFound';

const PrivateRoute = ({children}) => {
    const { token } = useContext(authContext);
    if (!token) {
        return <NotFound />;
    }

    return children;

}

export default PrivateRoute