import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./Topic.css";

const Topic = ({ position, onTopicClick, topic, root, handlenewMode, handleEditMode }) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  const scale = root ? 1.5 : 1;

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    mesh.current.rotation.y = !active
      ? mesh.current.rotation.y + delta / 15
      : mesh.current.rotation.y;
    mesh.current.rotation.x = !active
      ? mesh.current.rotation.y - delta / 15
      : mesh.current.rotation.x;
  });

  const handleClick = () => {
    onTopicClick(topic);
    setActive(!active);
  };

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      position={position}
      ref={mesh}
      scale={active ? scale * 1.5 : scale}
      onClick={() => handleClick()}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <dodecahedronGeometry />
      <meshStandardMaterial
        roughness={0.75}
        emmisive={!hovered ? "#404057" : "#040475"}
      />

      <Html>
        <div
          onClick={() => handleClick()}
          className={`${
            hovered ? "text-gray-200" : "text-gray-600"
          } text-sm hover:font-bold absolute text-gray-600 hover:text-gray-200 top-full left-1/2 transform -translate-x-1/2 translate-y-10`}
        >
          {topic.topicName}
        </div>
        {active && (
          <div>
            <button
              onClick={handlenewMode}
              className={`${
                hovered ? "text-gray-200" : "text-gray-600"
              } text-sm hover:font-bold absolute text-gray-600 hover:text-gray-200 top-full transform -translate-x-5 -translate-y-20`}
            >
              New
            </button>
            <button
              onClick={handleEditMode}
              className={`${
                hovered ? "text-gray-200" : "text-gray-600"
              } text-sm hover:font-bold absolute text-gray-600 hover:text-gray-200 top-full transform -translate-x-20 -translate-y-10`}
            >
              Edit
            </button>
          </div>
        )}
      </Html>
    </mesh>
  );
};

export default Topic;
