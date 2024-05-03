import React from "react";
import "../../../App.css";
import { Container, InputField, Prefix, Suffix } from "./styles";
import { RightLabel, LeftLabel } from "../elements";

/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
const Input = ({
  type,
  name,
  rightlabel,
  leftlabel,
  placeholder,
  prefixIcon,
  PrefixLabel,
  suffixIcon,
  suffixIconStyle,
  prefixSelect,
  suffixSelect,
  handleChange,
  value,
  defaultValue,
  // readOnly,
  className,
  ...props
}) => {
  return (
    <Container>
      {PrefixLabel && (
        <Prefix>
          <p>RC-</p>
        </Prefix>
      )}
      {prefixIcon && (
        <Prefix>
          <img src={prefixIcon} alt="icon" />
        </Prefix>
      )}
      {prefixSelect && (
        <Prefix>
          <select {...props} onChange={handleChange}>
            <option>{prefixSelect}</option>
          </select>
        </Prefix>
      )}
      <InputField
        {...props}
        value={value}
        defaultValue={defaultValue}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={className}
        // style={
        //   readOnly
        //     ? { backgroundColor: "#b5b5b5" }
        //     : { backgroundColor: "#ffffff" }
        // }
      />

      {suffixIcon && (
        <Suffix>
          <img className={suffixIconStyle} src={suffixIcon} alt="icon" />
        </Suffix>
      )}
      {suffixSelect && (
        <Suffix>
          <select {...props} onChange={handleChange}>
            <option>{suffixSelect}</option>
          </select>
        </Suffix>
      )}
      {rightlabel && <RightLabel>{rightlabel}</RightLabel>}
      {leftlabel && <LeftLabel>{leftlabel}</LeftLabel>}
    </Container>
  );
};

export default Input;
