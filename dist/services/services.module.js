"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const nits_service_1 = require("./nits.service");
const database_module_1 = require("../database/database.module");
const articulos_service_1 = require("./articulos.service");
const nits_controller_1 = require("../controllers/nits.controller");
const articulos_controller_1 = require("../controllers/articulos.controller");
const facturas_service_1 = require("./facturas.service");
const facturas_controller_1 = require("../controllers/facturas.controller");
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        providers: [nits_service_1.NitsService, articulos_service_1.ArticulosService, facturas_service_1.FacturasService],
        controllers: [nits_controller_1.NitsController, articulos_controller_1.ArticulosController, facturas_controller_1.FacturasController],
        imports: [database_module_1.DatabaseModule]
    })
], ServicesModule);
//# sourceMappingURL=services.module.js.map