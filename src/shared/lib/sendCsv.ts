import { Response } from 'express';

export function sendCsv(res: Response, data: string, filename: string) {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}.csv`);
  res.send(data);
}
