import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Empty } from "antd";
import { COVER_HEIGHT, COVER_WIDTH } from "./ProductCard";
import { FUNDRAISER_IMAGE_LINK, FUNDRAISER_LINK } from "../../constants";

export const FundraiserCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <Card
      style={{
        width: COVER_WIDTH,
      }}
      cover={<img src={FUNDRAISER_IMAGE_LINK} />}
      actions={[
        <a href={FUNDRAISER_LINK} target="_blank">
          <span>
            <PlusCircleTwoTone style={{ marginRight: 5 }} /> Donate
          </span>
        </a>,
      ]}
    >
      <Meta
        title={
          <a href={FUNDRAISER_LINK} target="_blank">
            Donation to SFIT via GoFundMe
          </a>
        }
        description={
          <i style={{ color: "black", fontSize: "medium" }}>
            Any amount is appreciated!
          </i>
        }
      />
    </Card>
  );
};
