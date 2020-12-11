import React from "react";
// import { render } from "react-dom";
import Highlight, { defaultProps } from "prism-react-renderer/dist/index";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import CodePreview from "./CodePreview";
export const Code = ({ codeString, language, ...props }={}) => {
  const highlight = (
		<Highlight {...defaultProps} code={codeString} language={language}>
			{({ className, style, tokens, getLineProps, getTokenProps }) => (
				<pre className={className} style={style}>
					{tokens.map((line, i) => (
						<div {...getLineProps({ line, key: i })}>
							{i === 0 && (language === "bash" || language === "sh") && (
								<span class="terminal-symbol">$ </span>
							)}
							{line.map((token, key) => (
								<span {...getTokenProps({ token, key })} />
							))}
						</div>
					))}
				</pre>
			)}
		</Highlight>
	);
  if (props["code-example"]) {
    return (
      <div className="code-preview-full">
				{highlight}
        <CodePreview language={language} codeString={codeString} />
      </div>
    );
  } else if (props["preview-only"]) {
    return (
			<CodePreview language={language} codeString={codeString} />
    );
  } else if (props["react-live"]) {
    return (
      <LiveProvider code={codeString} noInline={true}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    );
  } else {
    return highlight;
  }
};
