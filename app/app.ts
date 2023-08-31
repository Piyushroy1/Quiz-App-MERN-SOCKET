import express from "express";
import { databaseConnection } from "./modules/configurations/connection";
import { registerRoutes } from "./modules/routes/routes.register";
import http from 'http';
import { socketServer } from "./modules/configurations/socket.io.connection";
import { socketHandler } from "./modules/common/utility/socket/socket.service";

export const startServer = () => {
  try {
    const app = express();
    const server = http.createServer(app);
    const io = socketServer(server);

    socketHandler(io);

    const { PORT } = process.env;
    registerRoutes(app);
    server.listen(PORT, () => {
      console.log(`SERVER STARTED ON PORT ${PORT}`);
      databaseConnection();
    });
  } catch (error) {
    throw error;
  }
};
