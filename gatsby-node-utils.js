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

module.exports.getTagsWithPosts = posts => {
	const tags = new Map();
	for(const post of posts) {
		for(const tag of post.node.frontmatter.tags) {
			tags.set(tag, [...(tags.get(tag) || []), post]);
		}
	}
	return tags;
}
