import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Layout } from "antd";

import Login from "./views/Login";
import Register from "./views/Register";
import Sider from "./components/Sider";
import Header from "./components/Header";
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
                            <Route path="/register">
                                <Register />
                            </Route>

                            <Route path="/login">
                                <Login />
                            </Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
