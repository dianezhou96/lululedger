import Card from "antd/es/card/Card";
import Meta from "antd/es/card/Meta";
import React, { useContext, useState } from "react";
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
import { ShopConfigContext } from "../contexts/ShopConfigContext";

export const COVER_WIDTH = 300;
export const COVER_HEIGHT = 360;

export interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps & CartProps> = (props) => {
  const shopConfig = useContext(ShopConfigContext);
  const { product } = props;
  const imageLinks = product.images;
  const priceString = getPriceDescription(product, shopConfig?.discount ?? 0.4);
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
          title={`Add ${product.name} ($${getPrice(
            product,
            shopConfig?.discount ?? 0.4
          )}) to cart`}
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
                title="View product details?"
                description={
                  <>
                    This will open the Lululemon product page in a new tab.{" "}
                    <b>
                      Please return here to place your order to support our
                      fundraiser.
                    </b>
                  </>
                }
                onConfirm={() =>
                  product.link && window.open(product.link, "_blank")
                }
                overlayStyle={{
                  maxWidth: 400,
                }}
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

function getPriceDescription(product: Product, discount: number) {
  const priceElement = (
    <b style={{ color: "black", fontSize: "medium" }}>
      {getPriceString(getPrice(product, discount))}
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
