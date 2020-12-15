import React from 'react';
import {Route, Redirect} from "react-router-dom";

export default function PrivateRoute({component: Component, authed, toast, ...rest}) {
    return (
        <Route {...rest}
                   render={(props) => authed === true
                       ? <Component {...props} toast={toast} {...rest}/>
                       : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

