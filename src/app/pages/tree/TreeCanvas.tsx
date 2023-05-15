import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import TreeLogic from "./TreeLogic";
import Tree from "../../components/canvas/Tree";
import TopicEditCard from "../../components/cards/TopicEditCard";
import { CanvasEvents } from "../../interface/interface";

interface TreeCanvasProps {
  subjectId: string;
  notifyEvent: (event: CanvasEvents, data: any[]) => void;
  canvasRef: any;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ subjectId, notifyEvent, canvasRef }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const { state, handler, service } = TreeLogic();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await service.getTopics(subjectId);
      setLoading(false);
    };

    fetchData();
  }, [subjectId]);

  useEffect(() => {
    if (canvasRef && canvasRef && loading === false) {
      canvasRef.current.handleHighlightTag = handler.handleHighlightTag;
      state.nodes.forEach((node) => {
        node.tags.forEach((tag) => {
          if (!state.tags.includes(tag)) {
            console.log(tag, state.tags)
            handler.setTags((data) => [...data, tag]);
          }
        });
      });
    }
  }, [canvasRef, state.nodes]);

  useEffect(() => {
    notifyEvent(CanvasEvents.TAGS_UPDATE, state.tags);
  }, [state.tags]);

  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <Canvas>
          <pointLight color="indianred" />
          <pointLight position={[10, 10, -10]} color="orange" />
          <pointLight position={[-10, -10, 10]} color="lightblue" />

          {!loading && state.nodes.length > 0 && (
            <Tree
              topicRefs={state.topicRefs}
              handleTopicActive={handler.handleTopicActive}
              topic={state.nodes[0]}
              x={0}
              y={0}
              nodes={state.nodes}
            />
          )}

          <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
          <OrbitControls enableRotate={false} enableZoom={true} />
          <Suspense fallback={<CanvasLoader />} />
        </Canvas>
      </div>
      <div className="w-1/4">
        {state.activeTopic && (
          <div>
            <TopicEditCard
              topic={state.activeTopic}
              onSubmit={() => console.log("yes indeed")}
            ></TopicEditCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeCanvas;
