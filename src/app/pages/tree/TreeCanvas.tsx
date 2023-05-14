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
    nodes.forEach((node) => {
      const nodeRef = topicRefs.current[node.id].current;
      if (node.id !== topicId && nodeRef?.getActive()) {
        nodeRef?.setActive(false);
      }
    });
    setActiveTopicId(topicId);
    setActiveTopic(active);
  };

  const calculateChildPosition = (
    parentPosition: number[],
    childIndex: number
  ) => {
    const angle = (childIndex * 2 * Math.PI) / nodes.length; // Angle between each child
    const radius = 10; // Distance from the parent

    const x = parentPosition[0] + radius * Math.cos(angle);
    const y = parentPosition[1] + radius * Math.sin(angle);
    const z = parentPosition[2]; // Same z-position as the parent

    return [x, y, z];
  };

  const getNeighboursRefs = (topic: TopicDTO) => {
    const neighbours: any[] = [];
    topic.childIds.forEach((childId) => {
      neighbours.push(topicRefs.current[childId]);
    });
    topic.parentIds.forEach((parentId) => {
      neighbours.push(topicRefs.current[parentId]);
    });
    return neighbours;
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

            {!loading &&
              nodes.map((node, index) => {
                const parentPosition = [0, 0, 0]; // Position of the root topic
                const childPosition = calculateChildPosition(
                  parentPosition,
                  index
                );

                return (
                  <Topic
                    ref={topicRefs.current[node.id]}
                    key={node.id}
                    topic={node}
                    neighbourRefs={getNeighboursRefs(node)}
                    position={childPosition}
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
