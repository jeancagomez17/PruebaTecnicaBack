import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse, ResponseHandler } from 'src/helpers/handler.response';
import { CreateArticuloDto } from 'src/interfaces/articulo.dto';

@Injectable()
export class ArticulosService {
  constructor(private readonly prismaservice: PrismaService) {}

  async getFilters(search?: string): Promise<ApiResponse> {
    try {
      let where = {};
      if (search) {
        where = {
          OR: [
            { ArtCodigo: { contains: search, mode: 'insensitive' } },
            { ArtNombre: { contains: search, mode: 'insensitive' } },
            { ArtLaboratorio: { contains: search, mode: 'insensitive' } },
          ],
        };
      }
      const articulos = await this.prismaservice.articulos.findMany({ where });
      return ResponseHandler.create(
        true,
        'Artículos',
        HttpStatus.OK,
        articulos,
      );
    } catch (error) {
      console.error(error);
      if (error instanceof HttpException) {
        throw error;
      }
      ResponseHandler.throw(
        `Error interno del servidor`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createArticulo(data: CreateArticuloDto): Promise<any> {
    try {
      const articuloNew = await this.prismaservice.articulos.create({ data });
      return ResponseHandler.create(
        true,
        'Artículo creado',
        HttpStatus.CREATED,
        articuloNew,
      );
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      ResponseHandler.throw(
        `Error interno del servidor al crear el artículo`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
