module.exports.getPostsByPublishType = posts =>
	posts.reduce(
		(accumulator, post) => {
			if (post.node.frontmatter.published) {
				return [[...accumulator[0], post], [...accumulator[1]]];
			} else {
				return [[...accumulator[0]], [...accumulator[1], post]];
			}
		},
		[[], []]
	);
