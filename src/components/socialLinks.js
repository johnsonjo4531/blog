import React from "react";
import { useStaticQuery, graphql } from "gatsby";

export default () => {
  const data = useStaticQuery(graphql`
    query SocialLinksQuery {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedin
          }
        }
      }
    }
	`);
  const { social } = data.site.siteMetadata;
  return (
    <p>
      Social Links:
      {` `}
      <a href={`https://twitter.com/${social.twitter}`}>Twitter</a>,{` `}
      <a href={`https://github.com/${social.github}`}>Github</a>,{` `}
      <a href={`https://linkedin.com/in/${social.linkedin}/`}>LinkedIn</a>
    </p>
  );
};
