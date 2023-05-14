import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import Topic from "../../components/canvas/Topic";
import TreeLogic from "./TreeLogic";
import { TopicDTO } from "../../generated/NetworkApi";

const TreeCanvas = ({ subjectId }) => {
  const [refresh, setRefresh] = useState(false);

  const [activeTopic, setActiveTopic] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { topicRefs, nodes, service } = TreeLogic();

  useEffect(() => {
    setLoading(true);
    service.getTopics(subjectId);
    setLoading(false);
  }, [subjectId, refresh]);

  const handleTopicActive = (topicId: string, active: boolean) => {
    console.log(topicRefs.current[topicId].current?.setActive(active));
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

            { !loading &&
              nodes.map((node, index) => {
                return (
                  <Topic
                    ref={topicRefs.current[node.id]}
                    key={node.id}
                    topic={node}
                    position={[index * 10, index * 10, 0]}
                    onTopicActive={handleTopicActive}
                  />
                );
              })}

            <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
            <OrbitControls enableRotate={false} enableZoom={true} />
            <Suspense fallback={<CanvasLoader />} />
          </Canvas>
        </div>
        <div className="w-1/4">{activeTopic && <div>{activeTopicId}</div>}</div>
      </div>
    </div>
  );
};

export default TreeCanvas;
