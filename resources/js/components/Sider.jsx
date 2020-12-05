import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu, Row, Grid } from "antd";
import {
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    OrderedListOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from "@ant-design/icons";
import { logout } from "../store/logoutSlice";
const { Sider: AntdSider } = Layout;

const Sider = ({ user, siderCollapsed, setSiderCollapsed, dispatch }) => {
    const history = useHistory();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1");
    const screens = Grid.useBreakpoint();

    useEffect(() => {
        setSelectedKey(getInitialSelectedKey(location));
    });

    const handleLinkClick = (route, itemKey) => {
        history.push(route);
        setSelectedKey(itemKey);
        if (!screens.md) {
            setSiderCollapsed(!siderCollapsed);
        }
    };

    const handleLogout = () => {
        dispatch(logout(history));
        setSelectedKey("1");
    };

    return (
        <AntdSider
            collapsible
            collapsed={siderCollapsed}
            onCollapse={() => setSiderCollapsed(!siderCollapsed)}
            width={screens.md ? 200 : "100%"}
            collapsedWidth={screens.md ? 80 : 0}
            trigger={null}
        >
            <Row
                style={{
                    height: "64px",
                    width: "100%",
                    padding: screens.md ? 0 : "0 2rem"
                }}
                justify={screens.md ? "center" : "space-between"}
                align="middle"
            >
                <h1
                    style={{
                        color: "white",
                        fontWeight: "600",
                        fontSize: "1.3rem",
                        display: siderCollapsed ? "none" : "block"
                    }}
                >
                    Todo List
                </h1>
                {!screens.md &&
                    React.createElement(
                        siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: "trigger",
                            onClick: () => setSiderCollapsed(!siderCollapsed),
                            style: {
                                color: "white",
                                fontSize: "1.3rem",
                                marginLeft: "1rem",
                                marginBottom: "0.5rem"
                            }
                        }
                    )}
            </Row>
            <Menu theme="dark" selectedKeys={[selectedKey]}>
                {user ? (
                    <>
                        <Menu.Item
                            key="3"
                            icon={<OrderedListOutlined />}
                            onClick={() => handleLinkClick("/lists", "3")}
                        >
                            Mes listes
                        </Menu.Item>

                        <Menu.Item
                            key="4"
                            icon={<LogoutOutlined />}
                            onClick={handleLogout}
                        >
                            Se déconnecter
                        </Menu.Item>
                    </>
                ) : (
                    <>
                        <Menu.Item
                            key="1"
                            icon={<LoginOutlined />}
                            onClick={() => handleLinkClick("/login", "1")}
                        >
                            Connexion
                        </Menu.Item>

                        <Menu.Item
                            key="2"
                            icon={<UserAddOutlined />}
                            onClick={() => handleLinkClick("/register", "2")}
                        >
                            Inscription
                        </Menu.Item>
                    </>
                )}
            </Menu>
        </AntdSider>
    );
};

function getInitialSelectedKey({ pathname }) {
    if (pathname === "/login") return "1";
    if (pathname === "/register") return "2";
    if (/\/lists.*/.test(pathname)) return "3";
}

const mapStateToProps = ({ user }, { siderCollapsed, setSiderCollapsed }) => ({
    user: user.value,
    siderCollapsed,
    setSiderCollapsed
});

export default connect(mapStateToProps)(Sider);
