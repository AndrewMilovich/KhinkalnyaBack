import {Body, Controller, Get, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {LocalityService} from "./locality.service";
import {Locality} from "@prisma/client";
import {CreateLocalityDto} from "./dto/create-locality.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('locality')
export class LocalityController {
    constructor(private localityService: LocalityService) {
    }

    @Get()
    GetLocality() {
        return this.localityService.getLocality();
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    AddLocality(@Body() data: Locality,@UploadedFile() file) {
        return this.localityService.addLocality(data,file)
    }


}
