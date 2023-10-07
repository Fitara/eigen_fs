import React, { useState } from 'react';
import {
  BookOutlined,
  UserOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import Logo from "../assets/icons/logo-app.png";

const { Sider } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (path: string) => {
    navigate(path);
  };

  const items = [
    {
      key: '/books',
      label: 'Books',
      icon: <BookOutlined />,
    },
    {
      key: '/members',
      label: 'Members',
      icon: <UserOutlined />,
    },
    {
      key: '/histories',
      label: 'Histories',
      icon: <HistoryOutlined />,
    },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={((value: boolean) => setCollapsed(value))}
      className='sider'
      theme='light'
      width={180}
    >
      <div className='title-wrapper'>
        <div>
          <img
            src={Logo}
            alt="Sidebar Icon"
            className='title-logo'
          />
        </div>
        <div className={`title ${collapsed ? 'collapsed' : ''}`}>
          Eigen
        </div>
      </div>
      <div className='title-line'></div>
      <Menu
        theme='light'
        mode="inline"
        className='menu-wrapper'
        onClick={(e) => handleMenuClick(e.key as string)}
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
