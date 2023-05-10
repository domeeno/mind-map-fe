import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import Topic from "../../components/canvas/Topic";

const TreeCanvas = () => {
  const [topic, setTopic] = useState(null);

  const [activeTopic, setActiveTopic] = useState(false);

  const handleTopicActive = () => {
    setActiveTopic(!activeTopic);
  };

  useEffect(() => {
    setTopic({
      id: "1",
      type: "TOPIC",
      color: "#ffffff",
      topicName: "Root",
      weight: "MEDIUM",
      tags: [],
      parentId: "",
      userId: null,
    });
  }, []);

  return (
    <div className="h-screen">
      {/* side panel with all topics */}

      <Canvas>
        <pointLight color="indianred" />
        <pointLight position={[10, 10, -10]} color="orange" />
        <pointLight position={[-10, -10, 10]} color="lightblue" />

        <Topic position={[0, 0, 0]} topic={topic} onTopicActive={handleTopicActive}/>

        <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
        <OrbitControls enableRotate={false} enableZoom={false} />
        <Suspense fallback={<CanvasLoader />} />
      </Canvas>
      <div>{/* Topic Card */}</div>
    </div>
  );
};

export default TreeCanvas;
