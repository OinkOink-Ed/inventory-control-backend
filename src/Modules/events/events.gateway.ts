import { WsGuard } from '@common/guards/WsGuard';
import { GetResponseUserCardDto } from '@Modules/user/dto/GetResponseUserCardDto';
import { UserService } from '@Modules/user/user.service';
import { UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UpdateUserEventType } from './types/UpdateUserEventType';
import { CreateKabinetEventType } from './types/CreateKabinetEventType';
import { DecomissioningCartrdigeEventType } from './types/DecomissioningCartrdigeEventType';
import { DeliveryCartridgeEventType } from './types/DeliveryCartridgeEventType';
import { MovementCartridgeEventType } from './types/MovementCartridgeEventType';
import { ReceivingCartridgeEventType } from './types/ReceivingCartridgeEventType';

//Нужно будет добавить используемые типы в swagger, чтобы kubb их мне достал для client и у меня была согласованность типов

interface CustomSocket extends Socket {
  data: GetResponseUserCardDto;
  user: any;
}

@WebSocketGateway({
  cors: {
    origin: true,
    credentials: true,
  },
})
@UseGuards(WsGuard)
export class EventsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  afterInit(server: Server) {
    server.use(async (client: CustomSocket, next) => {
      const token = client.handshake.auth?.token;
      if (!token) return next(new Error('Unauthorized'));
      try {
        const payload = await this.jwtService.verifyAsync(token);
        client.user = payload;
        next();
      } catch {
        next(new Error('Unauthorized'));
      }
    });
  }

  async handleConnection(client: CustomSocket) {
    const user = await this.userService.getProfileCard(client.user);

    if (!user) {
      client.disconnect();
      return;
    }

    client.data = user;

    await this.subscribeToRooms(client);
  }

  async subscribeToRooms(client: CustomSocket) {
    const user = client.data;
    client.join(`user:${user.id}`);

    switch (user.role.roleName) {
      case 'admin':
        await this.subscribeAdmin(client);

        break;
      case 'user':
        await this.subscribeUser(client);
        break;
      case 'staff':
        await this.subscribeStaff(client);
        break;
    }
  }

  private async subscribeAdmin(client: CustomSocket) {
    const user = client.data;
    user.division.forEach((div) => {
      client.join(`division:${div.id}`);
    });
  }

  private async subscribeUser(client: CustomSocket) {
    const user = client.data;
    user.division.forEach((div) => {
      client.join(`division:${div.id}`);
    });
  }

  private async subscribeStaff(client: CustomSocket) {
    const user = client.data;
    client.join(`user:${user.id}`);
  }

  @OnEvent('update.user')
  async handleUserUpdatedEvent(data: UpdateUserEventType) {
    this.server.to(`user:${data.userId}`).emit('invalidateUserCard', data);

    data.division?.forEach((divisionId) => {
      this.server
        .to(`division:${divisionId.id}`)
        .emit('invalidateUserCard', data);
    });
  }

  //Возможно стоит сделать выше Set и оттуда уже брать комнаты division
  @OnEvent('create.model.cartridge')
  async handleCartridgeModelCreateEvent() {
    const rooms = this.server.sockets.adapter.rooms;

    for (const roomName of rooms.keys()) {
      if (roomName.startsWith('division:')) {
        this.server.to(roomName).emit('invalidateModelCartridges');
      }
    }
  }

  @OnEvent('create.kabinet')
  async handleKabinetCreateEvent(data: CreateKabinetEventType) {
    this.server
      .to(`division:${data.division.id}`)
      .emit('invalidateKabinets', data);
  }

  @OnEvent('create.user')
  async handleUserCreateEvent() {
    this.server.to(`division`).emit('invalidateUsersList');
  }

  @OnEvent('decomissioning.cartridge')
  async handleDecomissioningCartridge(data: DecomissioningCartrdigeEventType) {
    this.server
      .to(`division:${data.warehouseId}`)
      .emit(`invalidateCartridgesOfDecomissioning`, data);
  }

  @OnEvent('delivery.cartridge')
  async handleDeliveryCartridge(data: DeliveryCartridgeEventType) {
    this.server
      .to(`user:${data.userId}`)
      .emit('invalidateCartridgeOfDelivery', data);

    this.server
      .to(`division:${data.divisionId}`)
      .emit('invalidateCartridgeOfDelivery', data);
  }

  @OnEvent('movement.cartridge')
  async handleMovementCartridge(data: MovementCartridgeEventType) {
    this.server
      .to(`division:${data.oldDivisionId}`)
      .emit('invalidateCartridgeOfMovement', data);

    this.server
      .to(`division:${data.newDivisionId}`)
      .emit('invalidateCartridgeOfMovement', data);
  }

  @OnEvent('receiving.cartridge')
  async handleReceivingCartridge(data: ReceivingCartridgeEventType) {
    this.server
      .to(`division:${data.warehouseId}`)
      .emit('invalidateCartridgeOfReceiving', data);
  }

  @OnEvent('dashboard.cartridge.remnants')
  async handleDashboardCartridgeremnats() {
    this.server.to(``).emit(``);
  }
}
