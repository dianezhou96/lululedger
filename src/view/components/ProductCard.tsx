import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { getPrice, getPriceString } from "../utils";
import {
  PlusCircleTwoTone,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import Carousel from "antd/es/carousel";
import { Empty, Popconfirm, Popover } from "antd";
import { AddToCartForm } from "./AddToCartForm";
import { Product } from "../../types";
import { CartProps } from "./App";

export const COVER_WIDTH = 300;
export const COVER_HEIGHT = 360;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps & CartProps> = (props) => {
  const { product } = props;
  const imageLinks = product.images;
  const priceString = getPriceDescription(product);
  const [open, setOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
    if (!newOpen) {
      setShowAll(false);
    }
  };

  // workaround as described in  https://github.com/ant-design/ant-design/issues/42115
  const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => (
    <span id={"carousel-arrow-wrapper"} {...props}>
      {children}
    </span>
  );

  return (
    <Card
      style={{
        width: COVER_WIDTH,
      }}
      cover={
        imageLinks?.length ? (
          <Carousel
            arrows
            nextArrow={
              // currentSlide and slideCount must be passed in even if undefined to placate typescript
              <SlickButtonFix currentSlide slideCount>
                <RightOutlined />
              </SlickButtonFix>
            }
            prevArrow={
              <SlickButtonFix currentSlide slideCount>
                <LeftOutlined />
              </SlickButtonFix>
            }
          >
            {imageLinks.map((imageLink, idx) => (
              <img
                key={idx}
                alt={product.name + " " + (idx + 1).toString()}
                src={imageLink}
                loading={"lazy"}
              />
            ))}
          </Carousel>
        ) : (
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
        )
      }
      actions={[
        <Popover
          content={
            <AddToCartForm
              {...props}
              setOpen={setOpen}
              showAll={showAll}
              setShowAll={setShowAll}
            />
          }
          title={`Add ${product.name} ($${getPrice(product)}) to cart`}
          trigger="click"
          open={open}
          onOpenChange={handleOpenChange}
          overlayStyle={{
            width: "min-content",
          }}
        >
          <PlusCircleTwoTone style={{ marginRight: 5 }} /> Add item
        </Popover>,
      ]}
    >
      <Meta
        title={
          <>
            {product.link ? (
              <Popconfirm
                title={"Going to external link"}
                description="This will open the product page in a new tab."
                onConfirm={() =>
                  product.link && window.open(product.link, "_blank")
                }
              >
                <a>{product.name}</a>
              </Popconfirm>
            ) : (
              <span>{product.name}</span>
            )}
          </>
        }
        description={priceString}
      />
    </Card>
  );
};

function getPriceDescription(product: Product) {
  const priceElement = (
    <b style={{ color: "black", fontSize: "medium" }}>
      {getPriceString(getPrice(product))}
    </b>
  );
  if (product.price_retail && !product.price_actual) {
    return (
      <span>
        <del>{getPriceString(product.price_retail)}</del> {priceElement}
      </span>
    );
  }
  return priceElement;
}
