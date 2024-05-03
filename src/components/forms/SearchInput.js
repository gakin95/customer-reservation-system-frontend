import React from "react";
import search from "../../assets/icons/search.svg";

const SearchInput = ({ placeholder, type, value, onChange }) => (
  <div className="w-full px-2 font-normal focus:outline-none relative">
    <img src={search} alt="search" className="absolute left-3 top-3" />
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="text-TITLE text-xs pl-8 w-full outline-none bg-BUTTON_FILLED rounded-md p-4"
      placeholder={placeholder}
    />
  </div>
);

export default SearchInput;
