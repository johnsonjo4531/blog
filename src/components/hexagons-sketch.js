import React from "react";

export default props => (
	<div style={props.style || {}} className="hexagon gradient">
		{props.children}
	</div>
);
