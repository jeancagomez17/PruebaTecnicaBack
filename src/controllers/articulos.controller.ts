import { Controller, Get, Post, Query, Body } from "@nestjs/common";
import { ApiResponse } from "src/helpers/handler.response";
import { CreateArticuloDto } from "src/interfaces/articulo.dto";
import { ArticulosService } from "src/services/articulos.service";

@Controller('articles')
export class ArticulosController {

    constructor(private readonly articulosService: ArticulosService) {}
    @Get()
    async getArticles(@Query('search') search: string): Promise<ApiResponse> {
        return await this.articulosService.getFilters(search);
    }

    @Post()
    async createArticle(@Body() data: CreateArticuloDto): Promise<ApiResponse> {
        return await this.articulosService.createArticulo(data);
    }
}