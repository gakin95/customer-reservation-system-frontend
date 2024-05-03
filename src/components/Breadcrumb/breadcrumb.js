import React from "react";
import { Link } from "react-router-dom";
import Text from "../Typography/Typography";

const Breadcrumb = (props) => {
  function last(index, allLinks) {
    return index + 1 === allLinks.length;
  }
  return (
    <div className={props.className ? props.className : ""}>
      {props.links ? (
        props?.links.map((value, index) => (
          <Link key={index} to={value.link}>
            {" "}
            <Text
              variant="small"
              format={`inline ${
                !last(index, props.links) ? "text-BLUE-_400" : ""
              } `}
            >
              {value.title}
            </Text>{" "}
            {!last(index, props.links) ? <span> | </span> : ""}
          </Link>
        ))
      ) : (
        <Link to="/dashboard">
          {" "}
          <Text variant="small" format="inline">
            Dashboard
          </Text>
        </Link>
      )}
    </div>
  );
};

export default Breadcrumb;
