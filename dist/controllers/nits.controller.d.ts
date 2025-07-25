import { ApiResponse } from "src/helpers/handler.response";
import { CreateNitDto } from "src/interfaces/nit.dto";
import { NitsService } from "src/services/nits.service";
export declare class NitsController {
    private readonly nitsService;
    constructor(nitsService: NitsService);
    getNits(search: string): Promise<ApiResponse>;
    createNit(data: CreateNitDto): Promise<ApiResponse>;
}
