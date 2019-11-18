import React, { useEffect } from "react";

export default ({ sketch, settings, style, setup }) => {
	const canvas = React.createRef();
	useEffect(
		function() {
			const onchange = sketch(setup);
			const context = canvas.current.getContext("2d");
			onchange({
				context,
				width: canvas.current.width,
				height: canvas.current.height,
			});
			window.onload = () => {
				onchange({
					context,
					width: canvas.current.width,
					height: canvas.current.height,
				});
			};

			window.onresize = () => {
				onchange({
					context,
					width: context.canvas.width,
					height: context.canvas.height,
				});
			};
		},
		[canvas, sketch, setup]
	);

	return (
		<div>
			<canvas
				ref={canvas}
				style={style}
				width={settings.dimensions[0]}
				height={settings.dimensions[1]}
			/>
		</div>
	);
};
