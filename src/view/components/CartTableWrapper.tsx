import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Cart } from "../../types";
import { CartTable } from "./CartTable";

interface CartTableWrapperProps {
  cart: Cart;
  setCartDirty: React.Dispatch<React.SetStateAction<boolean>>;
  editable?: boolean;
}

export const CartTableWrapper: React.FC<CartTableWrapperProps> = ({
  cart,
  setCartDirty,
  editable = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deleteCart = async () => {
    await fetch(`/shop/carts/${cart.id}`, {
      method: "DELETE",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    });
    setCartDirty(true);
  };

  const handleDeleteOrder = () => {
    deleteCart();
    searchParams.delete("cart");
    setSearchParams(searchParams);
  };

  const updateItem = async (cartItemId, quantity) => {
    if (quantity > 0) {
      await fetch(`/shop/cart-items/${cartItemId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: quantity }),
        headers: {
          "Content-Type": "application/json",
          Credential: searchParams.get("credential") ?? "",
        },
      });
    } else {
      await fetch(`/shop/cart-items/${cartItemId}`, {
        method: "DELETE",
        headers: {
          Credential: searchParams.get("credential") ?? "",
        },
      });
    }
  };

  const updateItemsAll = async (tableData) => {
    for (const { key, quantity } of tableData) {
      await updateItem(key, quantity);
    }
    setCartDirty(true);
    setLoading(false);
  };

  const handleSaveOrder = (tableData) => {
    setLoading(true);
    updateItemsAll(tableData);
  };

  const submitOrder = async () => {
    await fetch(`shop/carts/submit/${cart.id}`, {
      method: "PUT",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    });
    setCartDirty(true);
    setLoading(false);
  };

  const handleSubmitOrder = () => {
    setLoading(true);
    submitOrder();
  };

  const goToShop = () => {
    searchParams.set("cart", cart.id.toString());
    navigate({
      pathname: "/shop",
      search: searchParams.toString(),
    });
  };

  return (
    <CartTable
      cart={cart}
      handleDeleteOrder={handleDeleteOrder}
      handleSaveOrder={handleSaveOrder}
      handleSubmitOrder={handleSubmitOrder}
      goToShop={goToShop}
      loading={loading}
      editable={editable}
    />
  );
};
