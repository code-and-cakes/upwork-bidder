import * as fs from 'node:fs';
import * as path from 'node:path';

export function writeObjToFile(obj: object, fileName: string): void {
  const jsonString = JSON.stringify(obj, null, 2);

  writeToFile(jsonString, `${fileName}.json`);
}

export function writeToFile(content: string, fileName: string): void {
  const dest = path.resolve(__dirname, `../../../logs/${fileName}`);

  fs.writeFile(dest, content, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('Successfully wrote to file');
    }
  });
}
