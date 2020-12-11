export function getBlobURL(...args: ConstructorParameters<typeof Blob>) {
	const blob = new Blob(...args);
	return window.URL.createObjectURL(blob);
}
