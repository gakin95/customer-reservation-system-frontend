import React from "react";
import { useField } from "formik";

import CustomSelect from "./CustomSelect";

export default function SelectFieldInput(props) {
  // this will return field exactly like <Field>{({ field }) => ... }</Field>
  //   const [field, meta] = useField(props);
  const [field] = useField(props);
  return (
    <div className="cursor-pointer relative" width={{ minWidth: "50%" }}>
      <CustomSelect {...field} {...props} />

      {/* <div className="text-RED-_500 text-xs pt-2 block w-full absolute top-20">
        {meta.error && meta.touched && <div>{meta.error}</div>}
      </div> */}
    </div>
  );
}
