import type { ArrayField, Field } from "payload";

import type { ButtonVariants } from "./button";

import deepMerge from "@/lib/deepMerge";
import { button } from "./button";

type ButtonGroupType = (options?: {
  variants?: ButtonVariants[] | false;
  overrides?: Partial<ArrayField>;
}) => Field;

export const buttonGroup: ButtonGroupType = ({
  variants,
  overrides = {},
} = {}) => {
  const generatedButtonGroup: Field = {
    name: "buttons",
    type: "array",
    fields: [
      button({
        variants,
      }),
    ],
  };

  return deepMerge(generatedButtonGroup, overrides);
};
