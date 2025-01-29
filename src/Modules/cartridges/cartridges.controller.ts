import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CartridgesService } from './cartridges.service';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiRequestTimeoutResponse, ApiTags } from '@nestjs/swagger';
import { CreateCartridgeDto } from './dto/CreateCartridgeDto';
import { ErrorResponse400, ErrorResponse403, ErrorResponse404, ErrorResponse408 } from 'src/common/errorTypes';
import { SuccessResponse200 } from 'src/common/successTypes';

@ApiTags('Cartridges')
@Controller('cartridges')
export class CartridgesController {
    constructor(private readonly createCartridgeService: CartridgesService) { }

    @Post()
    @ApiCreatedResponse({
        type: () => SuccessResponse200
    })
    @ApiBadRequestResponse({
        type: () => ErrorResponse400
      })
      @ApiRequestTimeoutResponse({
        type: () => ErrorResponse408
      })
    @ApiForbiddenResponse({
        type: () => ErrorResponse403
    })
    @ApiNotFoundResponse({
        type: () => ErrorResponse404
    })
    @HttpCode(HttpStatus.OK)
    async create(@Body() createDto: CreateCartridgeDto) {
        await this.createCartridgeService.create(createDto);
        return {
            statusCode: 200,
            message: 'Картриджи успешно добавлены',
          };
    };
}
