import express from "express";
import http from "http";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Server as SocketServer } from "socket.io";

const app = express();
const PORT = 10000 || 4000;
const _dirname = dirname(fileURLToPath(import.meta.url));
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(2),
    });
  });
});

app.use(express.static(join(_dirname, "../frontend/dist")));
server.listen(PORT);
console.log("server on port", PORT);
