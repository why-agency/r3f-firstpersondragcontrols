import { usePlane } from "@react-three/cannon";

/**
 * Basic floor plane preconfigured for FirstPersonDragControls
 * @param {*} param0
 * @returns
 */
export const Floor = ({
  size = 100,
  material = <meshStandardMaterial color={"green"} />,
  ...props
}) => {
  const [ground] = usePlane(() => ({
    name: "floor",
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));
  return (
    <mesh receiveShadow name="floor" ref={ground}>
      <planeGeometry args={[size, size]} />
      {material}
    </mesh>
  );
};
