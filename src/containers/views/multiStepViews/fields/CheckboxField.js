// import React from 'react'
// import { useField } from 'formik';

// export default function CheckboxFieldInput(props) {
//    // this will return field exactly like <Field>{({ field }) => ... }</Field>
//    const [field, meta] = useField(props);
//    return (
//      <div className="flex flex-col relative">
//         <input {...field} {...props} multiple={true} type="checkbox" style={{ width: 20, height: 20 }}/>

//         <span className="text-RED-_500 text-xs block absolute top-11 w-screen">
//             {meta.error && meta.touched && <div>{meta.error}</div>}
//         </span>
//      </div>
//    );
//  }

import React from "react";
import { Field } from "formik";
import Text from "../../../../components/Typography/Typography";

export default function CheckboxFieldInput(props) {
  const { className, TextStyle, name, value, checkboxLabel } = props;
  return (
    <div className="relative">
      <div
        className={`w-full bg-UPLOAD_COLOR h-14 rounded-md ${
          props.padding || "px-6"
        } flex items-center ${className ? className : ""}`}
      >
        <Field
          type="checkbox"
          name={name}
          value={value}
          style={{ width: 20, height: 20 }}
        />
        <Text
          color={`font-medium text-NEUTRAL-_600 ml-2 ${
            TextStyle ? TextStyle : ""
          }`}
          variant={props.variant || "h4"}
        >
          {checkboxLabel}
        </Text>
      </div>
    </div>
  );
}
