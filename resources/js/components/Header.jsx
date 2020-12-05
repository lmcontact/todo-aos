import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header: AntdHeader } = Layout;

const Header = ({ setSiderCollapsed, siderCollapsed }) => (
    <AntdHeader style={{ backgroundColor: "white" }}>
        {React.createElement(
            siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
                className: "trigger",
                style: { fontSize: "1.3rem" },
                onClick: () => setSiderCollapsed(!siderCollapsed)
            }
        )}
    </AntdHeader>
);

export default Header;
