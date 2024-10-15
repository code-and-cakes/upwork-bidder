import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.baseUrl}`);
    next();
  }
}
