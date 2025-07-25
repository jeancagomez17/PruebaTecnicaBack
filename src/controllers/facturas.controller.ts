import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ApiResponse } from "src/helpers/handler.response";
import { ArticulosDto, CreateTransaccionDto, SearchFacturasDto } from "src/interfaces/facturas.dto";
import { FacturasService } from "src/services/facturas.service";

@Controller('invoices')
export class FacturasController {
    constructor(private readonly facturasService:FacturasService){}

    @Get('')
    async getFiltersFacturaas(@Query() query:SearchFacturasDto):Promise<ApiResponse>{
        return await this.facturasService.getFiltersFacturas(query)
    }
    @Get('cartera/:id')
    async getCartera(@Param('id') nitDocumento:string):Promise<number>{
        return await this.facturasService.validateCartera(nitDocumento)
    }
    @Post('/create')
    async createTransaccion(@Body() data:CreateTransaccionDto):Promise<any>{
        return await this.facturasService.createTransaccion(data)
    }

    @Post('/validate')
    async validate(@Body() data:ArticulosDto):Promise<ApiResponse>{
        return await this.facturasService.validateArticle(data)
    }
}