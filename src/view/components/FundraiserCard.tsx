import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { COVER_WIDTH } from "./ProductCard";
import { FUNDRAISER_IMAGE_LINK, FUNDRAISER_LINK } from "../../constants";

export const FundraiserCard: React.FC = () => {
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

export const OrderCard: React.FC<{
  imgLink: string;
  orderLink: string;
  title: string;
  description: string;
}> = ({ imgLink, orderLink, title, description }) => {
  return (
    <Card
      style={{
        width: COVER_WIDTH,
      }}
      cover={<img src={imgLink} />}
      actions={[
        <a href={orderLink} target="_blank">
          <span>
            <PlusCircleTwoTone style={{ marginRight: 5 }} /> Order
          </span>
        </a>,
      ]}
    >
      <Meta
        title={
          <a href={orderLink} target="_blank">
            {title}
          </a>
        }
        description={
          <i style={{ color: "black", fontSize: "medium" }}>{description}</i>
        }
      />
    </Card>
  );
};

// const donutProps = {
//   imgLink:
//     "https://luludb.dianeyz.me/uploads/medium_donut_fundraiser_7aa652f89b.PNG",
//   orderLink:
//     "https://www.groupraise.com/offer-campaigns/42446-san-francisco-ice-theatre-krispy-kreme-digital-dozens",
//   title: "SFIT x Krispy Kreme Digital Dozens (Wed 7/10 only)",
//   description: "Buy delicious dozens of donuts!",
// };

// export const orderCardProps = [donutProps];
