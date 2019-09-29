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
      return <Code {...props} />;
    } else {
			debugger;
      // it's possible to have a pre without a code in it
      return <pre {...preProps} />;
    }
  },
  code: codeProps => {
		debugger;
    return <Code {...codeProps} />;
  }
};;
