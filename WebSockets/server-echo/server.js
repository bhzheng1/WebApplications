const WebSocket = require("ws");
const PORT = 5000;
const wsServer = new WebSocket.Server({ port: PORT });

wsServer.on("connection", function (socket, request) {
  // some feedback on server console
  console.log("A client just connected!");

  // attach some behavior to the incoming socket
  socket.on("message", function (data) {
    console.log("Received message from client: " + data);
    this.send("Take this back: " + data);

    //Broadcast that message to all connected clients
    wsServer.clients.forEach((element) => {
      element.send("someone said " + data);
    });
  });
});

console.log(new Date() + " Server is listening on port " + PORT);
