import * as fs from 'node:fs';
import * as path from 'node:path';

export function writeToFile(obj: object, fileName: string): void {
  const jsonString = JSON.stringify(obj, null, 2);

  const dest = path.resolve(__dirname, `../../../../logs/${fileName}.json`);

  fs.writeFile(dest, jsonString, (err) => {
    if (err) {
      console.error('Error writing to file', err);
    } else {
      console.log('Successfully wrote to file');
    }
  });
}
