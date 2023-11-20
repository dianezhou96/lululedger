import React, { useState } from "react";
import { Button, Checkbox } from "antd";
import { ITEM_SIZES } from "../../constants";

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
  const [checks, setChecks] = useState(props.value ?? []);
  const [btnState, setBtnState] = useState(
    new Array(ITEM_SIZES.length).fill(false)
  );

  return (
    <div>
      {ITEM_SIZES.map((size, i) => {
        return (
          <Button
            type={btnState[i] ? "primary" : "default"}
            onClick={(e) => {
              // take care of the visual state of the button
              const newState = [...btnState];
              newState[i] = !newState[i];
              setBtnState(newState);

              // update the form state
              let newChecks = [...checks];
              if (newState[i]) {
                // add size
                newChecks.push(size);
              } else {
                // remove size
                newChecks = newChecks.filter((v) => {
                  return v !== size;
                });
              }
              setChecks(newChecks);
              props.onChange && props.onChange(newChecks);
            }}
          >
            {size}
          </Button>
        );
      })}
    </div>
  );
};
