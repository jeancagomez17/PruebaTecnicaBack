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
exports.ArticulosController = void 0;
const common_1 = require("@nestjs/common");
const articulo_dto_1 = require("../interfaces/articulo.dto");
const articulos_service_1 = require("../services/articulos.service");
let ArticulosController = class ArticulosController {
    constructor(articulosService) {
        this.articulosService = articulosService;
    }
    async getArticles(search) {
        return await this.articulosService.getFilters(search);
    }
    async createArticle(data) {
        return await this.articulosService.createArticulo(data);
    }
};
exports.ArticulosController = ArticulosController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticulosController.prototype, "getArticles", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [articulo_dto_1.CreateArticuloDto]),
    __metadata("design:returntype", Promise)
], ArticulosController.prototype, "createArticle", null);
exports.ArticulosController = ArticulosController = __decorate([
    (0, common_1.Controller)('articles'),
    __metadata("design:paramtypes", [articulos_service_1.ArticulosService])
], ArticulosController);
//# sourceMappingURL=articulos.controller.js.map