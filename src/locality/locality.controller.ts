import {Body, Controller, Get, Post} from '@nestjs/common';
import {LocalityService} from "./locality.service";
import {Locality} from "@prisma/client";
import {CreateLocalityDto} from "./dto/create-locality.dto";

@Controller('locality')
export class LocalityController {
    constructor(private localityService: LocalityService) {
    }

    @Get()
    GetLocality() {
        return this.localityService.getLocality();
    }

    @Post()
    AddLocality(@Body() data: CreateLocalityDto) {
        return this.localityService.addLocality(data)
    }


}
