import "./App.css";
import { Canvas } from "@react-three/fiber";
import { FirstPersonDragControls, Floor } from "./FirstPersonDragControls";
import { Box, Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

function App() {
  return (
    <div className="App">
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Sky />
        <ambientLight intensity={0.5} />
        <Physics gravity={[0, -20, 0]}>
          <Box position={[0, 1, 0]} />
          <FirstPersonDragControls />
          <Floor />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
