/* eslint-disable react-hooks/exhaustive-deps */
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { usePlane, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { lerp } from "three/src/math/MathUtils";

const moveFieldByKey = (key, keys) => keys[key];
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

// Move speed values
let SPEED = 0;

// Code adapted from this answer https://stackoverflow.com/a/69955058
export const usePlayerControls = (keys) => {
  // Use state to keep track of active movement axis
  const movement = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    space: false,
    shift: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) =>
      (movement.current = {
        ...movement.current,
        [moveFieldByKey(e.code, keys)]: true,
      });
    const handleKeyUp = (e) =>
      (movement.current = {
        ...movement.current,
        [moveFieldByKey(e.code, keys)]: false,
      });

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
};

export const FirstPersonDragControls = ({
  target = [0, 2.5, -3000],
  playerMass = 1,
  initPos = [0, 2.5, 0],
  moveSpeed = 2.3,
  runSpeed = 3.5,
  initFov = 45,
  maxFov = 50,
  fovLerpFactor = 0.1,
  jumpVelocity = 5,
  floorName = "floor",
  keys = {
    KeyW: "forward",
    KeyS: "backward",
    KeyA: "left",
    KeyD: "right",
    Space: "space",
    ShiftLeft: "shift",
  },
  controls = (
    <OrbitControls
      makeDefault
      target={target}
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
  ),
  ...props
}) => {
  // Create player sphere as a physics body
  const [ref, api] = useSphere(() => ({
    args: [1],
    mass: playerMass,
    type: "Dynamic",
    position: initPos,
    onCollide: (e) => {
      if (e.body.name === floorName) {
        setIsJumping(false);
      }
    },
    ...props,
  }));

  // Get movement controls
  const movementRef = usePlayerControls(keys);
  const velocity = useRef([0, 0, 0]);
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v));
  }, []);

  let isMoving = 0;
  let isLerping = true;
  useFrame(({ camera }) => {
    // Check if player is moving
    isMoving =
      movementRef.current.forward ||
      movementRef.current.backward ||
      movementRef.current.left ||
      movementRef.current.right;
    isLerping = initFov !== maxFov;

    // Increase fov when sprinting
    if (isMoving && movementRef.current.shift) {
      if (isLerping && camera.fov <= maxFov) {
        camera.fov = lerp(camera.fov, maxFov, fovLerpFactor);
        camera.updateProjectionMatrix();
      }
    }
    // Decrease fov when not sprinting
    else if (!isMoving || (isMoving && !movementRef.current.shift)) {
      if (isLerping && camera.fov > initFov) {
        camera.fov = lerp(camera.fov, initFov, fovLerpFactor);
        camera.updateProjectionMatrix();
      }
    }

    /**
     * Move speed control
     */
    if (isMoving) {
      // If moving, speed up, account for sprint
      SPEED = movementRef.current.shift ? runSpeed : moveSpeed;
    } else {
      // If not moving, slow down
      SPEED = 0;
    }
    // Calculate movement direction and apply to velocity
    ref.current.getWorldPosition(camera.position);
    frontVector.set(
      0,
      0,
      Number(movementRef.current.backward) - Number(movementRef.current.forward)
    );
    sideVector.set(
      Number(movementRef.current.left) - Number(movementRef.current.right),
      0,
      0
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    api.velocity.set(direction.x, velocity.current[1], direction.z);

    // Check if jump key is pressed and player is on the ground, then jump
    if (!isJumping && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      if (movementRef.current.space) {
        api.velocity.set(
          velocity.current[0],
          jumpVelocity,
          velocity.current[2]
        );
        setIsJumping(true);
      }
    }
  });
  return (
    <>
      {controls}
      <mesh ref={ref} />
    </>
  );
};

/**
 * Basic floor plane preconfigured for FirstPersonDragControls
 * @param {*} param0
 * @returns
 */
export const Floor = ({
  size = 100,
  material = <meshBasicMaterial color={"green"} />,
  ...props
}) => {
  const [ground] = usePlane(() => ({
    name: "floor",
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh name="floor" ref={ground}>
      <planeGeometry args={[size, size]} />
      {material}
    </mesh>
  );
};
