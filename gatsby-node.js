const express = require('express');

const { getPostsByPublishType } = require("./gatsby-node-utils");

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateDevServer = ({app})=>{
    app.use(express.static('public'))
}

const getBlogPostsAndExperiments = (graphql) => graphql(
	`
		{
			blogPosts: allMdx (
				sort: { fields: [frontmatter___date], order: DESC }
				limit: 1000
			) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							title
							published
						}
					}
				}
			}
			experiments: allExperimentsYaml {
				edges {
					node {
						id
						slug
						href
						timetext
						description
					}
				}
			}
		}
		`);
			// index: allMdx (
			// 		sort: { fields: [frontmatter___date], order: DESC }
			// 		limit: 1000
			// 	) {
			// 		edges {
			// 			node {
			// 				id
			// 				fields {
			// 					slug
			// 				}
			// 				frontmatter {
			// 					title
			// 					published
			// 				}
			// 			}
			// 		}
			// 	}
			// }

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
	actions.setWebpackConfig({
		resolve: {
        extensions: [".html"]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: "html-loader?esModule"
            }
        ]
    }
	});
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

	const blogPost = path.resolve(`src/templates/blog-post.js`);
	const experimentTemplate = path.resolve(`src/templates/experiment.js`);
  const [result] = await Promise.all([getBlogPostsAndExperiments(graphql)]);

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
	const posts = result.data.blogPosts.edges;
	
	const [publishedPosts, unpublishedPosts] = getPostsByPublishType(posts);
	// const tags = getTagsWithPosts(posts);
		
	const createPageForPost = (post, index, posts) => {
		const previous = index === posts.length - 1 ? null : posts[index + 1].node;
		const next = index === 0 ? null : posts[index - 1].node;

		createPage({
			path: post.node.fields.slug,
			component: blogPost,
			context: {
				id: post.node.id,
				// slug: post.node.fields.slug,
				previous,
				next,
			},
		});
	};

	publishedPosts.forEach(createPageForPost);
	unpublishedPosts.forEach(createPageForPost);

	const experiments = result.data.experiments.edges;

	experiments.forEach((experiment, index, experiments) => {
		const previous = index === experiments.length - 1 ? null : experiments[index + 1].node;
		const next = index === 0 ? null : experiments[index - 1].node;

		createPage({
			path: experiment.node.slug,
			component: experimentTemplate,
			context: {
				...experiment.fields,
				...experiment.node,
				breadCrumbs: ["/experiments"],
				previous,
				next,
			},
		});
	})

	// [...tags.entries()].forEach((tag) => {
	// 	createPage({
	// 		path: post.node.fields.slug,
	// 		component: blogPost,
	// 		context: {
	// 			id: post.node.id,
	// 			// slug: post.node.fields.slug,
	// 			previous,
	// 			next,
	// 		},
	// 	});
	// })
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
		const value = createFilePath({ node, getNode });
		const date = new Date(node.frontmatter.date);
    createNodeField({
      name: `slug`,
      node,
      value: path.join("/blog", node.frontmatter.published ? "" : "unpublished", "", value)
    });
	} else if (node.internal.type === 'ExperimentsYaml') {
		// do nothing...
		const maxWords = 150
		const shortenedValue = node.description.split(' ').slice(0, maxWords).join(' ');
		createNodeField({
      name: `descriptionPreview`,
			node,
			// how many words
			value: shortenedValue === node.description ? node.description : (shortenedValue + " ...")
    });
	}
};
