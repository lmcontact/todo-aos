import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const GuestRoute = ({ children, user }) => (
    <Route
        render={({ location }) =>
            user ? (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }}
                />
            ) : (
                children
            )
        }
    />
);

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(GuestRoute);
