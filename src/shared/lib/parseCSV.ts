import * as csv from 'csv-parser';
import { Readable } from 'stream';

export async function parseCSV<T>(stream: Buffer): Promise<T[]> {
  const results: T[] = [];

  return new Promise((resolve, reject) => {
    const bufferStream = Readable.from(stream);

    bufferStream
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}
