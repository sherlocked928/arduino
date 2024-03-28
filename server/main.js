import express from "express";
import { WebSocketServer } from "ws";
import path from "path";
import { v4 as uuid } from "uuid";

const __dirname = path.resolve();
console.log(__dirname);
const app = express();
const port = process.env.PORT || 80;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const wss = new WebSocketServer({ server });

class WebSocketItems {
  static arduino = [];
  static clients = [];
  static payload = {
    temperature: "--",
    humidity: "--",
    IR_value: false,
    distance: "--",
    ldrValue: "--",
    gasLevel: "--",
    relay1: false,
    relay2: true,
    relay3: false,
    relay4: false,
    relay5: false,
  };
}

wss.on("connection", (ws, incomeMessage) => {
  console.log(incomeMessage.url);
  const connectionID = uuid();
  const socketType = incomeMessage.url === "/portal" ? "client" : "arduino";
  if (socketType === "client") {
    ws.send(JSON.stringify(WebSocketItems.payload));
    WebSocketItems.clients.push({
      connectionID,
      socketType,
      socket: ws,
    });
  } else {
    WebSocketItems.arduino.push({
      connectionID,
      socketType,
      socket: ws,
    });
  }
  ws.on("message", (message) => {
    console.log("Received message:", message.toString());
    if (socketType === "client") {
      try {
        const _s = JSON.parse(message);
        Object.entries(_s).forEach(([key, value]) => {
          WebSocketItems.payload[key] = value;
        });
        const _msg = JSON.stringify(WebSocketItems.payload);
        WebSocketItems.arduino.forEach((w) => w.socket.send(_msg));
        WebSocketItems.clients.forEach((w) => w.socket.send(_msg));
      } catch (e) {}
    }
    if (socketType === "arduino") {
      try {
        const _s = JSON.parse(message);
        Object.entries(_s).forEach(([key, value]) => {
          WebSocketItems.payload[key] = value;
        });
        WebSocketItems.clients.forEach((w) => w.socket.send(_msg));
      } catch (e) {}
    }
  });

  ws.on("close", () => {
    if (socketType === "arduino") {
      WebSocketItems.arduino = WebSocketItems.arduino.filter(
        (i) => i.connectionID !== connectionID
      );
    } else {
      WebSocketItems.clients = WebSocketItems.clients.filter(
        (i) => i.connectionID !== connectionID
      );
    }
  });
});

app.use(express.static(path.join(__dirname, "/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});
