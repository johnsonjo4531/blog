import React from "react";
import { Link } from "gatsby";
import { Helmet } from "react-helmet";

import { rhythm, scale } from "../utils/typography";
import Hexagons from "./hexagons-sketch";

class Layout extends React.Component {
	render() {
		const { location, title, children } = this.props;
		if (!location) {
			// we are in a non page mdx component;
			return children;
		}
		const rootPath = `${__PATH_PREFIX__}/`;
		const blogRootPath = `${__PATH_PREFIX__}/blog`;
		let header, outsideHeader;
		const headerContainerStyle = {
			display: "flex",
			flexDirection: "column",
			justifyContent: "space-around",
			alignItems: "center",
		};
		const headerStyle = {
			...scale(1.5),
			marginBottom: rhythm(1.5),
			marginTop: 0,
		};
		if (location.pathname === rootPath) {
			header = (
				<h1 style={headerStyle}>
					<Link
						style={{
							boxShadow: `none`,
							textDecoration: `none`,
							color: `inherit`,
						}}
						to={rootPath}
					>
						{title}
					</Link>
				</h1>
			);
		} else if (
			location.pathname === blogRootPath ||
			location.pathname === blogRootPath + "/"
		) {
			outsideHeader = (
				<div
					style={{
						position: "relative",
					}}
				>
					<Hexagons
						style={{
							...headerContainerStyle,
							width: "100vw",
							maxWidth: "100%",
							height: "600px",
							maxHeight: "97vh",
						}}
					>
						<div style={headerContainerStyle}>
							<h1
								style={{
									marginTop: 0,
									fontSize: "27vmin",
								}}
							>
								NaN
							</h1>
							<h2>(Not a Number)</h2>
						</div>
					</Hexagons>
				</div>
			);
		} else {
			outsideHeader = (
				<div
					style={{
						position: "relative",
					}}
				>
					<Hexagons
						style={{
							...headerContainerStyle,
						}}
					>
						<h1
							style={{
								...headerStyle,
								margin: 0,
								padding: "0.7em",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Link
								style={{
									boxShadow: `none`,
									textDecoration: `none`,
									color: `inherit`,
								}}
								to={blogRootPath}
							>
								{title}
							</Link>
						</h1>
					</Hexagons>
					<div style={{ position: "relative" }}></div>
				</div>
			);
		}
		return (
			<div>
				<Helmet>
					<meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
				</Helmet>
				{outsideHeader && <header>{outsideHeader}</header>}
				<div
					style={{
						marginLeft: `auto`,
						marginRight: `auto`,
						width: "1200px",
						maxWidth: "80%",
						padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
					}}
				>
					{header && <header>{header}</header>}
					<main>{children}</main>
					<footer>
						© {new Date().getFullYear()}, Built with
						{` `}
						<a href="https://www.gatsbyjs.org">Gatsby</a>
					</footer>
				</div>
			</div>
		);
	}
}

export default Layout;
