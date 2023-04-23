import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import Topic from "./Topic";
import CanvasLoader from "./Loader";

const TreeCanvas = () => {
  return (
    <Canvas style={{height: 1000}}>
      <pointLight color="indianred" />
      <pointLight position={[10, 10, -10]} color="orange" />
      <pointLight position={[-10, -10, 10]} color="lightblue" />
      
      
      <Topic position={[0, 0, 0]} clickHandler={() => console.log("clicked")} />

      <Topic position={[0, 5, 0]} clickHandler={() => console.log("clicked")} />

      <Topic position={[6, 5, 0]} clickHandler={() => console.log("clicked")} />

      <OrthographicCamera
        makeDefault
        zoom={25}
        top={200}
        bottom={-200}
        left={200}
        right={-200}
        near={1}
        far={2000}
        position={[0, 0, 60]}
      />
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Suspense fallback={<CanvasLoader />} />

    </Canvas>
  );
};

export default TreeCanvas;
