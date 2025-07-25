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
exports.NitsController = void 0;
const common_1 = require("@nestjs/common");
const nit_dto_1 = require("../interfaces/nit.dto");
const nits_service_1 = require("../services/nits.service");
let NitsController = class NitsController {
    constructor(nitsService) {
        this.nitsService = nitsService;
    }
    async getNits(search) {
        return await this.nitsService.getFilters(search);
    }
    async createNit(data) {
        return await this.nitsService.createNit(data);
    }
};
exports.NitsController = NitsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NitsController.prototype, "getNits", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nit_dto_1.CreateNitDto]),
    __metadata("design:returntype", Promise)
], NitsController.prototype, "createNit", null);
exports.NitsController = NitsController = __decorate([
    (0, common_1.Controller)('nits'),
    __metadata("design:paramtypes", [nits_service_1.NitsService])
], NitsController);
//# sourceMappingURL=nits.controller.js.map