"use client";
import {
  AppstoreOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, theme } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Footer, Sider, Content } = Layout;
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: any
  ): MenuItem {
    return {
      label,
      key,
      icon,
      children,
      onClick,
    } as MenuItem;
  }
  const [current, setCurrent] = useState("users");

  const items: MenuItem[] = [
    getItem(<Link href="/users">Users</Link>, "users", <UserOutlined />),
    getItem(<Link href="/blogs">Blogs</Link>, "blogs", <CalendarOutlined />),
    getItem("Navigation Two", "sub1", <AppstoreOutlined />, [
      getItem(<Link href="/contact">Contacts</Link>, "contact"),
      getItem("Option 4", "4"),
      getItem("Submenu", "sub1-2", null, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6"),
      ]),
    ]),
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const pathname = usePathname();
  const param = pathname.split("/");

  useEffect(() => {
    console.log({ pathname, param });
    setCurrent(param[1]);
  }, [pathname, param]);

  return (
    <section>
      <Layout hasSider>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          style={{
            height: "100vh",
          }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            style={{ width: 200, height: "100vh" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            selectedKeys={[current]}
            onClick={onClick}
          />
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </section>
  );
}
