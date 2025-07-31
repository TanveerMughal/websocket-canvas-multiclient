import './App.css';
import { Canvas } from './components/Canvas';
import { SocketManager, addRectangle } from './components/SocketManager';

function App() {
  return (
    <div>
      <SocketManager />
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={addRectangle}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Rectangle
        </button>
      </div>
      <Canvas />
    </div>
  );
}

export default App;
