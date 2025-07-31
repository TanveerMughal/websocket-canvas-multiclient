import { Stage, Layer } from 'react-konva';
import { useStore } from '../store';
import { Rectangle } from './Rectangle';

export const Canvas = () => {
  const rectangles = useStore((state) => state.rectangles);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {Object.values(rectangles).map((rect) => (
          <Rectangle key={rect.id} rect={rect} />
        ))}
      </Layer>
    </Stage>
  );
};
