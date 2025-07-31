import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

let rectangles: Rectangle[] = [];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('get_initial_state', () => {
    socket.emit('initial_rectangles', rectangles);
  });

  socket.on('rectangle:add', (newRectangle: Omit<Rectangle, 'id'>) => {
    const rectangle: Rectangle = {
      ...newRectangle,
      id: `${Date.now()}-${Math.random()}`,
    };
    rectangles.push(rectangle);
    io.emit('rectangle:add', rectangle);
  });

  socket.on(
    'rectangle:move',
    (movedRectangle: { id: string; x: number; y: number }) => {
      const rectToUpdate = rectangles.find(
        (rect) => rect.id === movedRectangle.id,
      );
      if (rectToUpdate) {
        const updatedRect = {
          ...rectToUpdate,
          x: movedRectangle.x,
          y: movedRectangle.y,
        };
        rectangles = rectangles.map((rect) =>
          rect.id === updatedRect.id ? updatedRect : rect,
        );
        io.emit('rectangle:move', updatedRect);
      }
    },
  );

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
