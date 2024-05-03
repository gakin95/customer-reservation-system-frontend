import React from "react";

const Checkbox = ({ className }) => (
	<div>
		<input type="checkbox" className={`form-checkbox ${className}`} />
	</div>
);

export default Checkbox;
