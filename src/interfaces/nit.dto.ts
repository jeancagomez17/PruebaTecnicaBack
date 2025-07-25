import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNitDto {
  @IsString()
  @IsNotEmpty()
  NitDocumento: string;
  @IsString()
  @IsNotEmpty()
  NitNombre: string;
  @IsString()
  @IsNotEmpty()
  NitApellido: string;
  @IsNumber()
  @IsNotEmpty()
  NitCupo: number;
  @IsNumber()
  @IsNotEmpty()
  NitPlazo: number;
}
