import React, { useState } from "react";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import Link from "next/link";
import { connect } from "react-redux";
import { setData } from "./store";

const { Header, Sider, Content } = Layout;

const LayoutWrapper = props => {
  const [current, setCurrent] = useState(
    props.router.pathname.replace("/", "")
  );

  props.
    setData([
      {
        key: "_tnpz9ahh3",
        amount: -10.9,
        subject: "PAGAMENTO CARTA",
        description:
          "Operazione Mastercard del 19/07/2019 alle ore 00:00 con Carta xxxxxxxxxxxx4418 Div=EUR Importo in divisa=10.9 / Importo in Euro=10.9 presso AMZN Mktp IT*MH55593U4",
        date: "19/07/2019",
        tags: [],
      },
      {
        key: "_nmqd9u74a",
        amount: -64.28,
        subject: "PAGAMENTO CARTA",
        description:
          "Operazione Mastercard del 18/07/2019 alle ore 15:33 con Carta xxxxxxxxxxxx4418 Div=EUR Importo in divisa=64.28 / Importo in Euro=64.28 presso SUPERMERCATO IPERCOOP - Transazione C-less",
        date: "18/07/2019",
        tags: [],
      },
    ])

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

const mapDispatchToProps = { setData }

export default connect(
  null,
  mapDispatchToProps
)(LayoutWrapper);
