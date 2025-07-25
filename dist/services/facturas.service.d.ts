import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse } from 'src/helpers/handler.response';
import { ArticulosDto, CreateTransaccionDto, SearchFacturasDto } from 'src/interfaces/facturas.dto';
export declare class FacturasService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getFiltersFacturas(params?: SearchFacturasDto): Promise<any>;
    validateArticle(article: ArticulosDto): Promise<ApiResponse>;
    private getArticle;
    createTransaccion(dto: CreateTransaccionDto): Promise<ApiResponse>;
    validateCartera(NitDocumento: string): Promise<number>;
}
