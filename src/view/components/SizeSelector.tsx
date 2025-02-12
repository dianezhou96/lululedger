import React, { useContext, useState } from "react";
import { Button, Checkbox } from "antd";
import { ShopConfigContext } from "../contexts/ShopConfigContext";

export interface SizeSelectorProps {
  value?: Array<string>;
  onChange?: (checks: Array<string>) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = (
  props: SizeSelectorProps
) => {
  // This component wraps the checkbox component and exposes it as a button
  // We do this because Checkbox plays nicely with antd's Form.List functionality
  // but want to use a button as a checkbox
  const [sizes, setSizes] = useState(props.value ?? []);
  const shopConfig = useContext(ShopConfigContext);

  return (
    <div>
      {shopConfig?.sizes.map((size, i) => {
        return (
          <Button
            key={i}
            type={sizes.includes(size) ? "primary" : "default"}
            onClick={(e) => {
              const select = !sizes.includes(size);
              // update the form state
              let newSizes = [...sizes];
              if (select) {
                // add size
                newSizes.push(size);
              } else {
                // remove size
                newSizes = newSizes.filter((v) => {
                  return v !== size;
                });
              }
              setSizes(newSizes);
              props.onChange && props.onChange(newSizes);
            }}
          >
            {size}
          </Button>
        );
      })}
    </div>
  );
};
