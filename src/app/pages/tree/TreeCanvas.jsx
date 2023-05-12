import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import Topic from "../../components/canvas/Topic";
import TreeLogic from "./TreeLogic";

const TreeCanvas = ({ subjectId }) => {
  const [refresh, setRefresh] = useState(false);

  const [activeTopic, setActiveTopic] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState(null);

  const { nodes, service } = TreeLogic();

  useEffect(() => {
    service.getTopics(subjectId);
  }, [subjectId, refresh]);

  const handleTopicActive = (topicId, active) => {
    setActiveTopicId(topicId);
    setActiveTopic(active);
  };

  return (
    <div className="h-screen">
      {/* side panel with all topics */}
      <div className="flex flex-row h-full">
        <div className="w-3/4">
          <Canvas>
            <pointLight color="indianred" />
            <pointLight position={[10, 10, -10]} color="orange" />
            <pointLight position={[-10, -10, 10]} color="lightblue" />

            {nodes !== 0 &&
              nodes.map((node) => {
                return (
                  <Topic
                    key={node.id}
                    topic={node}
                    position={[0, 0, 0]}
                    onTopicActive={handleTopicActive}
                  />
                );
              })}

            <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
            <OrbitControls enableRotate={false} enableZoom={false} />
            <Suspense fallback={<CanvasLoader />} />
          </Canvas>
        </div>
        <div className="w-1/4">{activeTopic && <div>{activeTopicId}</div>}</div>
      </div>
    </div>
  );
};

export default TreeCanvas;
