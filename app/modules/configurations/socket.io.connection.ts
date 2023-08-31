import { Server } from "socket.io";
import * as http from 'http';

export const socketServer = (server : http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
    return new Server(
        server, {
        cors : {
            origin : "http://localhost:3000",
            methods: ["GET", "POST" , "PUT" , "PATCH" , "DELETE"],
            allowedHeaders: [
              "Access-Control-Allow-Origin", 
              "Access-Control-Allow-Methods",
              'Access-Control-Allow-Credentials'
            ],
            credentials: true
        }
        }
      );
}