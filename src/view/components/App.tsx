import React, { useEffect, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Button, Layout, theme } from "antd";
import { Home } from "./Home";
import { Shop } from "./Shop";
import { Orders } from "./Orders";
import { ShoppingTwoTone } from "@ant-design/icons";
import { Account } from "./Account";
import { Cart } from "../../types";
import { fetchCarts } from "../utils";
import { CartSelector } from "./CartSelector";
import { Spin } from "antd";

const { Header, Content, Footer, Sider } = Layout;

export interface CartProps {
  carts: Cart[];
  cartSelected: string | null;
  cartDirty: boolean;
  setCartDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const credential = searchParams.get("credential");
  const [carts, setCarts] = useState<Cart[]>([]);
  const [cartSelected, setCartSelected] = useState(searchParams.get("cart"));
  const [cartDirty, setCartDirty] = useState(true);
  const [cartItemCount, setCartItemCount] = useState(0);

  const cartProps: CartProps = {
    carts,
    cartSelected,
    cartDirty,
    setCartDirty,
  };

  const getCarts = async () => {
    if (credential) {
      const response = await fetchCarts(credential);
      const carts: Cart[] = response.ok ? await response.json() : [];
      setCarts(carts);
      setCartDirty(false);
    }
  };

  useEffect(() => {
    if (carts.length && cartSelected) {
      const cart = carts.find((x) => x.id === parseInt(cartSelected));
      const total_items = cart?.cart_items.reduce(
        (total, n) => total + n.quantity,
        0
      );
      setCartItemCount(total_items ? total_items : 0);
    }
  }, [carts, cartSelected]);

  useEffect(() => {
    getCarts();
  }, [credential, cartDirty]);

  useEffect(() => {
    setCartSelected(searchParams.get("cart"));
  }, [searchParams]);

  return (
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
            <div
              style={{
                display: "flex",
                marginLeft: "auto",
                marginRight: 5,
                position: "relative",
              }}
            >
              <ShoppingTwoTone
                style={{ fontSize: "2.5em" }}
                onClick={() =>
                  navigate({
                    pathname: "/orders",
                    search: location.search,
                  })
                }
              />
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  pointerEvents: "none",
                  top: "0.3rem",
                  fontSize: "0.75rem",
                }}
              >
                {cartDirty ? (
                  <Spin size="small" style={{ transform: "scale(0.75)" }} />
                ) : (
                  cartItemCount
                )}
              </div>
            </div>
            {credential ? (
              <CartSelector {...cartProps} />
            ) : (
              <Button>
                <Link to="/account">Sign up to order!</Link>
              </Button>
            )}
          </Header>
          <Content style={{}}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop {...cartProps} />} />
              <Route path="/orders" element={<Orders {...cartProps} />} />
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
  );
};

export default App;
