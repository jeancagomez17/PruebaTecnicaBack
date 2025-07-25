import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Articulos, Facturas } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ApiResponse, ResponseHandler } from 'src/helpers/handler.response';
import {
  ArticulosDto,
  CreateTransaccionDto,
  SearchFacturasDto,
} from 'src/interfaces/facturas.dto';

@Injectable()
export class FacturasService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFiltersFacturas(params?: SearchFacturasDto): Promise<any> {
    try {
      let where: any = null;
      if (params) {
        where = {
          FacNit: params.documento,
        };
      }
      const Facturas = await this.prismaService.facturas.findMany({
        where,
        orderBy: {
          FacFecha: 'desc',
        },
      });
      return ResponseHandler.create(true, 'Facturas', HttpStatus.OK, Facturas);
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

  async validateArticle(article: ArticulosDto): Promise<ApiResponse> {
    try {
      const articulo = await this.getArticle(article.ArtCodigo);
      if (article.Naturaleza == '-') {
        if (article.TranUnidades > articulo.ArtSaldo) {
          ResponseHandler.throw(
            `El articulo ${articulo.ArtNombre} no puede superar la cantidad de ${articulo.ArtSaldo}`,
            HttpStatus.CONFLICT,
          );
        }
        if (article.TranPrecioVenta < articulo.ArtCostos) {
          ResponseHandler.throw(
            `El precio de venta del articulo ${articulo.ArtNombre} no puede ser menor a $ ${articulo.ArtCostos}`,
            HttpStatus.CONFLICT,
          );
        }
      }
      if (article.Naturaleza == '+') {
        return;
      }
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

  private async getArticle(ArtCodigo: number): Promise<Articulos> {
    try {
      const data = await this.prismaService.articulos.findFirst({
        where: {
          ArtCodigo,
        },
      });
      if (!data) {
        ResponseHandler.throw(
          'No existe el articulo en el sistema',
          HttpStatus.NOT_FOUND,
        );
      }
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createTransaccion(dto: CreateTransaccionDto): Promise<ApiResponse> {
    try {
      const data = await this.prismaService.$transaction(async (tx) => {
        // Obtener el NIT y validar existencia
        const nit = await tx.nits.findUnique({
          where: { NitDocumento: dto.NitDocumento },
        });

        if (!nit)
          ResponseHandler.throw('El NIT no existe', HttpStatus.CONFLICT);

        //Calcular Totales (sólo "-" afecta el cupo y suma a venta)
        let totalVenta = 0;
        let totalCosto = 0;

        for (const item of dto.Articulos) {
          const totalItemVenta = item.TranUnidades * item.TranPrecioVenta;
          const totalItemCosto = item.TranUnidades * item.TranCostos;

          if (item.Naturaleza === '-') {
            totalVenta += totalItemVenta;
          } else if (item.Naturaleza === '+') {
            totalCosto += totalItemCosto;
          }
        }

        // Validar cupo disponible para ventas
        if (nit.NitCupo !== null && nit.NitCupo < totalVenta) {
          ResponseHandler.throw(
            'Cupo insuficiente para realizar la venta',
            HttpStatus.CONFLICT,
          );
        }

        // 4. Crear la factura
        const fechaActual = new Date();
        const fechaVencimiento = new Date();
        fechaVencimiento.setDate(fechaActual.getDate() + dto.NitPlazo);

        const factura = await tx.facturas.create({
          data: {
            FacNit: dto.NitDocumento,
            FacFecha: fechaActual,
            FacFechaVencimiento: fechaVencimiento,
            FacVentaTotal: totalVenta,
            FacCostoTotal: totalCosto,
          },
        });

        //Guardar transacciones
        for (const item of dto.Articulos) {
          await this.validateArticle(item);
          const totalItemVenta = item.TranUnidades * item.TranPrecioVenta;
          const totalItemCosto = item.TranUnidades * item.TranCostos;

          await tx.transaccionFactura.create({
            data: {
              TranNumeroFactura: factura.FacNumero,
              TranCodigoArticulo: item.ArtCodigo,
              TranNaturaleza: item.Naturaleza,
              TranUnidades: item.TranUnidades,
              TranPrecioVenta: item.TranPrecioVenta,
              TranCostos: item.TranCostos,
              TranTotalVenta: totalItemVenta,
              TranTotalCostos: totalItemCosto,
            },
          });
        }

        // Descontar el cupo del NIT si hubo venta
        if (totalVenta > 0) {
          await tx.nits.update({
            where: { NitDocumento: dto.NitDocumento },
            data: {
              NitCupo: {
                decrement: totalVenta,
              },
            },
          });
        }

        return factura;
      });
      return ResponseHandler.create(
        true,
        'Registro de factura exitoso',
        HttpStatus.CREATED,
        data,
      );
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

  async validateCartera(NitDocumento: string): Promise<number> {
    try {
      const resultado = await this.prismaService.transaccionFactura.aggregate({
        _sum: {
          TranTotalVenta: true,
        },
        where: {
          TranNaturaleza: '-',
          Facturas: {
            FacNit: NitDocumento,
          },
        },
      });

      return resultado._sum.TranTotalVenta ?? 0;
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
