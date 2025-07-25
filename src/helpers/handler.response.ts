import { HttpStatus, HttpException } from '@nestjs/common';

export class ApiResponse<T = any> {
  constructor(
    public success: boolean,
    public message: string,
    public statusCode: HttpStatus,
    public data?: T,
  ) {}
}

export class ResponseHandler {
  static create<T>(
    success: boolean,
    message: string,
    statusCode: HttpStatus,
    data?: T,
  ): ApiResponse<T> {
    return new ApiResponse(success, message, statusCode, data);
  }

  static throw(message: string, statusCode: HttpStatus): never {
    throw new HttpException(
      ResponseHandler.create(false, message, statusCode, {}),
      statusCode,
    );
  }
}