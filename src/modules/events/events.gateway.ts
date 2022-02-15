import { UseFilters } from '@nestjs/common';
import {
  BaseWsExceptionFilter,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { EventsService } from './events.service';

@WebSocketGateway(8080, {
  transports: ['websocket'],
})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly eventService: EventsService) {}

  @SubscribeMessage('join')
  async join(client, data) {
    this.eventService.enterChat(client, data.data);
  }

  @SubscribeMessage('create')
  async createChat(client) {
    this.eventService.createChat(client);
  }

  @UseFilters(new BaseWsExceptionFilter())
  @SubscribeMessage('login')
  async handlelogin(client, data) {
    const result = await this.eventService.register({
      SocketId: client.id,
      nickname: data.name,
    });

    await Promise.resolve(result).then((message) => {
      client.emit('login', { message });
    });
  }

  @SubscribeMessage('message')
  async handleMessage(client, data) {
    const result = await this.eventService.sendMessage(client, data);
    client.emit('message', { message: 'success' });
  }

  @SubscribeMessage('logout')
  async handleLogout(client) {
    const result = await this.eventService.logout(client);
    client.emit('logout', { message: result });
  }
}
