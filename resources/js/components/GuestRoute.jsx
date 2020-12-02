import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { Spin } from "antd";
import { fetchUser } from "../store/userSlice";

const GuestRoute = ({ children, user, loading, dispatch, ...rest }) => {
    useEffect(() => {
        if (!loading) {
            dispatch(fetchUser());
        }
    }, [children]);

    return loading ? (
        <Spin
            size="large"
            style={{ margin: "20vh auto 0 auto", display: "block" }}
        />
    ) : (
        <Route
            {...rest}
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

const mapStateToProps = ({ user }, { children, ...rest }) => ({
    user: user.value,
    loading: user.loading,
    children,
    ...rest
});

export default connect(mapStateToProps)(GuestRoute);
