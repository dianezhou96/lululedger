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

const rockerzProps = {
  imgLink: "https://luludb.dianeyz.me/uploads/medium_rockerz_0e62d83cbd.jpg",
  orderLink: "https://forms.gle/M32UyZp9KYjZMVZt6",
  title: "Rockerz Skate Guards - Custom Colors & Sizes ($28 - $46)",
  description: "Mix & match up to 4 colors!",
};

export const orderCardProps = [rockerzProps];
