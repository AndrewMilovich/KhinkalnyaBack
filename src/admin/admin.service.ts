import { Injectable } from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";

@Injectable()
export class AdminService {
    constructor(prismaService:PrismaService) {
    }

}
