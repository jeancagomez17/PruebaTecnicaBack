"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NitsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const handler_response_1 = require("../helpers/handler.response");
let NitsService = class NitsService {
    constructor(prismaservice) {
        this.prismaservice = prismaservice;
    }
    async getFilters(search) {
        try {
            let where = {};
            if (search) {
                where = {
                    OR: [
                        { NitDocumento: { contains: search, mode: 'insensitive' } },
                        { NitNombre: { contains: search, mode: 'insensitive' } },
                        { NitApellido: { contains: search, mode: 'insensitive' } },
                    ],
                };
            }
            const Nits = await this.prismaservice.nits.findMany({
                where: where,
                orderBy: {
                    NitDocumento: 'asc',
                },
            });
            return handler_response_1.ResponseHandler.create(true, 'Clientes', common_1.HttpStatus.OK, Nits);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            handler_response_1.ResponseHandler.throw(`Error interno del servidor`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createNit(data) {
        try {
            const NitNew = await this.prismaservice.nits.create({ data });
            return handler_response_1.ResponseHandler.create(true, 'Cliente creado', common_1.HttpStatus.CREATED, NitNew);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            handler_response_1.ResponseHandler.throw(`Error interno del servidor al crear el cliente`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.NitsService = NitsService;
exports.NitsService = NitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], NitsService);
//# sourceMappingURL=nits.service.js.map