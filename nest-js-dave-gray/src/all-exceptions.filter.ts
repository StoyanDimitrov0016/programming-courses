import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { Request, Response } from 'express';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

type MyResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    const myResponse: MyResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: 'Internal Service Error',
    };

    if (exception instanceof HttpException) {
      myResponse.statusCode = exception.getStatus();
      myResponse.response = exception.getResponse();
    } else if (exception instanceof PrismaClientValidationError) {
      myResponse.statusCode = 422;
      myResponse.response = exception.message.replaceAll(/\n/g, '');
    }

    response.status(myResponse.statusCode).json(myResponse);
    this.logger.error(myResponse.response, AllExceptionsFilter.name);

    super.catch(exception, host);
  }
}
