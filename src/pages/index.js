import React from "react"
import ReactMarkdown from "react-markdown"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"

import "./root-styles.css"
import SocialLinks from "../components/socialLinks"

export default () => {
	const data = useStaticQuery(graphql`
		query ProfilePicQuery {
			avatar: file(absolutePath: { regex: "/profile-pic.jpeg/" }) {
				childImageSharp {
					fixed(width: 250, height: 250) {
						...GatsbyImageSharpFixed
					}
				}
			}
			site {
				siteMetadata {
					author
					aboutMe
				}
			}
		}
	`)

	const { author, aboutMe } = data.site.siteMetadata

	return (
		<div className="main">
			<div className="left">
				<h1>John Johnson's site</h1>
				<Image
					fixed={data.avatar.childImageSharp.fixed}
					alt={author}
					style={{
						marginRight: 0,
						marginBottom: 0,
						minWidth: 50,
						borderRadius: `100%`,
					}}
					imgStyle={{
						borderRadius: `50%`,
					}}
				/>
				<SocialLinks />
				<h3>
					Visit my Blog: <Link to="/blog">NaN (Not a Number)</Link>
				</h3>
			</div>
			<div className="right">
				<ReactMarkdown source={aboutMe} escapeHtml={false}></ReactMarkdown>
				<a
					className="link-no-underline"
					href="https://stackoverflow.com/users/2066736/john"
				>
					<img
						src="https://stackoverflow.com/users/flair/2066736.png"
						width="208"
						height="58"
						alt="profile for John at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
						title="profile for John at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
					/>
				</a>
			</div>
		</div>
	)
}
