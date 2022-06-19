import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    //user login takhar poro jkn url e signup url e dukhe tkn signup page show kore kintu user login takle oi ta show korbe na tai tkn keo signup url diye click korbe tkn ta k abr redirect koranu lagbe Private router er moto
    return !currentUser ? (<Route {...rest}>
        {(props) => <Component {...props} />}
    </Route>) : (<Redirect to='/' />)
};

export default PublicRoute;