import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import Tree from "../../components/canvas/Tree";
import TreeLogic from "./TreeLogic";

interface TreeCanvasProps {
  rootTopicId: string;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ rootTopicId }) => {
  const { nodes, selectedTopic, handleTopicClick, getTree } = TreeLogic();

  useEffect(() => {
    getTree(rootTopicId);
  }, [rootTopicId]);

  return (
    <Canvas style={{ height: 1000 }}>
      <pointLight color="indianred" />
      <pointLight position={[10, 10, -10]} color="orange" />
      <pointLight position={[-10, -10, 10]} color="lightblue" />

      {nodes.length !== 0 && (
        <Tree node={nodes[0]} handleSelect={handleTopicClick} />
      )}

      <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
      <OrbitControls enableRotate={false} enableZoom={false} />
      <Suspense fallback={<CanvasLoader />} />
    </Canvas>
  );
};

export default TreeCanvas;
