import React from "react";
import {Route, Redirect} from "react-router-dom";

export default function PublicRoute({component: Component, authed, login, register, ...rest}) {
    return (
        <Route {...rest}
                   render={(props) => authed !== true
                       ? <Component {...props} login={login} register={register}/>
                       : <Redirect to={{pathname: '/home', state: {from: props.location}}} />}
        />
    )
}
