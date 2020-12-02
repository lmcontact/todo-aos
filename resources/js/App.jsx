import React, { useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Layout } from "antd";
import Sider from "./components/Sider";
import Header from "./components/Header";
import GuestRoute from "./components/GuestRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
const { Content } = Layout;

function App() {
    const [sliderCollapsed, setSliderCollapsed] = useState(false);

    return (
        <Router>
            <Layout style={{ minHeight: "100vh" }}>
                <Sider {...{ sliderCollapsed }} />

                <Layout className="site-layout">
                    <Header {...{ sliderCollapsed, setSliderCollapsed }} />

                    <Content style={{ padding: "50px" }}>
                        <Switch>
                            <GuestRoute path="/register">
                                <Register />
                            </GuestRoute>

                            <GuestRoute path="/login">
                                <Login />
                            </GuestRoute>

                            <PrivateRoute path="/">
                                <Home />
                            </PrivateRoute>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
