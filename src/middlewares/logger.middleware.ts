import { NestMiddleware, Logger, UnauthorizedException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { NextFunction, Request, Response } from 'express';

export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP LOGGER');

  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    this.logger.log(`${req.method} ${req.originalUrl} ${req.ip}`);
    next();
  }
}
