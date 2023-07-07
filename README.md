# r3f-FirstPersonDragControls
A first person controller with free mouse movement for React Three Fiber, using Cannon physics.

<video width="320" height="240" controls>
  <source src="https://raw.githubusercontent.com/why-agency/r3f-firstpersondragcontrols/production/public/video.webp" type="video/webp">
  Your browser does not support the video tag.
</video>


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
```

#### Floor
For the sake of fast prototyping, a `<Floor/>` object is included in the package. You may use it to place a floor plane that works out of the box with the controller. It is a simple plane with a `name` prop set to `"floor"`, which is necessary for the player to detect when it is on the floor. You can use any other plane or planes, but you have to set the `name` prop to `"floor"` for it to work. It accepts the following props:

| Name     | Type        | Default                                    | Description                                               |
| -------- | ----------- | ------------------------------------------ | --------------------------------------------------------- |
| size     | number      | 100                                        | Determines the size of the floor plane in a square shape. |
| material | JSX Element | `<meshStandardMaterial color={"green"} />` | Material applied to plane                                 |
| ...props | object      | None                                       | Other props that can be passed to the component           |


## Props
`FirstPersonDragControls` takes the following props:
| Name            | Type          | Default           | Description                                                                                                      |
| --------------- | ------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------- |
| `target`        | Array         | `[0, 2.5, -3000]` | Initial position the camera will be looking at. Set in horizon to not interfere.                                 |
| `playerMass`    | Number        | `1`               | The mass of the player sphere                                                                                    |
| `initPos`       | Array         | `[0, 2.5, 0]`     | Initial position of the player                                                                                   |
| `moveSpeed`     | Number        | `2.3`             | Player's walking speed                                                                                           |
| `runSpeed`      | Number        | `3.5`             | Player's running speed                                                                                           |
| `initFov`       | Number        | `45`              | Normal field of view                                                                                             |
| `maxFov`        | Number        | `50`              | Maximum field of view when running                                                                               |
| `fovLerpFactor` | Number        | `0.1`             | How fast the fov increases and decreases                                                                         |
| `jumpVelocity`  | Number        | `5`               | Velocity to apply when jumping                                                                                   |
| `floorName`     | String        | `"floor"`         | Name of the floor plane, necessary to detect when jumping is allowed. `<Floor>` object included simplifies this. |
| `keys`          | Object        | Explained below   | Key bindings for controls                                                                                        |
| `controls`      | React Element | Explained below   | Mouse Control Element                                                                                            |

There are two special Object props that can be passed to `FirstPersonDragControls`. 

#### Keys
Keys prop defines the mapping of the Keyboard key presses and their effect on the player controls. To customize the mapping, change the KeyCode fields to the desired key codes, but keep the Value fields the same.
| KeyCode     | Type   | Value        | Description           |
| ----------- | ------ | ------------ | --------------------- |
| `KeyW`      | String | `"forward"`  | Move forward command  |
| `KeyS`      | String | `"backward"` | Move backward command |
| `KeyA`      | String | `"left"`     | Move left command     |
| `KeyD`      | String | `"right"`    | Move right command    |
| `Space`     | String | `"space"`    | Jump command          |
| `ShiftLeft` | String | `"shift"`    | Shift command         |
Here's the default value of the prop:
```
{ 
  KeyW: "forward", 
  KeyS: "backward", 
  KeyA: "left", 
  KeyD: "right", 
  Space: "space", 
  ShiftLeft: "shift" 
}
```

By the default configuration, the player controls the movement with classic FPS controls: `WASD`for movement, `LeftShift`for running and `Space` for jumping. 
#### Controls
Controls prop defines the mouse controls for the player. I don't recommend to use anything other than OrbitControls, but if you might, I'd recommend for it to be an element of the Drei library. 

The default value is:
```
 <OrbitControls
  makeDefault
  target={target} // This is the target prop of the FirstPersonDragControls element
  enableZoom={false}
  enablePan={true}
  enableRotate={false}
  panSpeed={2}
  keyPanSpeed={0}
  dampingFactor={0.1}
  mouseButtons={{
    RIGHT: null,
    LEFT: THREE.MOUSE.PAN,
    MIDDLE: null,
  }}
  />
```
If you want to customise these default OrbitControls values, you have to send the entire object as a prop as shown above, then change or add your desired values. I would recommend to keep the "target" value the same as the target prop in the main element, but customising it also allows you to follow an element if you'd wish to do so.
If you want to know more about OrbitControls, please refer to the [Drei docs](https://github.com/pmndrs/drei#controls) and the [three.js docs](https://threejs.org/docs/#examples/en/controls/OrbitControls).

## Testing locally
If you want to test the component locally, you can clone the repository and run `npm run start` or `yarn start` to start the development server. You can then go to `localhost:3000` to see the example scene. To take a peek at the code, check `App.js` and `FirstPersonDragControls.js` in the `src` folder.

## Contributing
This is an early version, if you find any bugs or have any suggestions, please open an issue or a pull request. I'd be happy to hear your feedback!

## About
This component was created by Dario Sanchez from [&why](https://why.de) based on the one developed for the [#LastSeen game](https://game.lastseen.org/). If you want to see more of our work, check out our [project cases](https://www.why.de/work) and my [Twitter](https://twitter.com/dswhyy) .