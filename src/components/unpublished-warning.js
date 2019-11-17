import React from 'react';

export function UnpublishedArticlesWarning () {
	return (
		<h4 className="alert-warning">
			<span role="img" aria-label="Warning Emoji">⚠️</span> Warning! These articles are in draft mode and not
			published! So, expect some rough edges.
		</h4>
	);
}

export function UnpublishedArticleWarning () {
	return (
		<h4 className="alert-warning">
			<span role="img" aria-label="Warning Emoji">
				⚠️
			</span>{" "}
			Warning! This article is in draft mode and not yet published! So, expect
			some rough edges.
		</h4>
	);
}