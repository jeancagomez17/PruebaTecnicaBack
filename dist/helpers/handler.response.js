"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = exports.ApiResponse = void 0;
const common_1 = require("@nestjs/common");
class ApiResponse {
    constructor(success, message, statusCode, data) {
        this.success = success;
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}
exports.ApiResponse = ApiResponse;
class ResponseHandler {
    static create(success, message, statusCode, data) {
        return new ApiResponse(success, message, statusCode, data);
    }
    static throw(message, statusCode) {
        throw new common_1.HttpException(ResponseHandler.create(false, message, statusCode, {}), statusCode);
    }
}
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=handler.response.js.map