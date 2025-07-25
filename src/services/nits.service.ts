import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ResponseHandler } from 'src/helpers/handler.response';
import { CreateNitDto } from 'src/interfaces/nit.dto';

@Injectable()
export class NitsService {
  constructor(private readonly prismaservice: PrismaService) {}

  async getFilters(search?: string): Promise<any> {
    try {
      let where = {};
      if (search) {
        where = {
          OR: [
            { NitDocumento: { contains: search, mode: 'insensitive' } },
            { NitNombre: { contains: search, mode: 'insensitive' } },
            { NitApellido: { contains: search, mode: 'insensitive' } },
          ],
        };
      }
      const Nits = await this.prismaservice.nits.findMany({
        where: where,
        orderBy: {
          NitDocumento: 'asc',
        },
      });
      return ResponseHandler.create(true, 'Clientes', HttpStatus.OK, Nits);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      ResponseHandler.throw(
        `Error interno del servidor`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createNit(data:CreateNitDto):Promise<any>{
    try {
        const NitNew = await this.prismaservice.nits.create({data});
        return ResponseHandler.create(true, 'Cliente creado', HttpStatus.CREATED, NitNew);
    } catch (error) {   
        if (error instanceof HttpException) {
            throw error;
        }
        ResponseHandler.throw(
            `Error interno del servidor al crear el cliente`,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}



