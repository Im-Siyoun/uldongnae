import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Catch(Error, WsException)
export class WebsocketsExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, socket: any) {
    socket.emit('exception', {
      status: 'error',
      message: exception.message,
    });
  }
}
