/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import Social from "./socialLinks";
import { useStaticQuery, graphql } from "gatsby";
import Image from "gatsby-image";
import { Link } from "gatsby";

import "./bio.css";
import { rhythm } from "../utils/typography";

const Bio = () => {
	const data = useStaticQuery(graphql`
		query BioQuery {
			avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
				childImageSharp {
					fixed(width: 50, height: 50) {
						...GatsbyImageSharpFixed
					}
				}
			}
			site {
				siteMetadata {
					author
				}
			}
		}
	`);
	const flexStyles = {
		display: `flex`,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	};
	const { author } = data.site.siteMetadata;
	return (
		<div
			style={{
				...flexStyles,
				flexDirection: "column",
				marginBottom: rhythm(2.5),
				alignItems: "stretch",
			}}
			className="bio"
		>
			<div style={flexStyles}>
				<Image
					fixed={data.avatar.childImageSharp.fixed}
					alt={author}
					style={{
						marginRight: rhythm(1 / 2),
						marginVertical: `0.5em`,
						minWidth: 50,
						borderRadius: `100%`,
					}}
					imgStyle={{
						borderRadius: `50%`,
					}}
				/>
				<p>
					Written by <strong>{author}</strong> who lives and works in Utah.
				</p>
			</div>
			<div style={{ ...flexStyles, justifyContent: "space-between" }}>
				<p>
					<Link to="/">About Me</Link>
				</p>
				<Social />
			</div>
		</div>
	);
};

export default Bio;
