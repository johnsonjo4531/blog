export const errorLogger = function errorLogger(props) {
	if (props.errors) {
		console.log(props);
		console.error(props.errors);
		throw new Error(props.errors[0].message);
	}
};
