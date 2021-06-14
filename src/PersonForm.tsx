import React, { useState } from "react";

import { forProp, compose } from "./lenses";
import { Person, Address } from "./Person";
import { BareTextField, TextField } from "./fields/TextField";
import { DropdownField } from "./fields/DropdownField";
import { ListField } from "./fields/ListField";
import { RadioButtonField } from "./fields/RadioButtonField";

let firstName = forProp<Person>()("firstName");
let lastName = forProp<Person>()("lastName");
let address = forProp<Person>()("address");
let hobbies = forProp<Person>()("hobbies");
let favoriteColor = forProp<Person>()("favoriteColor");

let street = compose(address, forProp<Address>()("street"));
let houseNumber = compose(address, forProp<Address>()("number"));

const allColors = [
  { id: "mari", hex: "#0089a8", name: "Marina" },
  { id: "star", hex: "#e74132", name: "Stardust" },
  { id: "ruby", hex: "#bc1a50", name: "Ruby" },
  { id: "sapp", hex: "#45439d", name: "Sapphire" },
  { id: "elec", hex: "#c2d62e", name: "Electric" },
  { id: "mint", hex: "#29bc75", name: "Mint" },
  { id: "slat", hex: "#546173", name: "Slate" },
];

const newPerson = (): Person => ({
  firstName: "",
  lastName: "",
  address: {
    street: "",
    number: "",
  },
  hobbies: [],
  favoriteColor: null,
});

export const PersonForm = () => {
  let [person, setPerson] = useState(newPerson);
  let f = { top: person, setTop: setPerson };

  return (
    <div style={{ display: "flex", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ flexGrow: 1, flexBasis: "30%" }}>
        <h1 style={{ color: person.favoriteColor?.hex || "#000" }}>
          Hello, {person.firstName || "stranger"}!
        </h1>

        <TextField {...f} lens={firstName} label="First name" />
        <TextField {...f} lens={lastName} label="Last name" />
        <TextField {...f} lens={street} label="Street" />
        <TextField {...f} lens={houseNumber} label="Number" />

        <DropdownField
          {...f}
          lens={favoriteColor}
          label="Favorite color"
          values={allColors}
          renderValue={(o) => `${o.name} (${o.hex})`}
        />

        <RadioButtonField
          {...f}
          lens={favoriteColor}
          label="Favorite color"
          values={allColors}
          renderValue={(o) => <span style={{ color: o.hex }}>{o.name}</span>}
        />

        <ListField {...f} lens={hobbies} label="Hobbies" make={() => ""}>
          {(hobby) => <BareTextField {...f} lens={hobby} />}
        </ListField>
      </div>

      <div style={{ flexGrow: 1, flexBasis: "30%", marginLeft: 30 }}>
        <pre style={{ marginTop: 20, padding: 10, background: "#eee" }}>
          {JSON.stringify(person, null, 2)}
        </pre>
      </div>
    </div>
  );
};
