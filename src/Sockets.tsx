import { useEffect, useRef, useState } from "react";

export default function useSockets() {
  const SocketRef = useRef<WebSocket>();

  const [appState, setAppState] = useState({
    sensors: {
      temperature: 25,
      humidity: 2,
      ir: false,
      ldr: 127,
      distance: 0,
      gasLevel: 20,
    },
    relays: {
      relai1: true,
      relai2: false,
      relai3: false,
      relai4: false,
      relai5: true,
    },
  });
  function onOpen() {
    console.log("Connection is open");
  }
  function onMessage(event: MessageEvent<any>) {
    const { data } = event;
    const payload = JSON.parse(data);
    const newState = {
      sensors: {
        temperature: payload.temperature,
        humidity: payload.humidity,
        ir: payload.IR_value,
        ldr: payload.ldrValue,
        distance: payload.distance,
        gasLevel: payload.gasLevel,
      },
      relays: {
        relai1: payload.relay1,
        relai2: payload.relay2,
        relai3: payload.relay3,
        relai4: payload.relay4,
        relai5: payload.relay5,
      },
    };
    setAppState(newState);
    console.log("Message received", payload);
  }
  function SEND(message: string) {
    SocketRef.current?.send(message);
  }
  useEffect(() => {
    const { protocol, hostname } = window.location;
    const url = `${protocol == "http:" ? "ws" : "wss"}://${hostname}/portal`;
    SocketRef.current = new WebSocket(url);
    SocketRef.current.addEventListener("open", onOpen);
    SocketRef.current.addEventListener("message", onMessage);
    return () => {
      SocketRef.current?.removeEventListener("open", onOpen);
      SocketRef.current?.removeEventListener("message", onMessage);
    };
  }, []);
  return {
    appState,
    SEND,
  };
}
