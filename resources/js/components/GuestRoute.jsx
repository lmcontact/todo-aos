import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { fetchUser } from "../store/userSlice";

const GuestRoute = ({ children, user, dispatch }) => {
    useEffect(() => dispatch(fetchUser()));

    return (
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
};

const mapStateToProps = ({ user }, { children }) => ({ user, children });

export default connect(mapStateToProps)(GuestRoute);
