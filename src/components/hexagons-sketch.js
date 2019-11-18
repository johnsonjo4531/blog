import React from "react";
import CanvasSketchElement from "./canvasSketchElement";

function lerp(v0, v1, t) {
	return (1 - t) * v0 + t * v1;
}

const sketch = ({} = {}) => {
	const getHexPoint = (centerX, centerY, radius, angle) => [
		centerX + radius * Math.cos(angle),
		centerY + radius * Math.sin(angle),
	];
	const lerpRadians = x => lerp(0, Math.PI * 2, x);
	function getHexagons(width, height, hexagonRows = 5) {
		const hexagons = [];
		const radius = width / hexagonRows / 2;
		const hexagonColumns = height / radius / 2;
		// const hexMaxDeltaY = getHexPoint(0, 0, radius, lerpRadians(1 / 6))[1];
		for (let row = 0; row < hexagonRows; ++row) {
			for (let column = 0; column < hexagonColumns; column++) {
				const centerX = lerp(radius, width - radius, row / (hexagonRows - 1));
				const centerY = lerp(
					radius,
					height - radius,
					column / (hexagonColumns - 1)
				);
				hexagons.push(
					new Array(6)
						.fill(0)
						.map((x, i) =>
							getHexPoint(centerX, centerY, radius, lerpRadians(i / 6))
						)
				);
			}
		}

		return hexagons;
	}

	return ({ context, width, height }) => {
		const x = width / 2;
		const y = height / 2;

		// // circle
		// context.beginPath();
		// context.fillStyle = gradient;
		// context.arc(x, y, width / 2, 0, Math.PI * 2);
		// context.fill();

		// // Create circular clipping region
		// context.beginPath();
		// context.arc(x, y, width / 2, 0, Math.PI * 2);
		// context.clip();

		// Rect
		context.save();
		const gradient2 = context.createLinearGradient(0, 0, width, height);
		gradient2.addColorStop(0, "#0b8185");
		gradient2.addColorStop(1, "#403831");
		context.fillStyle = gradient2;
		context.fillRect(0, 0, width, height);
		context.restore();

		// Hexagons
		context.save();
		context.beginPath();
		const gradient = context.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0, "#555");
		gradient.addColorStop(1, "#555");
		context.strokeStyle = gradient;
		// context.strokeStyle = gradient;
		context.lineWidth = width * 0.0025;
		console.log(gradient);
		// hexagons
		getHexagons(width, height, 10).forEach(function(hexagonPoints) {
			const [x, y] = hexagonPoints[0];
			context.moveTo(x, y);
			hexagonPoints.forEach(([x, y]) => {
				context.lineTo(x, y);
			});
			context.lineTo(x, y);
		});
		context.stroke();
		context.restore();

		// // Text
		// context.font = "bold 750px Montserrat";
		// context.fontWeight = 800;
		// context.textAlign = "center";
		// context.fillStyle = "white";
		// context.fillText("NaN", x, y + 200);
		// context.font = `bold ${Math.floor(750 * 0.25)}px Montserrat`;
		// context.fillText("(Not a Number)", x, y + 400 + (750 * 0.25) / 4);
	};
};

export default props => (
	<div>
		<CanvasSketchElement
			style={props.style || {}}
			sketch={sketch}
			settings={{
				dimensions: [(2048 * 16) / 9, 2048],
			}}
			setup={props.setup}
		/>
	</div>
);
