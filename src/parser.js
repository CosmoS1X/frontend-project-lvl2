import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

export default (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  try {
    return yaml.load(fs.readFileSync(fullPath, 'utf-8'));
  } catch (e) {
    throw new Error(`File ${fullPath} does not exist`);
  }
};
