import React from "react";

interface WrapperProps {
  label: string;
  children: JSX.Element;
}

export const Wrapper = ({ label, children }: WrapperProps) => (
  <label style={{ display: "block", marginBottom: 20 }}>
    <div style={{ fontWeight: "bold" }}>{label}</div>
    {children}
  </label>
);
