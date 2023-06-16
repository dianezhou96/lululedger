export function resolveProduct(product) {
  return {
    id: product.id,
    name: product.attributes.name,
    link: product.attributes.link,
    price_actual: product.attributes.price_actual,
    price_retail: product.attributes.price_retail,
    product_images:
      product.attributes.product_images.data?.map(
        (img) => img.attributes.link
      ) ?? [],
    items:
      product.attributes.items.data?.map((item) => ({
        color: item.attributes.color.data?.attributes.color,
        size: item.attributes.size.data?.attributes.size,
        unavailable: item.attributes.unavailable,
      })) ?? [],
  };
}
