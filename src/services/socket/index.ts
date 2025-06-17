import {io} from 'socket.io-client';
const SOCKET_URL = 'ws://10.0.2.2:3333';

const socketMessage = io(`${SOCKET_URL}/messages`, {
  transports: ['websocket'],
  autoConnect: false,
});

export default socketMessage;
