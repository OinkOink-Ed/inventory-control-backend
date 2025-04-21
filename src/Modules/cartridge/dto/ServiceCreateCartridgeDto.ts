import { PickType } from '@nestjs/swagger';
import { RequestCreateReceivingDto } from 'src/Modules/receiving/dto/ReceivingBaseRequestDto';

export class ServiceCreateCartridgeDto extends PickType(
  RequestCreateReceivingDto,
  ['count', 'model', 'warehouse', 'state'],
) {}
