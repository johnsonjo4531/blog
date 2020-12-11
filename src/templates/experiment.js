import React from "react";
import { graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { errorLogger } from "../utils/graphqlErrorLogger";
import "./blog-style.css";

class Experiment extends React.Component {
	render() {
		errorLogger(this.props);
		console.log(this.props);
		const experiment = this.props.data.experimentsYaml;

		return (
			<Layout location={this.props.location} title={"My Experimental Projects"}>
				<SEO title={experiment.title} />
				<Bio />
				<p>{experiment.description}</p>
				<a href={experiment.href}>View project full screen</a>
				<iframe title={experiment.title} src={experiment.href} style={{ height: '100vh', overflow: 'scroll', margin: '0 auto', width: '100%', border: 'none' }} />
			</Layout>
		)
	};
}

export default Experiment;

export const pageQuery = graphql`
	query ExperimentsById($id: String!) {
		experimentsYaml (id: { eq: $id }) {
			title
			id
			slug
			href
			timetext
			description
		}
	}
`;
