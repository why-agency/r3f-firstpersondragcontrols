import "./App.css";
import { Canvas } from "@react-three/fiber";
import { FirstPersonDragControls, Floor } from "./FirstPersonDragControls";
import { Box, Sky } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import { GeometryElements, UIElements } from "./Elements";

function App() {
  return (
    <div className="App">
      <div className="UI">
        <UIElements />
      </div>
      <Canvas
        gl={{
          powerPreference: "high-performance",
          antialias: true,
        }}
        shadows
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
        <directionalLight
          castShadow
          position={[-5, 10, 3]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Physics gravity={[0, -10, 0]}>
          <GeometryElements />
          <FirstPersonDragControls initPos={[0, 2, 6]} />
          <Floor />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
