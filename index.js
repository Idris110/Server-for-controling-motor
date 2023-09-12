const express = require('express');
const WebSocket = require('ws');
const cors = require("cors");

const app = express();
const server = new WebSocket.Server({ port: 59898 });
let wSoc, rSoc;
let wInit = false, rInit = false;

app.use(
  cors({
      origin:"http://localhost:3000",
  })
)
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Home page");
});

server.on('connection', (socket, req) => {
  console.log('Connection from', req.socket.remoteAddress);
  if(!wInit) {
    console.log("First one Connected");
    wSoc = socket;
    wInit = true;
  }
  else if(!rInit){
    console.log("Second one Connected");
    rSoc = socket;
    rInit = true;
  }

  
  socket.on('message', (message) => { 
    try{
      const recd = JSON.parse(message.toString());
      console.log(recd);
      if(wInit && recd.from === "rasp") wSoc.send(message.toString());
      if(rInit && recd.from === "react") rSoc.send(message.toString());
    }
    catch(err){
      console.log(err);
    }
    // console.log(message.toString());
    // console.log("wInit :", wInit);
  });

});

// console.log('WebSocket server is running...');

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));