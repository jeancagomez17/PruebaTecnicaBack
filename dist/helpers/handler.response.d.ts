import { HttpStatus } from '@nestjs/common';
export declare class ApiResponse<T = any> {
    success: boolean;
    message: string;
    statusCode: HttpStatus;
    data?: T;
    constructor(success: boolean, message: string, statusCode: HttpStatus, data?: T);
}
export declare class ResponseHandler {
    static create<T>(success: boolean, message: string, statusCode: HttpStatus, data?: T): ApiResponse<T>;
    static throw(message: string, statusCode: HttpStatus): never;
}
