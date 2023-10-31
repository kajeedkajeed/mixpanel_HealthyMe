import React, { useContext } from 'react'
import { AppContext } from './Context'
import { Route, Navigate, Outlet} from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';
import Home from './Home';


const ProtectedRoute = ({children, ...rest}) => {
    const { currentUser } = useContext(AppContext);
    return currentUser ? <Outlet/> : <Home/>

}

export default ProtectedRoute
