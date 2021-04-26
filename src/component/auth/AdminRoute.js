import React, {Component} from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticate } from "./Authenticate";

const AdminRoute = ({ component :Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            (isAuthenticate() && isAuthenticate().user.role ==1) ? (
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

export default AdminRoute;