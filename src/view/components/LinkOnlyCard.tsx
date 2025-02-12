import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { COVER_WIDTH, ProductCardProps } from "./ProductCard";

// This is used for cards that only have an external link,
// e.g. fundraisers.
export const LinkOnlyCard: React.FC<ProductCardProps> = ({ product }) => {
  const { images, link, name, description, link_text } = product;
  return (
    <Card
      style={{
        width: COVER_WIDTH,
      }}
      cover={<img src={images && images.length > 0 ? images[0] : ""} />}
      actions={[
        <a href={link ?? ""} target="_blank">
          <span>
            <PlusCircleTwoTone style={{ marginRight: 5 }} /> {link_text ?? ""}
          </span>
        </a>,
      ]}
    >
      <Meta
        title={
          <a href={link ?? ""} target="_blank">
            {name}
          </a>
        }
        description={
          <i style={{ color: "black", fontSize: "medium" }}>{description}</i>
        }
      />
    </Card>
  );
};
