import { io } from 'socket.io-client';

export function createSocket() {
	const socket = io('http://localhost:5001');
	return socket;
}
