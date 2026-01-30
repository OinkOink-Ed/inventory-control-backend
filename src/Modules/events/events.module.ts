import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { WsGuard } from '@common/guards/WsGuard';
import { UserModule } from '@Modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [EventsGateway, WsGuard],
})
export class EventsModule {}
