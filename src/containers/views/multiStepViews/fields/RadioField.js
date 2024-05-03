import React from "react";
import { Field } from "formik";
// import { useField } from "formik";
import Text from "../../../../components/Typography/Typography";

export default function RadioFieldInput(props) {
	// this will return field exactly like <Field>{({ field }) => ... }</Field>
	const { className, TextStyle, name, value, radioLabel } = props;
	//   const [field, meta] = useField(props);
	return (
		<div className="relative">
			<div
				className={`w-full h-14 rounded-md ${props.padding || "px-6"} ${
					props.color || "bg-UPLOAD_COLOR"
				} flex items-center ${className ? className : ""}`}
			>
				<Field type="radio" name={name} value={value} style={{ width: 20, height: 20 }} />
				<Text
					color={`font-medium text-NEUTRAL-_600 ml-2 ${TextStyle ? TextStyle : ""}`}
					variant={props.variant || "h4"}
				>
					{radioLabel}
				</Text>
			</div>
		</div>
	);
}
