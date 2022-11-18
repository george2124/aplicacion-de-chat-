const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

//IMPLEMENTACION
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);

httpServer.listen(PORT, () =>
  console.log("SERVER ON http://localhost:" + PORT)
);
app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let msgs = [];


io.on("connection", (socket) => {
 
  msgs.push({
    socketid: socket.id,
    email: "",
    mensaje: " se conecto un nuevo usuario " + socket.id,
  });
  io.sockets.emit("msg-list", msgs);

  socket.on("msg", (data) => {
    console.log("data", data);
    msgs.push({
      socketid: socket.id,
      email: data.email,
      mensaje: data.mensaje,
     
    });
   

    io.sockets.emit("msg-list", msgs);
  });
 
});