import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    //ei kane component ta k Component kore newa hoice and PrivateRoute e component chara baki ja ja props ace sob {..rest} e destructure kore newa hoice__ ekn PrivateRoute e jei component ta props hisave patanu hocce jodi oi tar bitore abr alada props patanu lage tkn oi props gula k pawar jnno nicher line render props pattern use kora hoice... jate component ta te ja ja props takbe ta (props) => <Component {...props} /> ei rkm e pawa jai
    //ei kane {...rest} e exact path="/something" ei gula ace
    return currentUser ? (<Route {...rest}>
        {(props) => <Component {...props} />}
    </Route>) : (<Redirect to='/login' />)
};

export default PrivateRoute;