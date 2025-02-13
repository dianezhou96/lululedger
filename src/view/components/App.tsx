import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import Nav from "./Nav";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
  redirect,
} from "react-router-dom";
import { Layout, Grid, theme } from "antd";
import { Shop } from "./Shop";
import { Orders } from "./Orders";
import { ShoppingTwoTone } from "@ant-design/icons";
import { Account } from "./Account";
import { Cart, ShopConfig } from "../../types";
import { fetchCarts } from "../utils";
import { CartSelector } from "./CartSelector";
import { Spin } from "antd";
import { SignUpButton } from "./SignUpButton";
import { FAQ } from "./FAQ";
import { InventoryForm } from "./InventoryForm";
import { ShopConfigContext } from "../contexts/ShopConfigContext";

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

export interface CartProps {
  carts: Cart[];
  cartSelected: string | null;
  cartDirty: boolean;
  setCartDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

interface NavWrapperProps {
  to: string;
}

const NavWrapper: React.FC<NavWrapperProps> = (props: NavWrapperProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const to = props ? (props.to ? props.to : "/") : "/";
  useEffect(() => {
    // redirect(to);
    navigate(to);
    navigate(0); // seems hacky, https://stackoverflow.com/questions/68825965/react-router-v6-usenavigate-doesnt-navigate-if-replacing-last-element-in-path
  }, []);
  return <></>;
};

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [shopConfig, setShopConfig] = useState<ShopConfig | null>(null);

  const getShopConfig = async () => {
    try {
      const response = await fetch("/shop/config");
      if (response.ok) {
        const config = await response.json();
        setShopConfig(config);
      }
    } catch (error) {
      console.error("Failed to fetch shop configuration:", error);
    }
  };

  useEffect(() => {
    getShopConfig();
  }, []);

  const credential = useMemo(
    () => searchParams.get("credential"),
    [searchParams]
  );
  const [carts, setCarts] = useState<Cart[]>([]);
  const [cartSelected, setCartSelected] = useState(searchParams.get("cart"));
  const [cartDirty, setCartDirty] = useState(true);
  const [cartItemCount, setCartItemCount] = useState<number>();

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
    } else {
      setCarts([]);
    }
    setCartDirty(false);
  };

  // Update carts
  useEffect(() => {
    getCarts();
  }, [credential, cartDirty]);

  // Update cart selected
  useEffect(() => {
    // TODO: Only update cartSelected if it's one of the carts the buyer has.
    // if (
    //   carts.find(
    //     (cart) => cart.id.toString() === searchParams.get("cart") ?? ""
    //   )
    // )
    //   setCartSelected(searchParams.get("cart"));
    // else {
    //   setCartSelected(null);
    //   searchParams.delete("cart");
    //   setSearchParams(searchParams);
    // }
    setCartSelected(searchParams.get("cart"));
  }, [searchParams]);

  // Update number of items in selected cart
  useEffect(() => {
    if (carts.length && cartSelected) {
      const cart = carts.find((x) => x.id === parseInt(cartSelected));
      const total_items = cart?.cart_items.reduce(
        (total, n) => total + n.quantity,
        0
      );
      setCartItemCount(total_items ? total_items : 0);
    } else setCartItemCount(undefined);
  }, [carts, cartSelected]);

  const screens = useBreakpoint();
  const [siderCollapsed, setSiderCollapsed] = useState(true);
  const handleMenuClick = () => {
    if ((screens.xs || screens.sm || screens.md) && !screens.lg)
      setSiderCollapsed(true);
    else setSiderCollapsed(false);
  };

  return (
    <ShopConfigContext.Provider value={shopConfig}>
      <div className="App">
        <Layout>
          <Sider
            className="custom-sider"
            breakpoint="lg"
            collapsedWidth="0"
            width="12rem"
            collapsed={siderCollapsed}
            onCollapse={setSiderCollapsed}
            style={{ zIndex: 99 }}
          >
            <h2
              style={{ color: "#f5f5f5", textAlign: "center" }}
              className="logo"
            >
              lululedger
            </h2>
            <Nav handleMenuClick={handleMenuClick} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "auto",
              }}
            >
              <a
                href="https://scsf.org/san-francisco-ice-theatre/"
                target="_blank"
              >
                <img src="http://luludb.dianeyz.me/uploads/thumbnail_FINAL_SFIT_logo_with_blades_75837400af.PNG" />
              </a>
            </div>
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
              <h2
                className="shop-name"
                id="shop-name"
                style={{ lineHeight: "1.2em" }}
              >
                {shopConfig?.name}
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
              {credential ? <CartSelector {...cartProps} /> : <SignUpButton />}
            </Header>
            <Content style={{}}>
              <Routes>
                <Route
                  path="/"
                  element={<NavWrapper to={"/shop"}></NavWrapper>}
                />
                <Route path="/shop" element={<Shop {...cartProps} />} />
                <Route path="/orders" element={<Orders {...cartProps} />} />
                <Route path="/account" element={<Account />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/inventory" element={<InventoryForm />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </div>
    </ShopConfigContext.Provider>
  );
};

export default App;
