import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

export default (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  try {
    const format = path.extname(fullPath);
    const data = fs.readFileSync(fullPath, 'utf-8');
    return format === '.json' ? JSON.parse(data) : yaml.load(data);
  } catch (e) {
    throw new Error(`File ${fullPath} does not exist`);
  }
};
