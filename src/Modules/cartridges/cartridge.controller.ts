import { Body, Controller, Post } from '@nestjs/common';
import { CartridgeService } from './cartridge.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { CreateCartridgeDto, CreatedResponseCartridgeDto } from './dto/CreateCartridgeDto';

@Controller('cartridges')
export class CartridgeController {
    constructor(private readonly createCartridgeService: CartridgeService) { }

    @Post()
    @ApiCreatedResponse({
        type: CreatedResponseCartridgeDto
    })
    async create(@Body() createDto: CreateCartridgeDto): Promise<CreatedResponseCartridgeDto> {
        const result = await this.createCartridgeService.create(createDto) as unknown as Promise<CreatedResponseCartridgeDto>;
        return result
    };
}
