const WebSocket = require("ws");
// const serverAddress = "ws://127.0.0.1:5000";
const serverAddress = "wss://long-short-profit.glitch.me/";
const ws = new WebSocket(serverAddress, {
  headers: {
    "user-agent": "Mozilla",
  },
});
ws.on("open", function () {
  this.send("Hello server!");
});

ws.on("message", function (data) {
  console.log("Received msg from the server: " + data);
});
