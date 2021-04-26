import React, {Component} from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./Authenticate";

const PrivateRoute = ({ component :Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticate() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/singin"
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;