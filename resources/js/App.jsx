import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";
import Sider from "./components/Sider";
import Header from "./components/Header";
import GuestRoute from "./components/GuestRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./views/Login";
import Register from "./views/Register";
import Lists from "./views/Lists";
import Account from "./views/Account";
const { Content } = Layout;

const App = () => {
    const [sliderCollapsed, setSliderCollapsed] = useState(false);

    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider {...{ sliderCollapsed }} />

                <Layout className="site-layout">
                    <Header {...{ sliderCollapsed, setSliderCollapsed }} />

                    <Content style={{ padding: "50px" }}>
                        <Switch>
                            <GuestRoute path="/register" exact>
                                <Register />
                            </GuestRoute>

                            <GuestRoute path="/login" exact>
                                <Login />
                            </GuestRoute>

                            <PrivateRoute path="/lists">
                                <Lists />
                            </PrivateRoute>

                            <PrivateRoute path="/account" exact>
                                <Account />
                            </PrivateRoute>

                            <PrivateRoute path="/">
                                <Redirect to="/lists" />
                            </PrivateRoute>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
};

export default App;
