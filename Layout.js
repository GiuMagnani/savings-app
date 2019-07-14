import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";

const { Header, Sider, Content } = Layout;

const LayoutWrapper = props => {
  const [current, setCurrent] = useState(
    props.router.pathname.replace("/", "")
  );

  return (
    <Layout>
      <Header>
        <div className="logo" />
        <Menu
          // onClick={this.handleClick}
          selectedKeys={[current]}
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}>
          <Menu.Item key="new">
            <Link href="/new">
              <a>
                <Icon type="user" />
                <span>Dashboard</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="budget">
            <Link href="/budget">
              <a>
                <Icon type="unordered-list" />
                <span>Budget</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="transactions">
            <Link href="/transactions">
              <a>
                <Icon type="ordered-list" />
                <span>Transactions</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="data">
            <Link href="/data">
              <a>
                <Icon type="file" />
                <span>Import/Export Data</span>
              </a>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: "#fff",
          minHeight: 280,
        }}>
        {props.children}
      </Content>
    </Layout>
  );
};

export default LayoutWrapper;
