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

const pandaExpressImgLink =
  "https://luludb.dianeyz.me/uploads/medium_sfit_panda_express_03b66923a1.jpg";
const pandaExpressLink =
  "https://www.community-fundraiser.com/virtual-fundraiser/events/promotions/f098974e-6353-7533-a275-104ae2295760/en/landing";
export const PandaExpressCard: React.FC = () => {
  return (
    <Card
      style={{
        width: COVER_WIDTH,
      }}
      cover={<img src={pandaExpressImgLink} />}
      actions={[
        <a href={pandaExpressLink} target="_blank">
          <span>
            <PlusCircleTwoTone style={{ marginRight: 5 }} /> Order
          </span>
        </a>,
      ]}
    >
      <Meta
        title={
          <a href={pandaExpressLink} target="_blank">
            Panda Express Fundraiser (Friday 5/17 only)
          </a>
        }
        description={
          <i style={{ color: "black", fontSize: "medium" }}>
            Order online for any location!
          </i>
        }
      />
    </Card>
  );
};
