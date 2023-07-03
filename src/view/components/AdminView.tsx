import Table, { ColumnType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BuyerCarts, SkaterTeam, SKATER_TEAMS } from "../../types";
import { BuyerTable } from "./BuyerTable";
import { ItemTable } from "./ItemTable";

type RecordType = {
  key: number;
  name: string;
  email: string;
  skaterName: string;
  skaterTeam: SkaterTeam;
  cartsSubmitted: number;
  cartsUnsubmitted: number;
};

export const AdminView: React.FC = () => {
  //   return <BuyerTable />;
  return <ItemTable />;
};
