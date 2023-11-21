import express from 'express';
import { createFile, getFiles } from './files.js';

const filesRouter = express.Router();

filesRouter.get('/', getFiles);

filesRouter.get('/:files', createFile);

filesRouter.post('/');

export { filesRouter };
