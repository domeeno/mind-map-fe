import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Topic from "./Topic";
import CanvasLoader from "./Loader";
import Connection from "./Connection";

const TreeCanvas = () => {
  return (
    <Canvas style={{ height: 1000 }}>
      <pointLight color="indianred" />
      <pointLight position={[10, 10, -10]} color="orange" />
      <pointLight position={[-10, -10, 10]} color="lightblue" />

      <Topic position={[0, 5, 0]} clickHandler={() => console.log("clicked")} />

      <Topic position={[0, 0, 0]} clickHandler={() => console.log("clicked")} />

      <Connection
        from={[0, 5, 0]}
        to={[0, 0, 0]}
        weight={0.5}
        color="white"
        opacity="50"
      />

      {/* algorithm to make it a tree */}

      <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Suspense fallback={<CanvasLoader />} />
    </Canvas>
  );
};

export default TreeCanvas;
