import { Button, Dropdown, MenuProps } from "antd";
import Table, { ColumnType } from "antd/es/table";
import React from "react";
import {
  CartItemStatus,
  ItemWithQty,
  ProductCategoryWithQtys,
  ProductWithQtys,
} from "../../types";
import {
  defaultItemSort,
  defaultProductSort,
  getItemQuantity,
  getPrice,
  getPriceString,
  getProductQuantity,
} from "../utils";
import { SettingOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";

// Product
type RecordType = {
  key: number;
  name: string;
  price: number;
  quantity: number;
  items: SubRecordType[];
};

// Item
type SubRecordType = {
  key: number;
  id: number;
  color: string | null;
  size: string | null;
  quantity: number;
  notes: string | null;
  carts: SubSubRecordType[];
};

// Cart item
type SubSubRecordType = {
  key: number;
  buyerName: string;
  buyerEmail: string;
  cartName: string;
  quantity: number;
  status: CartItemStatus;
};

interface ItemTableProps {
  category: ProductCategoryWithQtys;
  refetch: () => void;
}

export const ItemTable: React.FC<ItemTableProps> = ({ category, refetch }) => {
  const [searchParams] = useSearchParams();
  const markOutOfStock = async (cartItemId: number) => {
    await fetch(`/admin/out-of-stock/${cartItemId}`, {
      method: "PUT",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    });
  };

  const dataSource: RecordType[] = (
    defaultProductSort(category.products) as ProductWithQtys[]
  ).map((product) => ({
    key: product.id,
    name: product.name,
    price: getPrice(product),
    quantity: getProductQuantity(product),
    items: (defaultItemSort(product.items) as ItemWithQty[]).map((item) => ({
      key: item.id,
      id: item.id,
      color: item.color,
      size: item.size,
      quantity: getItemQuantity(item),
      notes: item.notes,
      carts: item.cart_items
        .filter((cartItem) => cartItem.cart.submitted)
        .map((cartItem) => ({
          key: cartItem.id,
          buyerName: cartItem.buyer.name,
          buyerEmail: cartItem.buyer.email,
          cartName: cartItem.cart.name,
          cartId: cartItem.cart.id,
          quantity: cartItem.quantity,
          status: cartItem.status,
        })),
    })),
  }));

  const columns: ColumnType<RecordType>[] = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => getPriceString(value),
    },
  ];

  const productItemsRender = (row: RecordType) => {
    const columns: ColumnType<SubRecordType>[] = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Color/Style", dataIndex: "color", key: "color" },
      { title: "Size", dataIndex: "size", key: "size" },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        align: "right",
      },
      {
        title: "Notes",
        dataIndex: "notes",
        key: "notes",
        render: (value: string | null) =>
          value ? (
            <span style={{ color: "red" }}>{value}</span>
          ) : (
            <span>{value}</span>
          ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={row.items}
        pagination={false}
        expandable={{ expandedRowRender: itemCartsRender }}
      />
    );
  };

  const itemCartsRender = (row: SubRecordType) => {
    const columns: ColumnType<SubSubRecordType>[] = [
      { title: "Buyer", dataIndex: "buyerName", key: "buyerName" },
      { title: "Email", dataIndex: "buyerEmail", key: "buyerEmail" },
      { title: "Cart Name", dataIndex: "cartName", key: "cartName" },
      { title: "Cart ID", dataIndex: "cartId", key: "cartId" },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        align: "right",
        render: (value, record) =>
          record.status === "Out of stock" ? (
            <>
              <del>{value}</del>
            </>
          ) : (
            value
          ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (value: CartItemStatus, record: SubSubRecordType) => {
          const items: MenuProps["items"] = [];
          if (value === "Out of stock")
            items.push({
              label: 'Unmark "Out of stock"',
              key: 0,
              onClick: () => {
                record.quantity = 100;
                record.status = null;
              },
            });
          else if (!value)
            items.push({
              label: 'Mark "Out of stock"',
              key: 1,
              onClick: () => {
                markOutOfStock(record.key);
                refetch();
              },
            });
          return (
            <>
              {value}{" "}
              <Dropdown disabled={value === "Replacement"} menu={{ items }}>
                <Button size="small">
                  <SettingOutlined />
                </Button>
              </Dropdown>
            </>
          );
        },
      },
    ];
    return (
      <Table
        className="item-table"
        columns={columns}
        dataSource={row.carts}
        pagination={false}
        rowClassName={(record) =>
          record.status === "Out of stock"
            ? "red"
            : record.status === "Replacement"
            ? "green"
            : ""
        }
      />
    );
  };

  return (
    <Table
      className="buyers-table"
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      expandable={{ expandedRowRender: productItemsRender }}
    />
  );
};
