import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [AccessControlService],
  exports: [AccessControlService],
})
export class AccessControlModule {}
