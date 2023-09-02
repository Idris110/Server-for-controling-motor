const express = require('express');
const WebSocket = require('ws');
const cors = require("cors");

const app = express();
const server = new WebSocket.Server({ port: 59898 });
let socList;
let init = false;

app.use(
  cors({
      origin:"http://localhost:3000",
  })
)
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Home page")
});

server.on('connection', (socket, req) => {
  console.log('Connection from', req.socket.remoteAddress);
  if(!init) {
    console.log("initiated");
    socList = socket;
    init = true;
  }

  socket.on('message', (message) => {
    console.log(message.toString());
    
    if(init) socList.send(message.toString());
    
  });
});

console.log('WebSocket server is running...');