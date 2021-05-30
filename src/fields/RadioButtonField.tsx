import * as React from "react";

import { Lens } from "../lenses";
import { Wrapper } from "./Wrapper";

interface BareRadioButtonFieldProps<T, F> {
  lens: Lens<T, F | null>;

  top: T;
  setTop: (t: T) => void;

  values: Array<F>;
  renderValue: (f: F) => string | JSX.Element;
}

const BareRadioButtonField = <T, F extends { id: string }>(
  props: BareRadioButtonFieldProps<T, F>
) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let id = event.target.value;
    let value = props.values?.find((v) => v.id === id) || null;
    props.setTop(props.lens.set(props.top, value));
  };

  let value = props.lens.get(props.top);

  return (
    <>
      {props.values.map((choiceValue, idx) => (
        <div key={idx} className={idx === 0 ? "" : "pt-2"}>
          <label>
            <input
              type="radio"
              value={choiceValue.id}
              onChange={onChange}
              checked={value?.id === choiceValue.id}
            />
            <span className="pl-2">{props.renderValue(choiceValue)}</span>
          </label>
        </div>
      ))}
    </>
  );
};

interface RadioButtonFieldProps<T, F> extends BareRadioButtonFieldProps<T, F> {
  label: string;
}

export const RadioButtonField = <T extends any, F extends { id: string }>(
  props: RadioButtonFieldProps<T, F>
) => (
  <Wrapper label={props.label}>
    <BareRadioButtonField {...props} />
  </Wrapper>
);
