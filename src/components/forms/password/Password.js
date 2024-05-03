import React from "react";
import Input from "../input";
import { ShowPasswordButton, Wrapper } from "./style";
import { LeftLabel, RightLabel } from "../elements";
import eye from "../../../assets/icons/eye-password-show.svg";

/* eslint-disable arrow-body-style */
const PasswordInput = ({
	type,
	onShowPasswordClick,
	rightlabel,
	leftlabel,
	// handleChange,
	placeholder,
	name,
	...props
}) => {
	return (
		<Wrapper>
			<Input
				type={type}
				name={name}
				placeholder={placeholder}
				{...props}
				// handleChange={handleChange}
			/>
			<ShowPasswordButton onClick={onShowPasswordClick}>
				{type === "password" ? <img src={eye} alt="icon" /> : "Hide"}
			</ShowPasswordButton>
			{rightlabel && <RightLabel>{rightlabel}</RightLabel>}
			{leftlabel && <LeftLabel>{leftlabel}</LeftLabel>}
		</Wrapper>
	);
};

export default PasswordInput;
