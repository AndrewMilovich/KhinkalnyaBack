import {Injectable} from '@nestjs/common';
import {Dish, Locality} from "@prisma/client";
import {PrismaService} from "../core/prisma.service";
import {CreateLocalityDto} from "./dto/create-locality.dto";
import {S3Service} from "../s3/s3.service";

@Injectable()
export class LocalityService {
    constructor(private prismaService: PrismaService,private s3:S3Service) {
    }

    async getLocality(): Promise<Locality[]> {
        return this.prismaService.locality.findMany({include: {Dish: true}});
    }

    async addLocality(data: Locality,file): Promise<Locality> {
        const img = await this.s3.uploadFile(file)
        return this.prismaService.locality.create({data:{
            ...data,
                image: img.Location
            }})
    }

    public async updateLocalityById(data: CreateLocalityDto, id: string): Promise<Locality> {
        return this.prismaService.locality.update({where: {id: Number(id)}, data: data})
    }

    public async deleteById(id: string) {
        return this.prismaService.locality.delete({where: {id: Number(id)}})
    }


}
