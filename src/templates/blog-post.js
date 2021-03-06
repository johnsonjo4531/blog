import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";
import components from "../components/designSystem";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm, scale } from "../utils/typography";
import "./blog-style.css";
import { UnpublishedArticleWarning } from "../components/unpublished-warning";

class BlogPostTemplate extends React.Component {

	async componentDidMount() {
		await import("../scripts/spoilers.js");
	}

	render() {
		if (this.props.errors) {
			console.log(this.props);
			console.error(this.props.errors);
			throw new Error(this.props.errors[0].message);
		}
		const post = this.props.data.mdx;
		const siteTitle = this.props.data.site.siteMetadata.title;
		const { previous, next } = this.props.pageContext;

		return (
			<Layout location={this.props.location} title={siteTitle}>
				<SEO
					title={post.frontmatter.title}
					description={post.frontmatter.description || post.excerpt}
				/>
				<Bio />
				<article>
					<header>
						<h1
							style={{
								marginTop: rhythm(1),
								marginBottom: 0,
							}}
						>
							{post.frontmatter.title}
						</h1>
						<p
							style={{
								...scale(-1 / 5),
								display: `block`,
								marginBottom: rhythm(1),
							}}
						>
							{post.frontmatter.date}
						</p>
					</header>
					{!post.frontmatter.published && <UnpublishedArticleWarning />}
					<MDXProvider components={components}>
						<MDXRenderer>{post.body}</MDXRenderer>
					</MDXProvider>
					<hr
						style={{
							marginBottom: rhythm(1),
						}}
					/>
					<footer>
						<Bio />
					</footer>
				</article>

				<nav>
					<ul
						style={{
							display: `flex`,
							flexWrap: `wrap`,
							justifyContent: `space-between`,
							listStyle: `none`,
							padding: 0,
						}}
					>
						<li>
							{previous && (
								<Link to={previous.fields.slug} rel="prev">
									← {previous.frontmatter.title}
								</Link>
							)}
						</li>
						<li>
							{next && (
								<Link to={next.fields.slug} rel="next">
									{next.frontmatter.title} →
								</Link>
							)}
						</li>
					</ul>
				</nav>
			</Layout>
		);
	}
}

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostById($id: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		mdx(id: { eq: $id }) {
			excerpt
			body
			id
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
				description
				published
			}
		}
	}
`;
