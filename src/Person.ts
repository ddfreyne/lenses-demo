export type Color = {
  id: string;
  name: string;
  hex: string;
};

export type Address = {
  street: string;
  number: string;
};

export type Person = {
  firstName: string;
  lastName: string;
  address: Address;
  hobbies: string[];
  favoriteColor: Color | null;
};
