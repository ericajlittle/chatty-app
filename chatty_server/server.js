// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const PORT = 8080;
const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

var countConnection = 0;




wss.on('connection', (ws) => {
  console.log('Client connected');
  countConnection++;
  let message = {
    type: 'counter',
    countConnection: countConnection
  }
  broadcast(message);

  ws.on('message', function incoming(message) {
    console.log('recenived: %s', message);
    message = JSON.parse(message);

    switch(message.type) {
      case "postMessage":
        message.type = "incomingMessage";
        console.log(message);
        broadcast(message);
        break;

      case "postNotification":
        message.type = "incomingNotification";
        console.log(message);
        broadcast(message);
        break;

      default:
        console.error("bad message type", message.type);
    }

  });

  function broadcast(data) {
    wss.clients.forEach(function each(ws) {
      if (ws.readyState === WebSocket.OPEN) {
        newData = JSON.stringify(data);
        ws.send(newData);
        // console.log('newData: ', newData);
      }
    });
  };

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    countConnection--
    let message = {
    type: 'counter',
    countConnection: countConnection
  }
  broadcast(message);
    console.log("client minus: ", countConnection);

  });
});


