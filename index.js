import yargs from 'yargs';
import { createFile, getFile, getFileInfo } from './file.js';

function invokeAction({ action, fileName, content }) {
	switch (action) {
		case 'create':
			createFile(fileName, content);
			break;

		case 'get':
			getFile();
			break;

		case 'read':
			getFileInfo(fileName);
			break;

		default:
			console.warn('\x1B[31m Unknown action type!');
	}
}

const { argv } = yargs(process.argv.slice(2));

invokeAction(argv);
