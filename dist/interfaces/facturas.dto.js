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
exports.ArticulosDto = exports.CreateTransaccionDto = exports.SearchFacturasDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class SearchFacturasDto {
}
exports.SearchFacturasDto = SearchFacturasDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchFacturasDto.prototype, "documento", void 0);
class CreateTransaccionDto {
}
exports.CreateTransaccionDto = CreateTransaccionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTransaccionDto.prototype, "NitDocumento", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTransaccionDto.prototype, "NitPlazo", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ArticulosDto),
    (0, class_validator_1.IsDefined)({ each: true }),
    __metadata("design:type", Array)
], CreateTransaccionDto.prototype, "Articulos", void 0);
class ArticulosDto {
}
exports.ArticulosDto = ArticulosDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ArticulosDto.prototype, "ArtCodigo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(['-', '+']),
    __metadata("design:type", String)
], ArticulosDto.prototype, "Naturaleza", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ArticulosDto.prototype, "TranUnidades", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ArticulosDto.prototype, "TranCostos", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ArticulosDto.prototype, "TranPrecioVenta", void 0);
//# sourceMappingURL=facturas.dto.js.map