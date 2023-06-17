import {
  UnorderedListOutlined,
  ShoppingCartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useLocation, useSearchParams } from "react-router-dom";

export default function Nav() {
  const hrefs = window.location.href.split("/"); // get the current browser URL
  const [href, setHref] = useState("/" + hrefs[3]); // keep this in a state
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setHref(location.pathname); // whenever react-router updates browser URL, update href
  }, [location]);
  return (
    // use href to highlight selected Menu.Item with selectedKeys
    <Menu theme="dark" mode="inline" selectedKeys={[href]}>
      <Menu.Item key="/shop" icon={React.createElement(ShoppingCartOutlined)}>
        <span>Shop</span>
        <Link
          to={"/shop"}
          onClick={(e) => {
            e.preventDefault();
            navigate({
              pathname: "/shop",
              search: location.search,
            });
          }}
        />
      </Menu.Item>
      <Menu.Item
        key="/orders"
        icon={React.createElement(UnorderedListOutlined)}
      >
        <span>Orders</span>
        <Link
          to={"/orders"}
          onClick={(e) => {
            e.preventDefault();
            navigate({
              pathname: "/orders",
              search: location.search,
            });
          }}
        />
      </Menu.Item>
      <Menu.Item key="/account" icon={React.createElement(SettingOutlined)}>
        <span>Account</span>
        <Link
          to={"/account"}
          onClick={(e) => {
            e.preventDefault();
            const credential = searchParams.get("credential");
            const newSearchParams: any = credential
              ? { credential: credential }
              : {};
            setSearchParams(newSearchParams, { replace: true });
            navigate({
              pathname: "/account",
              search: credential ? `?credential=${credential}` : "",
            });
          }}
        />
      </Menu.Item>
    </Menu>
  );
}
