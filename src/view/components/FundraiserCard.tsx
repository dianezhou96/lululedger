import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Empty, Popover } from "antd";
import { COVER_HEIGHT, COVER_WIDTH } from "./ProductCard";

export const FundraiserCard: React.FC = () => {
  const [open, setOpen] = useState(false);
  //   const content = (
  //     <div style={{ maxWidth: COVER_WIDTH }}>
  //       If you aren't interested in purchasing any items but still want to
  //       contribute to our fundraiser, or to make an additional contribution, you
  //       can make a donation through our GoFundMe!
  //       <br />
  //       <br />
  //       Your donation is tax-deductible and helps our skaters pursue opportunites
  //       to compete on the national and international stage.
  //       <br />
  //       <br />
  //       Thank you for supporting SFIT skaters in sharing the joy of figure skating
  //       through theatre on ice!
  //     </div>
  //   );
  return (
    <Card
      style={{
        width: COVER_WIDTH,
      }}
      cover={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: COVER_WIDTH,
            height: COVER_HEIGHT,
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Images unavailable"
            style={{ margin: "auto" }}
          />
        </div>
      }
      actions={[
        // <Popover
        //   content={content}
        //   title={`Donate to SFIT`}
        //   trigger="click"
        //   open={open}
        //   onOpenChange={setOpen}
        // >
        <span>
          <PlusCircleTwoTone style={{ marginRight: 5 }} /> Donate [link TBD]
        </span>,
        /* </Popover>, */
      ]}
    >
      <Meta
        title="Donate to SFIT via GoFundMe [link TBD]"
        description={
          <i style={{ color: "black", fontSize: "medium" }}>
            Any amount is appreciated!
          </i>
        }
      />
    </Card>
  );
};
