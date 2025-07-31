import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';

export interface Rectangle {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

interface State {
  rectangles: Record<string, Rectangle>;
}

interface Actions {
  setRectangles: (rectangles: Rectangle[]) => void;
  addRectangle: (rectangle: Rectangle) => void;
  updateRectanglePosition: (id: string, x: number, y: number) => void;
}

export const useStore = create<State & Actions>()(
  subscribeWithSelector(
    immer((set) => ({
      rectangles: {},
      setRectangles: (rectangles) =>
        set((state) => {
          state.rectangles = rectangles.reduce(
            (acc, rect) => ({ ...acc, [rect.id]: rect }),
            {}
          );
        }),
      addRectangle: (rectangle) =>
        set((state) => {
          state.rectangles[rectangle.id] = rectangle;
        }),
      updateRectanglePosition: (id, x, y) =>
        set((state) => {
          if (state.rectangles[id]) {
            state.rectangles[id].x = x;
            state.rectangles[id].y = y;
          }
        }),
    }))
  )
);
