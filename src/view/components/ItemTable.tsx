import Table, { ColumnType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
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
import { Loading } from "./Loading";

type RecordType = {
  key: number;
  name: string;
  price: number;
  quantity: number;
  items: SubRecordType[];
};

type SubRecordType = {
  key: number;
  color: string | null;
  size: string | null;
  quantity: number;
};

export const ItemTable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState<ProductCategoryWithQtys[]>();
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    const items = await fetch("/admin/items", {
      method: "GET",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    setItems(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const dataSources: RecordType[][] =
    items?.map((category) =>
      (defaultProductSort(category.products) as ProductWithQtys[]).map(
        (product) => ({
          key: product.id,
          name: product.name,
          price: getPrice(product),
          quantity: getProductQuantity(product),
          items: (defaultItemSort(product.items) as ItemWithQty[]).map(
            (item) => ({
              key: item.id,
              color: item.color,
              size: item.size,
              quantity: getItemQuantity(item),
            })
          ),
        })
      )
    ) ?? [];

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

  type SubRecordType = {
    key: number;
    color: string | null;
    size: string | null;
    quantity: number;
  };

  const productItemsRender = (row: RecordType) => {
    const columns: ColumnType<SubRecordType>[] = [
      { title: "Color/Style", dataIndex: "color", key: "color" },
      { title: "Size", dataIndex: "size", key: "size" },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
    ];
    return (
      <Table columns={columns} dataSource={row.items} pagination={false} />
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      {dataSources.map((dataSource) => (
        <Table
          className="buyers-table"
          dataSource={dataSource}
          loading={loading}
          columns={columns}
          pagination={false}
          expandable={{ expandedRowRender: productItemsRender }}
        />
      ))}
    </>
  );
};
