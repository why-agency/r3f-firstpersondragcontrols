# r3f-FirstPersonDragControls
A pointer-capture-free first person controls component for React Three Fiber, using Cannon physics.

## Dependencies
`react` v18.2.0 or higher
`@react-three/fiber` v8.3.4 or higher
`@react-three/drei` v9.77.6 or higher
`@react-three/cannon` v6.5.2 or higher

## Installation
`npm install r3f-firstpersondragcontrols`
or
`yarn add r3f-firstpersondragcontrols`

## Usage
```
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
```