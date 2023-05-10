import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import Topic from "../../components/canvas/Topic";
import { TopicDTO } from "../../interface/interface";

interface TreeCanvasProps {
  rootTopicId: string;
}

const TreeCanvas: React.FC<TreeCanvasProps> = () => {
  const [topic, setTopic] = useState<TopicDTO>();

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

        <Topic position={[0, 0, 0]} topic={topic}/>

        <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
        <OrbitControls enableRotate={false} enableZoom={false} />
        <Suspense fallback={<CanvasLoader />} />
      </Canvas>
      <div>{/* Topic Card */}</div>
    </div>
  );
};

export default TreeCanvas;
