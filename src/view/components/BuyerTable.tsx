import Table, { ColumnType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BuyerCarts, Cart, SkaterTeam, SKATER_TEAMS } from "../../types";
import {
  getPriceLuluByBuyer,
  getPriceString,
  getTotalLuluByBuyer,
  getTotalPriceByBuyer,
} from "../utils";
import { CartTable } from "./CartTable";

type RecordType = {
  key: number;
  name: string;
  email: string;
  skaterName: string;
  skaterTeam: SkaterTeam;
  totalPrice: number;
  totalItems: number;
  cartsSubmitted: number;
  cartsUnsubmitted: number;
  carts: Cart[];
};

export const BuyerTable: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [buyers, setBuyers] = useState<BuyerCarts[]>();
  const [loading, setLoading] = useState(true);

  const fetchBuyers = async () => {
    const buyers = await fetch("/admin/buyers", {
      method: "GET",
      headers: {
        Credential: searchParams.get("credential") ?? "",
      },
    }).then((data) => data.json());
    setBuyers(buyers);
    setLoading(false);
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  const dataSource: RecordType[] =
    buyers?.map((buyer) => {
      return {
        key: buyer.id,
        name: buyer.name,
        email: buyer.email,
        skaterName: buyer.skater_name,
        skaterTeam: buyer.skater_team,
        totalPrice: getTotalPriceByBuyer(buyer),
        totalItems: getTotalLuluByBuyer(buyer),
        cartsSubmitted: buyer.carts.filter((cart) => cart.submitted).length,
        cartsUnsubmitted: buyer.carts.filter((cart) => !cart.submitted).length,
        carts: buyer.carts,
      };
    }) ?? [];

  const columns: ColumnType<RecordType>[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Skater Name",
      dataIndex: "skaterName",
      key: "skaterName",
      sorter: (a, b) => a.skaterName.localeCompare(b.skaterName),
    },
    {
      title: "Skater Team",
      dataIndex: "skaterTeam",
      key: "skaterTeam",
      filters: SKATER_TEAMS.map((team) => ({
        text: team,
        value: team,
      })),
      onFilter: (value, record) => record.skaterTeam === value,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => getPriceString(value, 2),
    },
    {
      title: "Qty Lululemon",
      dataIndex: "totalItems",
      key: "totalItems",
    },
    {
      title: "Carts Submitted",
      dataIndex: "cartsSubmitted",
      key: "cartsSubmitted",
      filters: [
        {
          text: "=0",
          value: 0,
        },
        {
          text: ">0",
          value: 1,
        },
      ],
      onFilter: (value, record) =>
        value === 0 ? record.cartsSubmitted === 0 : record.cartsSubmitted > 0,
    },
    {
      title: "Carts Unsubmitted",
      dataIndex: "cartsUnsubmitted",
      key: "cartsUnsubmitted",
      filters: [
        {
          text: ">0",
          value: 0,
        },
      ],
      onFilter: (value, record) => record.cartsUnsubmitted > value,
    },
  ];

  const cartsRender = (row: RecordType) => {
    return (
      <>
        {row.carts.map((cart) => (
          <CartTable cart={cart} editable={false} setCartDirty={() => {}} />
        ))}
      </>
    );
  };

  const totalQtyLululemon =
    buyers?.reduce((total, buyer) => total + getTotalLuluByBuyer(buyer), 0) ??
    "...";

  const totalPriceLululemon =
    buyers?.reduce((total, buyer) => total + getPriceLuluByBuyer(buyer), 0) ??
    "...";

  return (
    <>
      <br />
      Total quantity of Lululemon: {totalQtyLululemon}
      <br />
      Total amount to collect for Lululemon: {totalPriceLululemon}
      <Table
        className="buyers-table"
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        expandable={{ expandedRowRender: cartsRender }}
      />
    </>
  );
};
