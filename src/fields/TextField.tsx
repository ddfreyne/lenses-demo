import React from "react";

import { Lens } from "../lenses";
import { Wrapper } from "./Wrapper";

interface BareTextFieldProps<T> {
  lens: Lens<T, string>;
  top: T;
  setTop: (t: T) => void;
}

export const BareTextField = <T extends any>(props: BareTextFieldProps<T>) => {
  let value = props.lens.get(props.top);

  let set = (newValue: string) => {
    props.setTop(props.lens.set(props.top, newValue));
  };

  return (
    <input type="text" value={value} onChange={(e) => set(e.target.value)} />
  );
};

interface TextFieldProps<T> extends BareTextFieldProps<T> {
  label: string;
}

export const TextField = <T extends any>(props: TextFieldProps<T>) => (
  <Wrapper label={props.label}>
    <BareTextField {...props} />
  </Wrapper>
);
