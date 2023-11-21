import fs from 'fs/promises';
import path from 'path';
import { validateData } from './helpers/validateData.js';
import { checkExtension } from './helpers/checkExtension.js';

export const createFile = async (req, res, next) => {
  const { fileName, content } = req.body;
  console.log(req.body);

  const fileCheck = {
    fileName,
    content,
  };
  const checkData = validateData(fileCheck);
  if (checkData.error) {
    res.status(400).json({
      message: `Please specified ${checkData.error.details[0].path[0]} parameter`,
    });
  }
  const { fileExtension, result } = checkExtension(fileName);

  if (!result) {
    res.status(400).json({
      message: `This APP doesn't support extension ${fileExtension}. Enter valid extension`,
    });
  }

  const filePath = path.resolve('files', fileName);
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    res.status(201).json({ message: 'Well done' });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
  }
};

export const getFiles = async (req, res, next) => {
  const pathHolder = path.resolve('files');
  try {
    const files = await fs.readdir(pathHolder);
    if (!files.length) {
      res.status(404).json({ message: 'Sorry' });
    }
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
