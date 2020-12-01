import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
const { Sider: AntdSider } = Layout;

function Sider({ sliderCollapsed }) {
    const history = useHistory();
    const [selectedKey, setSelectedKey] = useState("1");

    const handleLinkClick = (route, itemKey) => {
        history.push(route);
        setSelectedKey(itemKey);
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
            </Menu>
        </AntdSider>
    );
}

export default Sider;
