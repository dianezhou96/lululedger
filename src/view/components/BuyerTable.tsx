import { Button, Popconfirm } from "antd";
import Table, { ColumnType } from "antd/es/table";
import React, { useContext, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { renderToString } from "react-dom/server";

import { BuyerCarts, Cart, SkaterTeam, SKATER_TEAMS } from "../../types";
import {
  copyToClipboard,
  getPriceLuluByBuyer,
  getPriceString,
  getTotalLuluByBuyer,
  getTotalOutByBuyer,
  getTotalPriceByBuyer,
} from "../utils";
import { CartTable } from "./CartTable";
import { useReactToPrint } from "react-to-print";
import { ShopConfigContext } from "../contexts/ShopConfigContext";

type RecordType = {
  key: number;
  name: string;
  email: string;
  skaterName: string;
  skaterTeam: SkaterTeam;
  totalPrice: number;
  totalItems: number;
  totalOut: number;
  cartsSubmitted: number;
  cartsUnsubmitted: number;
  carts: Cart[];
  isVolunteer: boolean;
};

interface BuyerTableProps {
  buyers: BuyerCarts[];
}

export const BuyerTable: React.FC<BuyerTableProps> = ({ buyers }) => {
  const [searchParams] = useSearchParams();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const shopConfig = useContext(ShopConfigContext);
  const hasSelected = selectedRowKeys.length > 0;

  const sendOrderReceivedEmail = async () => {
    await fetch("/admin/send-order-received-email", {
      method: "POST",
      body: JSON.stringify(
        buyers
          .filter((buyer) => selectedRowKeys.includes(buyer.id))
          .map((buyer) => ({
            name: buyer.name,
            email: buyer.email,
            magic_token: buyer.magic_token,
            skater: buyer.skater_name,
            team: buyer.skater_team,
          }))
      ),
      headers: {
        "Content-Type": "application/json",
        Credential: searchParams.get("credential") ?? "",
      },
    });
  };

  const sendInvoiceEmail = async () => {
    await fetch("/admin/send-invoice-email", {
      method: "POST",
      body: JSON.stringify(
        buyers
          .filter(
            (buyer) =>
              selectedRowKeys.includes(buyer.id) &&
              buyer.carts.filter((cart) => cart.submitted).length > 0
          )
          .map((buyer) => ({
            name: buyer.name,
            email: buyer.email,
            order: renderToString(
              <>
                {buyer.carts
                  .filter((cart) => cart.submitted)
                  .map((cart) => (
                    <CartTable
                      cart={cart}
                      showFulfilled
                      isVolunteer={buyer.volunteer ?? false}
                    />
                  ))}
              </>
            ),
            total: getPriceString(
              getTotalPriceByBuyer(buyer, shopConfig?.discount ?? 0.4),
              2
            ),
            skater: buyer.skater_name,
            team: buyer.skater_team,
          }))
      ),
      headers: {
        "Content-Type": "application/json",
        Credential: searchParams.get("credential") ?? "",
      },
    });
  };

  const copyEmailAddresses = async () => {
    const emailsStr = buyers
      .filter((buyer) => selectedRowKeys.includes(buyer.id))
      .map((buyer) => buyer.email)
      .join(",");
    copyToClipboard(emailsStr);
  };

  const dataSource: RecordType[] =
    buyers?.map((buyer) => {
      return {
        key: buyer.id,
        name: buyer.name,
        email: buyer.email,
        skaterName: buyer.skater_name,
        skaterTeam: buyer.skater_team,
        totalPrice: getTotalPriceByBuyer(buyer, shopConfig?.discount ?? 0.4),
        totalItems: getTotalLuluByBuyer(buyer),
        totalOut: getTotalOutByBuyer(buyer),
        cartsSubmitted: buyer.carts.filter((cart) => cart.submitted).length,
        cartsUnsubmitted: buyer.carts.filter((cart) => !cart.submitted).length,
        carts: buyer.carts,
        isVolunteer: buyer.volunteer ?? false,
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
      sorter: (a, b) => a.totalItems - b.totalItems,
    },
    {
      title: "Qty Not Fulfilled",
      dataIndex: "totalOut",
      key: "totalOut",
      sorter: (a, b) => a.totalOut - b.totalOut,
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

  const componentRef = useRef<any>();
  const SelectedCartTables = React.forwardRef<HTMLDivElement>((_, ref) => (
    <div ref={ref}>
      {selectedRowKeys
        .map((key) => buyers.find((buyer) => buyer.id === key))
        .filter((buyer): buyer is BuyerCarts => !!buyer)
        .map((buyer, buyerIdx) => {
          const carts = buyer.carts.filter((cart) => cart.submitted);
          return carts.map((cart, idx) => (
            <div
              style={{
                pageBreakBefore:
                  buyerIdx === 0 && idx === 0 ? "auto" : "always",
              }}
              key={idx}
            >
              <h3>
                {buyer.name} ({buyer.skater_name}, {buyer.skater_team} team) -
                Cart {idx + 1} of {carts.length}
              </h3>
              <CartTable cart={cart} isVolunteer={buyer.volunteer ?? false} />
            </div>
          ));
        })}
    </div>
  ));
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const cartsRender = (row: RecordType) => {
    return (
      <>
        {row.carts.map((cart, idx) => (
          <CartTable cart={cart} key={idx} isVolunteer={row.isVolunteer} />
        ))}
      </>
    );
  };

  const totalQtyLululemon =
    buyers?.reduce((total, buyer) => total + getTotalLuluByBuyer(buyer), 0) ??
    "...";

  const totalPriceLululemon =
    buyers?.reduce(
      (total, buyer) =>
        total + getPriceLuluByBuyer(buyer, shopConfig?.discount ?? 0.4),
      0
    ) ?? "...";

  return (
    <>
      <br />
      Total quantity of Lululemon: {totalQtyLululemon}
      <br />
      Total amount to collect for Lululemon: {totalPriceLululemon}
      <br />
      <Button disabled={!hasSelected} onClick={copyEmailAddresses}>
        Copy email addresses
      </Button>
      <Popconfirm
        title={`Confirm send email to ${selectedRowKeys.length} recipients`}
        onConfirm={sendOrderReceivedEmail}
        okText="Confirm"
      >
        <Button disabled={!hasSelected}>Send order received email</Button>
      </Popconfirm>
      <Button onClick={handlePrint} disabled={!hasSelected}>
        Export to PDF
      </Button>
      <Popconfirm
        title={`Confirm send invoices to ${selectedRowKeys.length} recipients`}
        onConfirm={sendInvoiceEmail}
        okText="Confirm"
      >
        <Button
          type="primary"
          disabled={!hasSelected || !(shopConfig?.status === "closed")}
        >
          Send invoice
        </Button>
      </Popconfirm>
      <br />
      <div hidden>
        <SelectedCartTables ref={componentRef} />
      </div>
      <Table
        className="buyers-table"
        dataSource={dataSource}
        columns={columns}
        expandable={{ expandedRowRender: cartsRender }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
    </>
  );
};
