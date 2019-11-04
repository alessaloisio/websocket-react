import http from "http";
import express from "express";
import socket from "socket.io";
import path from "path";

const PORT = process.env.PORT || 3000;
const STATIC_DIR = path.join(__dirname, "../", "client", "build");

const app = express();
const server = http.Server(app);
const io = socket(server);

app.use(express.static(STATIC_DIR));
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

io.on("connection", client => {
  console.log(`Client ${client.id} connected`);
  client.on("disconnect", () => console.log("Client disconnected"));
});

setInterval(() => {
  const time = new Date();

  const twoDigit = str => {
    str = "00" + str;
    str = str.substring(str.length - 2);
    return str;
  };

  io.emit(
    "updateTime",
    `${twoDigit(time.getHours())} :
    ${twoDigit(time.getMinutes())} :
    ${twoDigit(time.getSeconds())}`
  );
}, 1000);
