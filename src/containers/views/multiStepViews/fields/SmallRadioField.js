import React from "react";
import { useField } from "formik";
import Text from "../../../../components/Typography/Typography";

export default function SmallRadioFieldInput(props) {
  // this will return field exactly like <Field>{({ field }) => ... }</Field>
  const { className, TextStyle } = props;
  const [field, meta] = useField(props);
  return (
    <div className="relative">
      <div className={`flex items-center bg-UPLOAD_COLOR p-1 rounded-md ${className ? className : ''}`}>
        <input {...field} {...props} style={{ width: 20, height: 20 }} />
        <Text color={`font-medium text-NEUTRAL-_600 ml-2 ${TextStyle ? TextStyle : ''}`} variant="h4">
          {props.radioLabel}
        </Text>
      </div>
      <span className="text-RED-_500 text-xs pt-2 absolute w-full top-8">
        {meta.error && meta.touched && <div>{meta.error}</div>}
      </span>
    </div>
  );
}
