import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException, BadRequestException)
export class TaskExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof NotFoundException ? 404 : 400;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: exception.constructor.name.replace('Exception', ''),
    });
  }
}
