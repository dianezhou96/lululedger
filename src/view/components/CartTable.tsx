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
import { Cart } from "../../types";
import { getPrice, getPriceString } from "../utils";
import {
  DeleteTwoTone,
  EditTwoTone,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();

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
      <ol style={{ paddingLeft: "1em" }}>
        <li>
          <b>
            SFIT does not guarantee that all items in your order will be
            fulfilled
          </b>{" "}
          as the order we place depends on each item's availability in stock and
          the eligibility for discount with Lululemon. You will be charged only
          for items that are fulfilled.
        </li>
        <li>
          All items purchased through this fundraiser are <b>non-refundable</b>{" "}
          and <b>non-exchangeable</b>.
        </li>
        <li>
          You agree to pay the full amount due for this order via <b>PayPal</b>{" "}
          or <b>Venmo</b>, or arrange another payment method with an SFIT team
          manager. The amount due may differ from the estimated total depending
          on final shipping costs.
        </li>
        <li>
          <b>
            Items will be shipped to SFIT and distributed via SFIT team members.
          </b>{" "}
          You will need to pick up the items from an SFIT team manager or team
          member.
        </li>
      </ol>
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
          ) : (
            <Tag icon={<ClockCircleOutlined />} color="default">
              Pending submission
            </Tag>
          )}
        </div>
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
        ) : (
          <Space direction="vertical">
            {tableData.length > 0 &&
              (cart.submitted
                ? `Order for ${cart.name} has been submitted! You may still edit this order until the deadline.`
                : `Click "Submit this order!" to confirm selections for ${cart.name}. After submission, you may still edit this order until the deadline.`)}
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
                  onClick={() =>
                    navigate({
                      pathname: "/shop",
                      search: location.search,
                    })
                  }
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
