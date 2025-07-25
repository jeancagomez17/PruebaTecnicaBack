import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateArticuloDto {
  @IsString()
  @IsNotEmpty()
  ArtNombre: string;
  @IsString()
  @IsNotEmpty()
  ArtLaboratorio: string;
  @IsNumber()
  @IsNotEmpty()
  ArtSaldo: number;
  @IsNumber()
  @IsNotEmpty()
  ArtPrecioVenta: number;
  @IsNumber()
  @IsNotEmpty()
  ArtCostos: number;
}
