import { Rect } from "react-konva";
import { moveRectangle } from "./SocketManager";
import { type Rectangle as RectangleType } from "../store";
import { type KonvaEventObject } from "konva/lib/Node";
import { throttle } from "lodash";

interface RectangleProps {
  rect: RectangleType;
}

const throttledMove = throttle((id: string, x: number, y: number) => {
  moveRectangle(id, x, y);
}, 50);

export const Rectangle = ({ rect }: RectangleProps) => {
  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    throttledMove(rect.id, e.target.x(), e.target.y());
  };

  return (
    <Rect
      x={rect.x}
      y={rect.y}
      width={rect.width}
      height={rect.height}
      fill={rect.fill}
      draggable
      onDragMove={handleDragMove}
    />
  );
};
