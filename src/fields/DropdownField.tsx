import React from "react";

import { Lens } from "../lenses";
import { Wrapper } from "./Wrapper";

interface BareDropdownFieldProps<T, F> {
  lens: Lens<T, F | null>;

  top: T;
  setTop: (t: T) => void;

  values: Array<F>;
  renderValue: (f: F) => string;
}

const BareDropdownField = <T, F extends { id: string }>(
  props: BareDropdownFieldProps<T, F>
) => {
  let value: F | null = props.lens.get(props.top);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let id = event.target.value;
    let value = props.values.find((v) => v.id === id) || null;
    props.setTop(props.lens.set(props.top, value));
  };

  return (
    <select value={value?.id} onChange={onChange}>
      <option value=""></option>
      {props.values.map((value) => (
        <option value={value.id} key={value.id}>
          {props.renderValue(value)}
        </option>
      ))}
    </select>
  );
};

interface DropdownFieldProps<T, F> extends BareDropdownFieldProps<T, F> {
  label: string;
}

export const DropdownField = <T extends any, F extends { id: string }>(
  props: DropdownFieldProps<T, F>
) => (
  <Wrapper label={props.label}>
    <BareDropdownField {...props} />
  </Wrapper>
);
