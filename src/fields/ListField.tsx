import React from "react";

import { Lens, makeArray, push, removeAt } from "../lenses";
import { Wrapper } from "./Wrapper";

interface BareListFieldProps<T, F> {
  lens: Lens<T, F[]>;
  top: T;
  setTop: (t: T) => void;
  make: () => F;
  children: (lens: Lens<T, F>) => JSX.Element;
}

const BareListField = <T, F>(props: BareListFieldProps<T, F>) => {
  let { lens, top, setTop, make, children } = props;

  let length = lens.get(top).length;
  let lenses = makeArray(lens, length);

  return (
    <div>
      {lenses.map((elementLens, idx) => (
        <div>
          {children(elementLens)}

          <button onClick={() => setTop(removeAt(top, lens, idx))}>-</button>
        </div>
      ))}

      <button onClick={() => setTop(push(top, lens, make()))}>+</button>
    </div>
  );
};

interface ListFieldProps<T, F> extends BareListFieldProps<T, F> {
  label: string;
}

export const ListField = <T, F>(props: ListFieldProps<T, F>) => (
  <Wrapper label={props.label}>
    <BareListField {...props} />
  </Wrapper>
);
