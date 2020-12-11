import React from "react";
import "./CodePreview.css";
import libHTML from "raw-loader!../../static/code-preview.html";

const getBlobURL = (code, type) => {
	if (typeof window !== "undefined" && window.location) {
		const blob = new Blob([code], { type });
		return URL.createObjectURL(blob);
	}
};

export default props => {
	const [timesRun, updateTimesRun] = React.useState(1);
	const updateIframe = () => updateTimesRun((timesRun + 1) % 2);
	const ReBuildIframeButton = (
		<button className="rerun" onClick={updateIframe}>
			Rerun code
		</button>
	);
	if (props && props.language === "html") {
		const blobUrl = getBlobURL(props.codeString, "text/html");
		return (
			<>
				{ReBuildIframeButton}
				<div className="code-preview-parent">
					<iframe
						key={timesRun}
						className="code-preview"
						title={props.title}
						src={blobUrl}
					/>
				</div>
			</>
		);
	} else if (props && props.language === "js") {
		const html = `<script>const uuid = ${timesRun};${props.codeString}</script>`;
		const fullHtml = libHTML.replace("{{ BODY_HERE }}", html);
		const blobUrl = getBlobURL(fullHtml, "text/html");
		return (
			<>
				{ReBuildIframeButton}
				<div className="code-preview-parent">
					<iframe
						className="code-preview"
						title={props.title}
						sandbox="allow-scripts"
						src={blobUrl}
						// srcDoc={fullHtml}
					/>
				</div>
			</>
		);
	}
};
