import { useBox } from "@react-three/cannon";
import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

export const UIElements = () => {
  return (
    <>
      <button
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          width: 100,
          height: 50,
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        Button
      </button>
      <p
        style={{
          backgroundColor: "white",
          width: "fit-content",
          position: "absolute",
          top: 30,
          left: "50%",
          transform: "translateX(-50%)",
          padding: 10,
          borderRadius: 5,
        }}
      >
        WASD to move. Click and drag to look around. Space to jump. Hold Shift
        to run.
      </p>
    </>
  );
};

export const GeometryElements = () => {
  const { camera } = useThree();
  const [boxRef, boxApi] = useBox(() => ({ mass: 1, position: [-2, 2, 0] }));
  const [lightBoxRef] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    position: [0, 0.5, 0],
  }));
  const [boxHover, setBoxHover] = useState(false);
  const [lightActive, setLightActive] = useState(true);

  const applyImpulse = (e) => {
    e.stopPropagation();

    // Get direction from camera to box
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    // Set magnitude of impulse
    direction.multiplyScalar(10);

    // Apply impulse in direction camera is facing
    boxApi.applyImpulse(direction.toArray(), [0, 0, 0]);
  };

  return (
    <>
      <mesh
        onPointerEnter={() => setBoxHover(true)}
        onPointerLeave={() => setBoxHover(false)}
        onClick={(e) => applyImpulse(e)}
        castShadow
        ref={boxRef}
      >
        <Text position={[0, 0, 0.52]} scale={0.1}>
          Click to throw me!
        </Text>
        <boxGeometry />
        <meshPhongMaterial
          attach="material"
          color={boxHover ? "hotpink" : "blue"}
        />
      </mesh>

      <mesh ref={lightBoxRef} castShadow>
        <boxGeometry />
        <meshPhongMaterial attach="material" color={"red"} />
        <spotLight
          angle={0.3}
          target-position={lightBoxRef.current && lightBoxRef.current.position}
          intensity={lightActive ? 1 : 0}
          position={[0, 5, 0]}
        />
        <mesh
          onClick={() => setLightActive(!lightActive)}
          position={[0, 0, 0.5]}
        >
          <boxGeometry attach="geometry" args={[0.4, 0.2, 0.1]} />
          <meshStandardMaterial attach="material" color="blue" />
        </mesh>
        <Text position={[0, 0.3, 0.52]} scale={0.1}>
          Light ON / OFF switch
        </Text>
      </mesh>
    </>
  );
};
