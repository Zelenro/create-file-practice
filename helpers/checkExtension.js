export const checkExtension = fileName => {
	const EXTENSION = ['txt', 'html', 'json', 'css'];
	const fileExtension = fileName.split('.').pop();
	const result = EXTENSION.includes(fileExtension);
	return {
		fileExtension,
		result,
	};
};
