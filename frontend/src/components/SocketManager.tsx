import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useStore, type Rectangle } from "../store";

const socket: Socket = io("http://localhost:4000");

export const addRectangle = () => {
  const newRect = {
    x: Math.random() * 400,
    y: Math.random() * 400,
    width: 100,
    height: 100,
    fill: "#89b717",
  };
  socket.emit("rectangle:add", newRect);
};

export const moveRectangle = (id: string, x: number, y: number) => {
  socket.emit("rectangle:move", { id, x, y });
};

export const SocketManager = () => {
  const { setRectangles, addRectangle, updateRectanglePosition } = useStore();

  useEffect(() => {
    console.log('SocketManager useEffect is running');
    const onConnect = () => {
      console.log("connected");
      socket.emit('get_initial_state');
    };

    const onDisconnect = () => console.log("disconnected");

    const onInitialRectangles = (rectangles: Rectangle[]) => {
      console.log('Received initial rectangles:', rectangles);
      setRectangles(rectangles);
    };

    const onRectangleAdd = (rectangle: Rectangle) => {
      addRectangle(rectangle);
    };

    const onRectangleMove = (rectangle: Rectangle) => {
      updateRectanglePosition(rectangle.id, rectangle.x, rectangle.y);
    };

    // If socket is already connected, manually call onConnect
    if (socket.connected) {
      onConnect();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("initial_rectangles", onInitialRectangles);
    socket.on("rectangle:add", onRectangleAdd);
    socket.on("rectangle:move", onRectangleMove);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("initial_rectangles", onInitialRectangles);
      socket.off("rectangle:add", onRectangleAdd);
      socket.off("rectangle:move", onRectangleMove);
    };
  }, [setRectangles, addRectangle, updateRectanglePosition]);

  return null;
};
