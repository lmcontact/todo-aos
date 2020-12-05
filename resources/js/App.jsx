import React from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";
import Sider from "./components/Sider";
import GuestRoute from "./components/GuestRoute";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./views/Login";
import Register from "./views/Register";
import ListIndex from "./views/ListIndex";
import ListShow from "./views/ListShow";
const { Content, Header } = Layout;

const App = () => (
    <Router>
        <Layout style={{ minHeight: "100vh" }}>
            <Sider />

            <Layout className="site-layout">
                <Header style={{ backgroundColor: "white" }} />

                <Content style={{ padding: "50px" }}>
                    <Switch>
                        <GuestRoute path="/register" exact>
                            <Register />
                        </GuestRoute>

                        <GuestRoute path="/login" exact>
                            <Login />
                        </GuestRoute>

                        <PrivateRoute path="/lists/:id">
                            <ListShow />
                        </PrivateRoute>

                        <PrivateRoute path="/lists" exact>
                            <ListIndex />
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

export default App;
