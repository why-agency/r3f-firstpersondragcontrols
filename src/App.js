import "./App.css";
import { Canvas } from "@react-three/fiber";
import { FirstPersonDragControls, Floor } from "./FirstPersonDragControls";

function App() {
  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={0.5} />
        <FirstPersonDragControls />
        <Floor />
      </Canvas>
    </div>
  );
}

export default App;
