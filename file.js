import fs from 'fs/promises';
import path from 'path';

import { validateData } from './helpers/validateData.js';
import { checkExtension } from './helpers/checkExtension.js';

export const createFile = async (fileName, content) => {
	const fileCheck = {
		fileName,
		content,
	};
	const checkData = validateData(fileCheck);
	if (checkData.error) {
		console.log(
			`Please specified ${checkData.error.details[0].path[0]} parameter`
		);
		return;
	}
	const { fileExtension, result } = checkExtension(fileName);
	// console.log(result);
	// console.log(checkData);
	// console.log(checkData.error.details[0]);

	if (!result) {
		console.log(
			`This APP doesn't support extension ${fileExtension}. Enter valid extension`
		);
		return;
	}

	const filePath = path.resolve('file', fileName);
	try {
		await fs.writeFile(filePath, content, 'utf-8');
		console.log('Well done!');
	} catch (error) {
		console.log(error);
	}
};
