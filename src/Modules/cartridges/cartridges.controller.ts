import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CartridgesService } from './cartridges.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateCartridgeDto } from './dto/CreateCartridgeDto';

@ApiTags('Cartridges')
@Controller('cartridges')
export class CartridgesController {
    constructor(private readonly createCartridgeService: CartridgesService) { }

    @Post()
    @ApiCreatedResponse({
        type: null
    })
    @HttpCode(HttpStatus.OK)
    async create(@Body() createDto: CreateCartridgeDto) {
        await this.createCartridgeService.create(createDto);
    };
}
