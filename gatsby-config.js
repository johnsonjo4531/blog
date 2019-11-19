module.exports = {
	siteMetadata: {
		title: `NaN (Not a Number)`,
		author: `John D. Johnson II`,
		description: `A blog about programming and anything else interesting.`,
		aboutMe: `
I'm a cofounder of a startup where I work as a full-stack Web Developer doing [HTML][1]/[CSS][2], [JavaScript][3], [Node.js][4], and [MongoDB][5]. Some newer projects I'm working on are using the [GRANDstack](https://grandstack.io) with Node.js. I really enjoy working with new flavors of JavaScript like ES6. 

I have a B.S. in Computer Science from Utah State University (USU). My favorite class I had at University was probably Discrete Mathematics which includes some of each of the following: set theory, logic, graph theory, combinatorics, and number theory. I also enjoyed USU's Computational Geometry and Advanced Algorithms course.`,
		// siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
		social: {
			twitter: `johnfoobar`,
			github: `johnsonjo4531`,
			linkedin: `john-johnson-69556688`,
		},
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/blog`,
				name: `blog`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/assets`,
				name: `assets`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				defaultLayouts: {
					default: require.resolve("./src/components/layout.js"),
				},
				extensions: [".md", ".mdx"],
				// workaround: https://github.com/gatsbyjs/gatsby/issues/16422#issuecomment-518985316
				plugins: [`gatsby-remark-images`, `gatsby-remark-autolink-headers`],

				gatsbyRemarkPlugins: [
					`gatsby-remark-katex`,
					`gatsby-remark-images`,
					`gatsby-remark-autolink-headers`,
					// {
					// 	resolve: `gatsby-remark-prismjs`,
					// 	options: {
					// 		classPrefix: "language-",
					// 		inlineCodeMarker: null,
					// 		showLineNumbers: true,
					// 		noInlineHighlight: false,
					// 	},
					// },
				],
			},
		},
		// {
		//   resolve: `gatsby-plugin-mdx`,
		//   options: {
		//     extensions: [".mdx", ".md"],
		//     // defaultLayouts: {
		//     //   default: require.resolve("./src/templates/blog-post.js")
		//     // },
		//     plugins: [
		//       // `gatsby-remark-katex`,
		//       {
		//         resolve: `gatsby-remark-images`,
		//         options: {
		//           maxWidth: 1024
		//         }
		//       }
		//       // {
		//       //   resolve: `gatsby-remark-responsive-iframe`,
		//       //   options: {
		//       //     wrapperStyle: `margin-bottom: 1.0725rem`
		//       //   }
		//       // },
		//       // `gatsby-remark-prismjs`,
		//       // `gatsby-remark-copy-linked-files`,
		//       // `gatsby-remark-smartypants`
		//     ]
		//   }
		// },
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				//trackingId: `ADD YOUR TRACKING ID HERE`,
			},
		},
		// `gatsby-plugin-feed`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Gatsby Starter Blog`,
				short_name: `GatsbyJS`,
				start_url: `/`,
				background_color: `#ffffff`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `content/assets/site-logo.png`,
			},
		},
		// `gatsby-plugin-offline`,
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`,
			},
		},
	],
};
