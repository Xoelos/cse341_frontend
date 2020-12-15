import {io} from 'socket.io-client';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const socket = io(BASE_URL);

export default class Socket {
    constructor() {
        socket.on("event", (data) => console.log(data || "Event"));
        socket.on('error', (data) => console.log(data || 'Error'));
        socket.on('connect_failed', (data) => console.log(data || 'Failed Connection'));
        socket.on("disconnect", (data) => console.log(data || "Disconnected"));
        socket.on("connect", (data) => console.log(data || "Connected"));

        this.socket = socket;
    }
}
