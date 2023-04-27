import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import Tree from "../../components/canvas/Tree";
import TreeLogic from "./TreeLogic";
import TopicCard from "../../components/cards/TopicCard";
import { TopicDTO } from "../../interface/interface";

interface TreeCanvasProps {
  rootTopicId: string;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({ rootTopicId }) => {

  const {
    nodes,
    newMode,
    editMode,
    selectedTopic,
    service,
  } = TreeLogic();

  useEffect(() => {
    service.getTree(rootTopicId);
  }, [rootTopicId, service]);

  const handleTopicSubmit = async (rootTopicId: string, newTopic: TopicDTO) => {
      console.log("Data:", rootTopicId, newTopic);
  };

  return (
    <div className="flex flex-row">
      <Canvas style={{ height: 1000 }}>
        <pointLight color="indianred" />
        <pointLight position={[10, 10, -10]} color="orange" />
        <pointLight position={[-10, -10, 10]} color="lightblue" />

        {nodes.length !== 0 && (
          <Tree node={nodes[0]} handleSelect={service.handleTopicClick} handleEditMode={service.handleEditMode} handlenewMode={service.handlenewMode} />
        )}

        <OrthographicCamera makeDefault zoom={25} position={[0, 0, 10]} />
        <OrbitControls enableRotate={false} enableZoom={false} />
        <Suspense fallback={<CanvasLoader />} />
      </Canvas>
      <div>
        {(newMode && selectedTopic?.id) && <TopicCard handleClick={handleTopicSubmit} parentId={selectedTopic.id}/>}
        {(editMode && selectedTopic?.id) && (
          <TopicCard handleClick={handleTopicSubmit} topic={selectedTopic} parentId={selectedTopic?.id}/>
        )}
      </div>
    </div>
  );
};

export default TreeCanvas;
