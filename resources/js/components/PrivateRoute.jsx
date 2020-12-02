import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { fetchUser } from "../store/userSlice";

const PrivateRoute = ({ children, user, dispatch }) => {
    useEffect(() => dispatch(fetchUser()));

    return (
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
};

const mapStateToProps = ({ user }, { children }) => ({ user, children });

export default connect(mapStateToProps)(PrivateRoute);
