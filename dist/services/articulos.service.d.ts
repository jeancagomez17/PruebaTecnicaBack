import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse } from 'src/helpers/handler.response';
import { CreateArticuloDto } from 'src/interfaces/articulo.dto';
export declare class ArticulosService {
    private readonly prismaservice;
    constructor(prismaservice: PrismaService);
    getFilters(search?: string): Promise<ApiResponse>;
    createArticulo(data: CreateArticuloDto): Promise<any>;
}
