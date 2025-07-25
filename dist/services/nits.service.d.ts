import { PrismaService } from 'src/database/prisma.service';
import { CreateNitDto } from 'src/interfaces/nit.dto';
export declare class NitsService {
    private readonly prismaservice;
    constructor(prismaservice: PrismaService);
    getFilters(search?: string): Promise<any>;
    createNit(data: CreateNitDto): Promise<any>;
}
