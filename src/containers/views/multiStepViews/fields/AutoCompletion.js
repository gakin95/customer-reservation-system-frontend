import React, { useState, useEffect } from "react";
import Input from "../../../../components/forms/input";
import { useField } from "formik";
const Autocomplete = (props) => {
    const [field, meta] = useField(props);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");

  let value = field.value;
  console.log('value',value)
  
  const filterList = () => {
    const { suggestions } = props;
    const newFilteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    //setInput(input)
  };
const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
  };
const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active])
    }
    else if (e.keyCode === 38) { // up arrow
      return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
  };
  useEffect(() => {
      filterList()
  },[value])
const renderAutocomplete = () => {
    if (isShow && value) {
      if (filtered.length) {
        return (
          <ul className="autocomplete">
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  }
return (
    <>
      {/* <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      /> */}
      <div>
      <Input {...field} {...props} />
      <span className="text-RED-_500 text-xs">
        {meta.error && meta.touched && <div>{meta.error}</div>}
      </span>
    </div>
      {renderAutocomplete()}
    </>
  );
}
export default Autocomplete;