import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import {
  HashRouter as Router,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import { Layout, theme } from "antd";
import { Home } from "./Home";
import { Shop } from "./Shop";
import { Orders } from "./Orders";
import { CartSelector } from "./CartSelector";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Account } from "./Account";
import { Cart } from "../../types";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [carts, setCarts] = useState<Cart[]>([]);

  return (
    <Router>
      <div className="App">
        <Layout>
          <Sider breakpoint="lg" collapsedWidth="0" width="12rem">
            <h2
              style={{ color: "#f5f5f5", textAlign: "center" }}
              className="logo"
            >
              lululedger
            </h2>
            <Nav />
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 20,
                background: colorBgContainer,
                display: "flex",
                alignItems: "center",
                borderBottom: "solid #f5f5f5",
              }}
            >
              <h2 style={{ lineHeight: "1.2em" }}>
                SFIT x Lululemon Fundraiser June 2023
              </h2>
              <ShoppingCartOutlined
                style={{ fontSize: "2em", marginLeft: "auto", marginRight: 5 }}
              />
              <CartSelector carts={carts} setCarts={setCarts} />
            </Header>
            <Content style={{}}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/shop"
                  element={<Shop carts={carts} setCarts={setCarts} />}
                />
                <Route path="/orders" element={<Orders carts={carts} />} />
                <Route path="/account" element={<Account />} />
              </Routes>
            </Content>
            <Footer
              style={{
                textAlign: "center",
                zIndex: "2",
              }}
            >
              San Francisco Ice Theatre ©{new Date().getFullYear()}
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
