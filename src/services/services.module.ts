import { Module } from "@nestjs/common";
import { NitsService } from "./nits.service";
import { DatabaseModule } from "src/database/database.module";
import { ArticulosService } from "./articulos.service";
import { NitsController } from "src/controllers/nits.controller";
import { ArticulosController } from "src/controllers/articulos.controller";
import { FacturasService } from "./facturas.service";
import { FacturasController } from "src/controllers/facturas.controller";

@Module({
    providers:[ NitsService, ArticulosService, FacturasService],
    controllers:[NitsController, ArticulosController, FacturasController],
    imports:[DatabaseModule]
})
export class ServicesModule {}