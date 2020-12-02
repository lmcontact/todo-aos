import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, user }) => (
    <Route
        render={({ location }) =>
            user ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                />
            )
        }
    />
);

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(PrivateRoute);
