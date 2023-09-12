'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.on('close', () => console.log('Client disconnected'));
// });

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);

let wSoc, rSoc;
let wInit = false, rInit = false;

wss.on('connection', (socket, req) => {
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
