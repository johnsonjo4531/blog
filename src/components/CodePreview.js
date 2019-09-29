import React from 'react';
import "./CodePreview.css";
export default (props) => {
	if(props && props.language === "html") {
		return <iframe className="code-preview" title={props.title} srcdoc={props.codeString}/>;
	} else if(props && props.language === "js") {
		return <iframe className="code-preview" title={props.title} srcdoc={`<body><script>${props.codeString}</script></body>`}/>;
	}
}