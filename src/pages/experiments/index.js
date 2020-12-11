import React from "react";
import { graphql } from 'gatsby';

import Bio from "../../components/bio";
import Layout from "../../components/layout";
import SEO from "../../components/seo";
import { rhythm } from "../../utils/typography";
import { errorLogger } from "../../utils/graphqlErrorLogger";

import "../root-styles.css";

class BlogIndex extends React.Component {
	render() {
		errorLogger(this.props);
		console.log(this.props);

		const { data } = this.props;
		const experiments = data.allExperimentsYaml.nodes;

		return (
			<Layout location={this.props.location} title={"My Experimental Projects"}>
				<SEO title="All posts" />
				<Bio />
				{
				experiments.map(({ href, slug, title, timetext, fields: {descriptionPreview} }) => {
					return (
						<article key={href}>
							<header>
								<h3
									style={{
										marginBottom: rhythm(1 / 4),
									}}
								>
									<a style={{ boxShadow: `none` }} href={href}>
										{title}
									</a>
								</h3>
								<small>{timetext}</small>
							</header>
							<section>
								<p>{descriptionPreview}</p>
								<a href={slug}>Read more...</a>
							</section>
						</article>
					);
				})}
			</Layout>
		);
	}
}

export default BlogIndex;


export const pageQuery = graphql`
query GetProgrammingExperiments {
  allExperimentsYaml {
		nodes {
			title
			id
			slug
			href
			timetext
			fields {
				descriptionPreview
			}
		}
  }
}
`
