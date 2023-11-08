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
	// console.log(checkData.error.details[0]);
	if (!result) {
		console.log(
			`This APP doesn't support extension ${fileExtension}. Enter valid extension`
		);
		return;
	}

	const filePath = path.resolve('files', fileName);
	try {
		await fs.writeFile(filePath, content, 'utf-8');
		console.log('Well done!');
	} catch (error) {
		console.log(error);
	}
};

export const getFile = async () => {
	const pathHolder = path.resolve('files');
	try {
		const files = await fs.readdir(pathHolder);
		if (!files.length) {
			console.log('No files');
			return;
		} else {
			return files.forEach(file => console.log(file));
		}
	} catch (error) {
		console.log(error);
	}
};

export const getFileInfo = async fileName => {
	const pathHolder = path.resolve('files');
	try {
		const files = await fs.readdir(pathHolder);
		if (!files.length) {
			console.log('No files!');
			return;
		}
		const file = files.find(item => item === fileName);

		if (file) {
			const filePath = path.join(pathHolder, file);
			const containFile = await fs.readFile(filePath, 'utf8');
			const stats = await fs.stat(filePath);
			const fileCreated = stats.birthtime;
			const fileExtension = path.extname(filePath);
			const fileBasename = path.basename(filePath, path.extname(filePath));
			const formattedDate = fileCreated.toDateString();
			const formattedTime = fileCreated.toLocaleTimeString();

			// console.table({
			// 	fileBasename,
			// 	fileExtension,
			// 	formattedDate,
			// 	formattedTime,
			// 	containFile,
			// });

			console.log({
				fileBasename,
				fileExtension,
				formattedDate,
				formattedTime,
				containFile,
			});
		} else {
			console.log(`File ${fileName} not found!`);
		}
	} catch (error) {
		console.log(error);
	}
};
