import {
  Button,
  Empty,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnType } from "antd/es/table";
import React, { useState } from "react";
import { Cart, ProductMetadata } from "../../types";
import { getPrice, getPriceString, groupAndSortCartItems } from "../utils";
import {
  DeleteTwoTone,
  EditTwoTone,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CLOSED, DEADLINE } from "../../constants";

type RecordType = {
  key: number;
  product: ProductMetadata;
  color: string | null;
  size: string | null;
  price: number;
  quantity: number;
  status: string | null;
  totalPrice: number;
};

interface CartTableProps {
  cart: Cart;
  setCartDirty: React.Dispatch<React.SetStateAction<boolean>>;
  editable?: boolean;
}

export const CartTable: React.FC<CartTableProps> = ({
  cart,
  setCartDirty,
  editable = true,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const dataSource: RecordType[] = groupAndSortCartItems(cart).map(
    (cartItem) => {
      const product = cartItem.item.product;
      const price = getPrice(product);
      return {
        key: cartItem.id,
        product: product,
        color: cartItem.item.color,
        size: cartItem.item.size,
        price: price,
        quantity: cartItem.status === "Out of stock" ? 0 : cartItem.quantity,
        status: cartItem.status,
        totalPrice:
          cartItem.status === "Out of stock" ? 0 : price * cartItem.quantity,
      };
    }
  );

  const [tableData, setTableData] = useState(dataSource);

  const onInputChange = (key, index) => (value: number | null) => {
    const newData = [...tableData];
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
      render: (product: ProductMetadata) => product.name,
    },
    {
      title: "Color/Style",
      dataIndex: "color",
      key: "color",
      render: (color: string) => color ?? "--",
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
      render: (size: string) => size ?? "--",
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
  if (!editable)
    columns.push({
      title: "Status",
      dataIndex: "status",
      key: "status",
    });

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

  const updateItemsAll = async () => {
    for (const { key, quantity } of tableData) {
      await updateItem(key, quantity);
    }
    setCartDirty(true);
    setLoading(false);
  };

  const handleSaveOrder = () => {
    setLoading(true);
    updateItemsAll();
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

  const handleCancel = () => {
    setTableData(dataSource);
    setEditMode(false);
  };

  const confirmationDescription = (
    <div
      style={{
        maxWidth: 500,
      }}
      className="confirmation-description"
    >
      <p>By submitting this order, you acknowledge that:</p>
      <ul style={{ paddingLeft: "1em" }}>
        <li>
          <b>
            SFIT does not guarantee that all items in your order can be
            fulfilled.
          </b>{" "}
          Item availability depends on stock quantity and eligibility for
          discount with Lululemon. You will be charged only for items that are
          fulfilled.
        </li>
        <li>
          All items purchased through this fundraiser are <b>non-refundable</b>{" "}
          and <b>non-exchangeable</b>.
        </li>
        <li>
          We will collect payment from you after we place our aggregate order.
          You agree to pay the full amount due for this order (which may differ
          slightly from the estimated total stated) via <b>PayPal</b> or{" "}
          <b>Venmo</b>, or arrange another payment method with an SFIT team
          manager.
        </li>
        <li>
          <b>
            Items will be shipped to SFIT and distributed via SFIT team members.
          </b>{" "}
          You will need to pick up the items from an SFIT team manager or team
          member.
        </li>
      </ul>
    </div>
  );

  return (
    <Table
      className="cart-table"
      dataSource={tableData}
      loading={loading}
      title={() => (
        <div style={{ fontSize: 18 }}>
          <b>{cart.name}</b>
          <br />
          {cart.submitted && !editMode ? (
            <Tag icon={<CheckCircleOutlined />} color="success">
              Submitted
            </Tag>
          ) : CLOSED ? (
            <Tag icon={<MinusCircleOutlined />} color="default">
              Canceled
            </Tag>
          ) : (
            <Tag icon={<ClockCircleOutlined />} color="default">
              Pending submission
            </Tag>
          )}
        </div>
      )}
      // rowClassName={(record) =>
      //   record.status === "Out of stock"
      //     ? "red"
      //     : record.status === "Replacement"
      //     ? "green"
      //     : ""
      // }
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
            {cart.submitted ? (
              <Popconfirm
                title={`Submit order for ${cart.name}`}
                description={confirmationDescription}
                onConfirm={handleSaveOrder}
                okText="Confirm"
                icon={<InfoCircleOutlined style={{ color: "#007bff" }} />}
              >
                <Button type="primary">Save and submit</Button>
              </Popconfirm>
            ) : (
              <Button type="primary" onClick={handleSaveOrder}>
                Save
              </Button>
            )}
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        ) : editable && !CLOSED ? (
          <Space direction="vertical">
            {tableData.length > 0 &&
              (cart.submitted
                ? `Order for ${cart.name} has been submitted! You may still edit this order until the deadline (${DEADLINE}).`
                : `Click "Submit this order!" to confirm selections for ${cart.name}. After submission, you may still edit this order until the deadline (${DEADLINE}).`)}
            <Space>
              {tableData.length > 0 && !cart.submitted && (
                <Popconfirm
                  title={`Submit order for ${cart.name}`}
                  description={confirmationDescription}
                  onConfirm={handleSubmitOrder}
                  okText="Confirm"
                  icon={<InfoCircleOutlined style={{ color: "#007bff" }} />}
                >
                  <Button type="primary">Submit this order!</Button>
                </Popconfirm>
              )}
              {tableData.length > 0 && (
                <Button onClick={() => setEditMode(true)}>
                  <EditTwoTone /> Edit
                </Button>
              )}
              {tableData.length === 0 && (
                <Button
                  onClick={() => {
                    searchParams.set("cart", cart.id.toString());
                    navigate({
                      pathname: "/shop",
                      search: searchParams.toString(),
                    });
                  }}
                >
                  <b>Go to shop</b>
                </Button>
              )}
              <Popconfirm
                title="Delete order"
                description={`Confirm deleting order for ${cart.name}?`}
                onConfirm={handleDeleteOrder}
                okText="Yes, delete"
                icon={<WarningOutlined style={{ color: "red" }} />}
              >
                <Button danger>
                  <DeleteTwoTone twoToneColor="red" /> Delete
                  {tableData.length === 0 && " this order"}
                </Button>
              </Popconfirm>
            </Space>
          </Space>
        ) : (
          <></>
        )
      }
      summary={(data) => {
        let totalQty = 0;
        let subtotal = 0;
        let totalSavings = 0;
        data.forEach(({ product, quantity, totalPrice }) => {
          totalQty += quantity;
          subtotal += totalPrice;
          if (!product.price_actual && product.price_retail) {
            totalSavings += product.price_retail * quantity - totalPrice;
          }
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
                Estimated tax + shipping 10% (*subject to change)
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                {getPriceString(fee, 2)}*
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
                  <b>{getPriceString(totalDue, 2)}*</b>
                </u>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={5} align="right">
                <i style={{ color: "green" }}>
                  <b>Lululemon savings (40% off retail price)</b>
                </i>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1} align="right">
                <i style={{ color: "green" }}>
                  <b>{getPriceString(totalSavings, 2)}</b>
                </i>
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
