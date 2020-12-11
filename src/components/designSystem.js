import React from "react";
import { Code } from "./code";
import { preToCodeBlock } from "mdx-utils";

// components is its own object outside of render so that the references to
// components are stable
export default {
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <div className="CodeBlock"><Code {...props} /></div>;
    } else {
      // it's possible to have a pre without a code in it
      return <div className="Codeblock"><pre {...preProps} /></div>;
    }
  },
  code: codeProps => {
    return <Code {...codeProps} />;
	},
	table: tableProps => {
		return <div className="table-wrap"><table {...tableProps} /></div>
	},
	iframe: iframeProps => {
		return <div className="IFrameWideBox">
			<iframe {...iframeProps} />
		</div>
	}
};;
