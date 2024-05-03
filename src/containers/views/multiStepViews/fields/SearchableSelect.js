import Select from "react-select";
import { components } from "react-select";
import Avatar from "@mui/material/Avatar";

const { Option } = components;
export const IconOption = (props) => (
  <Option {...props}>
    <div className="flex items-center cursor-pointer">
      <Avatar
        alt={props.data.label}
        src={props.data.image}
        sx={{ width: 24, height: 24 }}
      />
      <div className="ml-2">{props.data.label}</div>
    </div>
  </Option>
);
const colourStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "#f2f5f",
    minHeight: 53,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#3b48fb" : "#fff",
      color: isFocused ? "#FFF" : "#000",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

// backgroundColor: isFocused ? "#3B48FB" : "#FFF",
// color: isFocused ? "#FFF" : "#000",
// cursor: isDisabled ? "not-allowed" : "default",

const SearchableSelect = ({
  options,
  isDisabled,
  name,
  isUpdatingObj = false,
  value,
  setFieldValue,
  placeholder,
  isLoading,
  extraFunction,
  defaultValue,
  multipleOptions = false,
}) => {
  return (
    <Select
      isDisabled={isDisabled}
      options={options}
      value={options ? options.find((option) => option?.value === value) : ""}
      onChange={(option) => {
        setFieldValue(name, isUpdatingObj ? option : option.value);
        extraFunction && extraFunction(option.value);
      }}
      // getOptionLabel={(option) => "test"}
      styles={colourStyles}
      placeholder={!isLoading ? placeholder : ""}
      isLoading={isLoading}
      defaultInputValue={defaultValue}
      isMulti={multipleOptions}
    />
  );
};

export default SearchableSelect;
