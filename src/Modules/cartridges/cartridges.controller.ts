import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CartridgesService } from './cartridges.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateCartridgeDto, CreatedResponseCartridgeDto } from './dto/CreateCartridgeDto';

@Controller('cartridges')
export class CartridgeController {
    constructor(private readonly createCartridgeService: CartridgesService) { }

    @Post()
    @ApiCreatedResponse({
        type: CreatedResponseCartridgeDto
    })

    @HttpCode(HttpStatus.OK)
    async create(@Body() createDto: CreateCartridgeDto) {
        await this.createCartridgeService.create(createDto);
    };
}
