export declare class SearchFacturasDto {
    documento: string;
}
export declare class CreateTransaccionDto {
    NitDocumento: string;
    NitPlazo: number;
    Articulos: ArticulosDto[];
}
export declare class ArticulosDto {
    ArtCodigo: number;
    Naturaleza: string;
    TranUnidades: number;
    TranCostos: number;
    TranPrecioVenta: number;
}
