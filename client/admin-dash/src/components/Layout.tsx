import React, { useState, useEffect } from "react";
import { Layout, Input, Space, Switch, notification } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Siderbar";
import { SearchOutlined, BulbOutlined, BellOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [placeholder, setPlaceholder] = useState("Search");
  const location = useLocation()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const showNotification = () => {
    notification.open({
      message: "Fake Notification",
      description: "This feature still on development",
    });
  };

  const isSearchVisible =
    location.pathname === "/books" || location.pathname === "/members";

  useEffect(() => {
    if (location.pathname === "/books") {
      setPlaceholder("Search book");
    } else if (location.pathname === "/members") {
      setPlaceholder("Search member");
    }
  }, [location.pathname]);
  
  return (
    <Layout className={`sidebar-layout ${darkMode ? "dark" : ""}`}>
      <Sidebar />
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1.5em",
            background: "transparent",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ display: "flex" }}>
            <p style={{ fontWeight: "bold" }}>
              Welcome back, <span style={{ fontWeight: "normal" }}>Admin!</span>
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {isSearchVisible && (
              <Space>
                <Input
                  allowClear
                  placeholder={placeholder}
                  suffix={<SearchOutlined />}
                  style={{ width: "300px", marginRight: "16px" }}
                />
              </Space>
            )}
            <BellOutlined
              style={{
                fontSize: "20px",
                cursor: "pointer",
                marginRight: "16px",
              }}
              onClick={showNotification}
            />
            <Switch
              checkedChildren={<BulbOutlined />}
              unCheckedChildren={<BulbOutlined />}
              onChange={toggleDarkMode}
              checked={darkMode}
            />
          </div>
        </Header>

        <Content style={{ margin: "1em 1.5em" }}>
          <Outlet />
        </Content>

        <Footer
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 1.5em",
            background: "transparent",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
            height: "48px",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
