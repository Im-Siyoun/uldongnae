import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { EventsService } from './events.service';

@WebSocketGateway(80, {
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

  @SubscribeMessage('login')
  async handlelogin(client, data) {
    const result = this.eventService.register({
      SocketId: client.id,
      nickname: data.name,
    });

    client.emit('register', { message: result });
  }

  @SubscribeMessage('message')
  async handleMessage(client, data) {
    const recipientId = await this.eventService.sendMessage(data.nickname);
    client.to(recipientId.SocketId).emit('message', { message: data.message });
  }

  @SubscribeMessage('logout')
  async handleLogout(client) {
    const result = await this.eventService.logout(client);
    client.emit('logout', { message: result });
  }
}
