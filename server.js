import mongoose from "mongoose";
import app from "./app.js";

import { createServer } from "http";
import { networkInterfaces } from "os";
// import { addSocket, getSocket, socketEmit } from "./socket.js";

const localDB = process.env.DB_LOCAL;
const prodDB = process.env.DB_ATLAS.replace("<password>", process.env.DB_PASS);
export const expressServer = createServer(app);

const HOST = networkInterfaces()["Wi-Fi"][1].address;

const mongooseConnection = async () => {
  const dbConnection = await mongoose.connect(localDB);
  const conStatus = await dbConnection.connection;
  if (conStatus) {
    const server = expressServer.listen(5000, () => {
      console.log(`app is listening http://${HOST}:5000`);
    });
    return server;
  }
};

// export const socketServer = new Server( expressServer, {
//     cors :{ origin :["http://localhost:3000", `http://${HOST}:3000`]}
// })

// socketServer.on("connection",   (socket) =>{
//     console.log("===================")
//     console.log(socket.id)
//     socket.on("setSocketId",   (userId) =>{
//         addSocket(userId, socket.id)
//       })
// })
mongooseConnection();
