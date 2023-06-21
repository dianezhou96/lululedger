import { Button, Empty, InputNumber, Space, Table } from "antd";
import { ColumnType } from "antd/es/table";
import React, { useState } from "react";
import { Cart } from "../../types";
import { getPrice, getPriceString } from "../utils";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

type RecordType = {
  key: number;
  product: React.JSX.Element;
  color: string | null;
  size: string | null;
  price: number;
  quantity: number;
  totalPrice: number;
};

interface CartTableProps {
  cart: Cart;
  setCartDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CartTable: React.FC<CartTableProps> = ({ cart, setCartDirty }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const dataSource: RecordType[] = cart.cart_items.map((cartItem) => {
    const product = cartItem.item.product;
    const productElement = product.link ? (
      <a href={product.link} target="_blank">
        {product.name}
      </a>
    ) : (
      <span>{product.name}</span>
    );
    const price = getPrice(product);
    return {
      key: cartItem.id,
      product: productElement,
      color: cartItem.item.color,
      size: cartItem.item.size,
      price: price,
      quantity: cartItem.quantity,
      totalPrice: price * cartItem.quantity,
    };
  });

  const [tableData, setTableData] = useState(dataSource);

  const onInputChange = (key, index) => (value: number | null) => {
    const newData = [...dataSource];
    newData[index][key] = value;
    updateTotalPrice(newData, index);
    setTableData(newData);
  };

  const updateTotalPrice = (data, index) => {
    data[index]["totalPrice"] = data[index]["quantity"] * data[index]["price"];
  };

  const columns: ColumnType<RecordType>[] = [
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Color/Style",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Unit Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (price > 0 ? getPriceString(price) : ""),
      align: "right",
    },
    {
      title: "Qty",
      dataIndex: "quantity",
      key: "qty",
      align: "right",
      render: (value, _, index) =>
        editMode ? (
          <InputNumber
            style={{ width: "4em" }}
            value={value}
            onChange={onInputChange("quantity", index)}
          />
        ) : (
          value
        ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => getPriceString(price, 2),
      align: "right",
    },
  ];

  const deleteCart = async (cartId) => {
    await fetch(`/shop/carts/${cartId}`, {
      method: "DELETE",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    });
  };

  const handleDeleteOrder = async () => {
    await deleteCart(cart.id);
    setCartDirty(true);
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

  const updateItemsAll = async () => {
    for (const { key, quantity } of tableData) {
      await updateItem(key, quantity);
    }
    setCartDirty(true);
    setLoading(false);
  };

  const handleSubmitOrder = () => {
    setLoading(true);
    updateItemsAll();
  };

  const handleCancel = () => {
    setTableData(dataSource);
    setEditMode(false);
  };

  return (
    <Table
      dataSource={tableData}
      loading={loading}
      title={() => (
        <span style={{ fontSize: 18 }}>
          <b>{cart.name}</b>
        </span>
      )}
      columns={columns}
      pagination={false}
      style={{
        borderBottom: "1px #dce0e6 solid",
      }}
      locale={{
        emptyText: (
          <Empty description={"Order is empty. Add items from the shop!"} />
        ),
      }}
      footer={() =>
        editMode ? (
          <Space>
            <Button type="primary" onClick={handleSubmitOrder}>
              Save
            </Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        ) : (
          <Space>
            {tableData.length > 0 && (
              <Button onClick={() => setEditMode(true)}>
                <EditTwoTone /> Edit this order
              </Button>
            )}
            <Button danger onClick={handleDeleteOrder}>
              <DeleteTwoTone twoToneColor="red" /> Delete
            </Button>
          </Space>
        )
      }
      summary={(data) => {
        let totalQty = 0;
        let subtotal = 0;
        data.forEach(({ quantity, totalPrice }) => {
          totalQty += quantity;
          subtotal += totalPrice;
        });
        const fee = subtotal * 0.1;
        const totalDue = subtotal + fee;
        return totalQty ? (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={4} align="right" />
              <Table.Summary.Cell index={1} align="right">
                <b>{totalQty}</b>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} align="right">
                <b>{getPriceString(subtotal, 2)}</b>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={5} align="right">
                Estimated tax + shipping (10%)
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                {getPriceString(fee, 2)}
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={5} align="right">
                <u>
                  <b>Estimated total due</b>
                </u>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <u>
                  <b>{getPriceString(totalDue, 2)}</b>
                </u>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        ) : (
          <></>
        );
      }}
    />
  );
};
