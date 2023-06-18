import { Button, Empty, Table } from "antd";
import { ColumnType } from "antd/es/table";
import React from "react";
import { Cart } from "../../types";
import { getPrice, getPriceString } from "../utils";
import { DeleteTwoTone } from "@ant-design/icons";
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
  const [searchParams] = useSearchParams();

  const dataSource: RecordType[] = cart.cart_items.map((cartItem, idx) => {
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
      key: idx,
      product: productElement,
      color: cartItem.item.color,
      size: cartItem.item.size,
      price: price,
      quantity: cartItem.quantity,
      totalPrice: price * cartItem.quantity,
    };
  });

  const columns: ColumnType<RecordType>[] = ["Product", "Color", "Size"].map(
    (title) => ({
      title: title,
      dataIndex: title.toLowerCase(),
      key: title.toLowerCase(),
    })
  );
  columns.push({
    title: "Unit Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => (price > 0 ? getPriceString(price) : ""),
    align: "right",
  });
  columns.push({
    title: "Qty",
    dataIndex: "quantity",
    key: "qty",
    align: "right",
  });
  columns.push({
    title: "Total Price",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (price: number) => getPriceString(price, 2),
    align: "right",
  });

  const deleteCart = async (cartId) => {
    await fetch(`/shop/carts/${cartId}`, {
      method: "DELETE",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    });
  };

  const handleDeleteOrder = () => {
    deleteCart(cart.id);
    setCartDirty(true);
  };

  return (
    <Table
      dataSource={dataSource}
      caption={<h2>{cart.name}</h2>}
      columns={columns}
      pagination={false}
      locale={{
        emptyText: (
          <Empty description={"Order is empty. Add items from the shop!"} />
        ),
      }}
      footer={() => (
        <Button danger onClick={handleDeleteOrder}>
          <DeleteTwoTone twoToneColor="red" /> Delete this order
        </Button>
      )}
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
