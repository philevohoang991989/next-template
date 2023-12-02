'use client'
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useParams } from 'next/navigation'


const items: MenuProps['items'] = [
  {
    label: <Link href={"/users"}>Manage Users</Link>,
    key: 'users',
    icon: <MailOutlined />,
  },
  {
    label: <Link href={"/blogs"}>Manage Blogs</Link>,
    key: 'blogs',
    icon: <AppstoreOutlined />,
  },
 
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState('users');
  const pathname = usePathname()
  const params = useParams();
  console.log({pathname, params});
  
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;