import Table, { ColumnType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BuyerCarts, SkaterTeam, SKATER_TEAMS } from "../../types";
import {
  getPriceLuluByBuyer,
  getPriceString,
  getTotalLuluByBuyer,
} from "../utils";

type RecordType = {
  key: number;
  name: string;
  email: string;
  skaterName: string;
  skaterTeam: SkaterTeam;
  totalItems: number;
  cartsSubmitted: number;
  cartsUnsubmitted: number;
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
        totalItems: getTotalLuluByBuyer(buyer),
        cartsSubmitted: buyer.carts.filter((cart) => cart.submitted).length,
        cartsUnsubmitted: buyer.carts.filter((cart) => !cart.submitted).length,
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
      title: "Qty Lululemon",
      dataIndex: "totalItems",
      key: "totalItems",
    },
    {
      title: "Carts Submitted",
      dataIndex: "cartsSubmitted",
      key: "cartsSubmitted",
    },
    {
      title: "Carts Unsubmitted",
      dataIndex: "cartsUnsubmitted",
      key: "cartsUnsubmitted",
    },
  ];

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
      />
    </>
  );
};
