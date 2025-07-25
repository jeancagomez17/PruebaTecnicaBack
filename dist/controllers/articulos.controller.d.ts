import { ApiResponse } from "src/helpers/handler.response";
import { CreateArticuloDto } from "src/interfaces/articulo.dto";
import { ArticulosService } from "src/services/articulos.service";
export declare class ArticulosController {
    private readonly articulosService;
    constructor(articulosService: ArticulosService);
    getArticles(search: string): Promise<ApiResponse>;
    createArticle(data: CreateArticuloDto): Promise<ApiResponse>;
}
