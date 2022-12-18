import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    switch (request.url) {
      case '/auth/register':
        response.status(400).json({
          errorMessage: 'User already exsist',
        });
      default:
        response.status(400).json({
          errorMessage: 'Method not supported',
          path: request.url,
        });
    }
  }
}
