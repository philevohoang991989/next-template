"use client";
import {
  AppstoreOutlined,
  MailOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";


const items: MenuProps["items"] = [
  {
    label: <Link href={"/users"}>Manage Users</Link>,
    key: "users",
    icon: <MailOutlined />,
  },
  {
    label: <Link href={"/blogs"}>Manage Blogs</Link>,
    key: "blogs",
    icon: <AppstoreOutlined />,
  },
];

const Header: React.FC = () => {
  const [current, setCurrent] = useState("users");
  const pathname = usePathname();
  const param = pathname.split("/");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  useEffect(() => {
    console.log({ pathname, param });
    setCurrent(param[1]);
  }, [pathname, param]);

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
