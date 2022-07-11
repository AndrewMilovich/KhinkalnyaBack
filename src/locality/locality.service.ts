import {Injectable} from '@nestjs/common';
import {Dish, Locality} from "@prisma/client";
import {PrismaService} from "../core/prisma.service";
import {CreateLocalityDto} from "./dto/create-locality.dto";

@Injectable()
export class LocalityService {
    constructor(private prismaService: PrismaService) {
    }

    async getLocality(): Promise<Locality[]> {
        return this.prismaService.locality.findMany({include: {Dish: true}});
    }

    async addLocality(data: CreateLocalityDto): Promise<Locality> {
        return this.prismaService.locality.create({data})
    }

    public async updateLocalityById(data: CreateLocalityDto, id: string): Promise<Locality> {
        return this.prismaService.locality.update({where: {id: Number(id)}, data: data})
    }

    public async deleteById(id: string) {
        return this.prismaService.locality.delete({where: {id: Number(id)}})
    }

}
