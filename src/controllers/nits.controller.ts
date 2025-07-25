import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiResponse } from "src/helpers/handler.response";
import { CreateNitDto } from "src/interfaces/nit.dto";
import { NitsService } from "src/services/nits.service";

@Controller('nits')
export class NitsController {
    constructor(private readonly nitsService: NitsService) {}
    
    @Get()
    async getNits(@Query('search') search: string):Promise<ApiResponse>  {
        return await this.nitsService.getFilters(search);
    }
    @Post()
    async createNit(@Body() data: CreateNitDto):Promise<ApiResponse> {
        return await this.nitsService.createNit(data);
    }
}