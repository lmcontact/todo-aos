import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined,
    OrderedListOutlined,
    SettingOutlined
} from "@ant-design/icons";
import { logout } from "../store/logoutSlice";
const { Sider: AntdSider } = Layout;

const Sider = ({ sliderCollapsed, dispatch, user }) => {
    const history = useHistory();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState("1");

    useEffect(() => {
        setSelectedKey(getInitialSelectedKey(location));
    });

    const handleLinkClick = (route, itemKey) => {
        history.push(route);
        setSelectedKey(itemKey);
    };

    const handleLogout = () => {
        dispatch(logout(history));
        setSelectedKey("1");
    };

    return (
        <AntdSider trigger={null} collapsible collapsed={sliderCollapsed}>
            <div style={{ height: "64px", width: "100%" }}></div>
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
                            icon={<SettingOutlined />}
                            onClick={() => handleLinkClick("/account", "4")}
                        >
                            Mon compte
                        </Menu.Item>

                        <Menu.Item
                            key="5"
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
    if (pathname === "/account") return "4";
}

const mapStateToProps = ({ user }) => ({
    user: user.value
});

export default connect(mapStateToProps)(Sider);
