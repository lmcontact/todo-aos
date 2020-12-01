import React from "react";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
const { Header: AntdHeader } = Layout;

const Header = ({ setSliderCollapsed, sliderCollapsed }) => (
    <AntdHeader style={{ backgroundColor: "white" }}>
        {React.createElement(
            sliderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
                className: "trigger",
                onClick: () => setSliderCollapsed(!sliderCollapsed)
            }
        )}
    </AntdHeader>
);

export default Header;
