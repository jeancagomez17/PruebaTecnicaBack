import { ApiResponse } from "src/helpers/handler.response";
import { ArticulosDto, CreateTransaccionDto, SearchFacturasDto } from "src/interfaces/facturas.dto";
import { FacturasService } from "src/services/facturas.service";
export declare class FacturasController {
    private readonly facturasService;
    constructor(facturasService: FacturasService);
    getFiltersFacturaas(query: SearchFacturasDto): Promise<ApiResponse>;
    getCartera(nitDocumento: string): Promise<number>;
    createTransaccion(data: CreateTransaccionDto): Promise<any>;
    validate(data: ArticulosDto): Promise<ApiResponse>;
}
