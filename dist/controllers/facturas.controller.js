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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturasController = void 0;
const common_1 = require("@nestjs/common");
const facturas_dto_1 = require("../interfaces/facturas.dto");
const facturas_service_1 = require("../services/facturas.service");
let FacturasController = class FacturasController {
    constructor(facturasService) {
        this.facturasService = facturasService;
    }
    async getFiltersFacturaas(query) {
        return await this.facturasService.getFiltersFacturas(query);
    }
    async getCartera(nitDocumento) {
        return await this.facturasService.validateCartera(nitDocumento);
    }
    async createTransaccion(data) {
        return await this.facturasService.createTransaccion(data);
    }
    async validate(data) {
        return await this.facturasService.validateArticle(data);
    }
};
exports.FacturasController = FacturasController;
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [facturas_dto_1.SearchFacturasDto]),
    __metadata("design:returntype", Promise)
], FacturasController.prototype, "getFiltersFacturaas", null);
__decorate([
    (0, common_1.Get)('cartera/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FacturasController.prototype, "getCartera", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [facturas_dto_1.CreateTransaccionDto]),
    __metadata("design:returntype", Promise)
], FacturasController.prototype, "createTransaccion", null);
__decorate([
    (0, common_1.Post)('/validate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [facturas_dto_1.ArticulosDto]),
    __metadata("design:returntype", Promise)
], FacturasController.prototype, "validate", null);
exports.FacturasController = FacturasController = __decorate([
    (0, common_1.Controller)('invoices'),
    __metadata("design:paramtypes", [facturas_service_1.FacturasService])
], FacturasController);
//# sourceMappingURL=facturas.controller.js.map