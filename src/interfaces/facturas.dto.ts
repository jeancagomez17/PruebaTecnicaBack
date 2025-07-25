import {
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
  IsDefined,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchFacturasDto {
  @IsString()
  @IsOptional()
  documento: string;
}

export class CreateTransaccionDto {
  @IsString()
  NitDocumento: string;

  @IsNumber()
  NitPlazo: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticulosDto)
  @IsDefined({ each: true })
  Articulos: ArticulosDto[];
}

export class ArticulosDto {
  @IsNumber()
  ArtCodigo: number;

  @IsString()
  @IsIn(['-', '+'])
  Naturaleza: string;

  @IsNumber()
  TranUnidades: number;

  @IsNumber()
  TranCostos: number;
  
  @IsNumber()
  TranPrecioVenta:number
}
