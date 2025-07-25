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
exports.FacturasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
const handler_response_1 = require("../helpers/handler.response");
let FacturasService = class FacturasService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getFiltersFacturas(params) {
        try {
            let where = null;
            if (params) {
                where = {
                    FacNit: params.documento,
                };
            }
            const Facturas = await this.prismaService.facturas.findMany({
                where,
                orderBy: {
                    FacFecha: 'desc',
                },
            });
            return handler_response_1.ResponseHandler.create(true, 'Facturas', common_1.HttpStatus.OK, Facturas);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            handler_response_1.ResponseHandler.throw(`Error interno del servidor al crear el cliente`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateArticle(article) {
        try {
            const articulo = await this.getArticle(article.ArtCodigo);
            if (article.Naturaleza == '-') {
                if (article.TranUnidades > articulo.ArtSaldo) {
                    handler_response_1.ResponseHandler.throw(`El articulo ${articulo.ArtNombre} no puede superar la cantidad de ${articulo.ArtSaldo}`, common_1.HttpStatus.CONFLICT);
                }
                if (article.TranPrecioVenta < articulo.ArtCostos) {
                    handler_response_1.ResponseHandler.throw(`El precio de venta del articulo ${articulo.ArtNombre} no puede ser menor a $ ${articulo.ArtCostos}`, common_1.HttpStatus.CONFLICT);
                }
            }
            if (article.Naturaleza == '+') {
                return;
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            handler_response_1.ResponseHandler.throw(`Error interno del servidor al crear el cliente`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getArticle(ArtCodigo) {
        try {
            const data = await this.prismaService.articulos.findFirst({
                where: {
                    ArtCodigo,
                },
            });
            if (!data) {
                handler_response_1.ResponseHandler.throw('No existe el articulo en el sistema', common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async createTransaccion(dto) {
        try {
            const data = await this.prismaService.$transaction(async (tx) => {
                const nit = await tx.nits.findUnique({
                    where: { NitDocumento: dto.NitDocumento },
                });
                if (!nit)
                    handler_response_1.ResponseHandler.throw('El NIT no existe', common_1.HttpStatus.CONFLICT);
                let totalVenta = 0;
                let totalCosto = 0;
                for (const item of dto.Articulos) {
                    const totalItemVenta = item.TranUnidades * item.TranPrecioVenta;
                    const totalItemCosto = item.TranUnidades * item.TranCostos;
                    if (item.Naturaleza === '-') {
                        totalVenta += totalItemVenta;
                    }
                    else if (item.Naturaleza === '+') {
                        totalCosto += totalItemCosto;
                    }
                }
                if (nit.NitCupo !== null && nit.NitCupo < totalVenta) {
                    handler_response_1.ResponseHandler.throw('Cupo insuficiente para realizar la venta', common_1.HttpStatus.CONFLICT);
                }
                const fechaActual = new Date();
                const fechaVencimiento = new Date();
                fechaVencimiento.setDate(fechaActual.getDate() + dto.NitPlazo);
                const factura = await tx.facturas.create({
                    data: {
                        FacNit: dto.NitDocumento,
                        FacFecha: fechaActual,
                        FacFechaVencimiento: fechaVencimiento,
                        FacVentaTotal: totalVenta,
                        FacCostoTotal: totalCosto,
                    },
                });
                for (const item of dto.Articulos) {
                    await this.validateArticle(item);
                    const totalItemVenta = item.TranUnidades * item.TranPrecioVenta;
                    const totalItemCosto = item.TranUnidades * item.TranCostos;
                    await tx.transaccionFactura.create({
                        data: {
                            TranNumeroFactura: factura.FacNumero,
                            TranCodigoArticulo: item.ArtCodigo,
                            TranNaturaleza: item.Naturaleza,
                            TranUnidades: item.TranUnidades,
                            TranPrecioVenta: item.TranPrecioVenta,
                            TranCostos: item.TranCostos,
                            TranTotalVenta: totalItemVenta,
                            TranTotalCostos: totalItemCosto,
                        },
                    });
                }
                if (totalVenta > 0) {
                    await tx.nits.update({
                        where: { NitDocumento: dto.NitDocumento },
                        data: {
                            NitCupo: {
                                decrement: totalVenta,
                            },
                        },
                    });
                }
                return factura;
            });
            return handler_response_1.ResponseHandler.create(true, 'Registro de factura exitoso', common_1.HttpStatus.CREATED, data);
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            handler_response_1.ResponseHandler.throw(`Error interno del servidor al crear el cliente`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async validateCartera(NitDocumento) {
        try {
            const resultado = await this.prismaService.transaccionFactura.aggregate({
                _sum: {
                    TranTotalVenta: true,
                },
                where: {
                    TranNaturaleza: '-',
                    Facturas: {
                        FacNit: NitDocumento,
                    },
                },
            });
            return resultado._sum.TranTotalVenta ?? 0;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            handler_response_1.ResponseHandler.throw(`Error interno del servidor al crear el cliente`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.FacturasService = FacturasService;
exports.FacturasService = FacturasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FacturasService);
//# sourceMappingURL=facturas.service.js.map