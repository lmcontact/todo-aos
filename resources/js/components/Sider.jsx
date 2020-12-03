import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import {
    LoginOutlined,
    UserAddOutlined,
    LogoutOutlined
} from "@ant-design/icons";
import { logout } from "../store/logoutSlice";
const { Sider: AntdSider } = Layout;

function Sider({ sliderCollapsed, dispatch }) {
    const history = useHistory();
    const [selectedKey, setSelectedKey] = useState("1");

    const handleLinkClick = (route, itemKey) => {
        history.push(route);
        setSelectedKey(itemKey);
    };

    const handleLogout = () => {
        dispatch(logout(history));
    };

    return (
        <AntdSider trigger={null} collapsible collapsed={sliderCollapsed}>
            <div style={{ height: "64px", width: "100%" }}></div>
            <Menu theme="dark" selectedKeys={[selectedKey]}>
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

                <Menu.Item
                    key="3"
                    icon={<LogoutOutlined />}
                    onClick={handleLogout}
                >
                    Se déconnecter
                </Menu.Item>
            </Menu>
        </AntdSider>
    );
}

export default connect()(Sider);
