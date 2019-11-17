const { getPostsByPublishType } = require("./gatsby-node-utils");

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`src/templates/blog-post.js`);
  const result = await graphql(
    `
      {
        allMdx (
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
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
	const posts = result.data.allMdx.edges;
	
	const [publishedPosts, unpublishedPosts] = getPostsByPublishType(posts);
		
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
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
		const value = createFilePath({ node, getNode });
		const date = new Date(node.frontmatter.date);
    createNodeField({
      name: `slug`,
      node,
      value: path.join("blog", node.frontmatter.published ? "" : "unpublished", "" + date.getFullYear(), "" + date.getMonth(), value)
    });
  }
};
