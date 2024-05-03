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
  control: (styles) => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isFocused ? "#3B48FB" : "#FFF",
      color: isFocused ? "#FFF" : "#000",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

const SearchableSelectWithIcons = ({
  options,
  name,
  value,
  setFieldValue,
  placeholder,
  isLoading,
  defaultValue,
  multipleOptions = false,
  isDisabled = false
}) => {
  return (
    <Select
      options={options}
      components={{ Option: IconOption }}
      value={options ? options.find((option) => option.value === value) : ""}
      onChange={(option) => setFieldValue(name, option.value)}
      styles={colourStyles}
      placeholder={placeholder}
      isLoading={isLoading}
      isMulti={multipleOptions}
      defaultInputValue={defaultValue}
      isDisabled={isDisabled}
    />
  );
};

export default SearchableSelectWithIcons;
