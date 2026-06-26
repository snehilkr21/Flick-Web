import { io } from "socket.io-client";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io("http://localhost:7777");
  }

  return io({
    path: "/socket.io",
    withCredentials: true,
  });
};