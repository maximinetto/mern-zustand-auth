import { type IncomingMessage, type Server, type ServerResponse } from "http";
import mongoose from "mongoose";
import app from "./app";
import connect from "./db/connect";

let server: Server<typeof IncomingMessage, typeof ServerResponse>;

connect()
  .then(() => {
    const PORT = 3000;
    server = app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo err: ", { err });
  });

const closeServer = (): void => {
  void mongoose.disconnect();
  server.close();
};

process.on("SIGINT", closeServer);

process.on("SIGTERM", closeServer);
