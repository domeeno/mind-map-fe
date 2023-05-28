import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import CanvasLoader from "../../components/canvas/Loader";
import TreeLogic from "./TreeLogic";
import Tree from "../../components/canvas/Tree";
import TopicEditCard from "../../components/cards/TopicEditCard";
import { CanvasEvents } from "../../interface/interface";
import { postTopic, putTopic } from "../../services/topic-service";
import { TopicDTO } from "../../generated/NetworkApi";
import { postFile } from "../../services/file-service";

interface TreeCanvasProps {
  subjectId: string;
  notifyEvent: (event: CanvasEvents, data: any[]) => void;
  canvasRef: any;
}

const TreeCanvas: React.FC<TreeCanvasProps> = ({
  subjectId,
  notifyEvent,
  canvasRef,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreatingTopic, setIsCreatingTopic] = useState<boolean>(false);

  const { state, handler, service } = TreeLogic();

  const fetchData = async () => {
    setLoading(true);
    await service.getTopics(subjectId);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [subjectId]);

  useEffect(() => {
    if (canvasRef && canvasRef && loading === false) {
      canvasRef.current.handleHighlightTag = handler.handleHighlightTag;
      state.nodes.forEach((node) => {
        node.tags.forEach((tag) => {
          if (!state.tags.includes(tag)) {
            console.log(tag, state.tags);
            handler.setTags((data) => [...data, tag]);
          }
        });
      });
    }
  }, [canvasRef, state.nodes]);

  useEffect(() => {
    notifyEvent(CanvasEvents.TAGS_UPDATE, state.tags);
  }, [state.tags]);
 
  const closeCard = () => {
    if (!state.activeTopic) return;
    handler.handleTopicActive(state.activeTopic.id, false);
  }

  const handlePutTopic = (topic: TopicDTO, text: string) => {
    putTopic(topic.id, topic).then(() =>{
      handler.updateNodeById(topic.id, topic);
      closeCard();
      postFile(topic.id, text);
    })
  }

  const handlePostTopic = (topicName: string, text: string) => {
    if (!state.activeTopic) return

    postTopic(subjectId, state.activeTopic.id, topicName).then((res) => {
      return postFile(res[0].id, text)
    }).then(() =>{
      setIsCreatingTopic(false);
      closeCard()
      fetchData();
    })
  }

  const handleTopicCreate = (id) =>{
    setIsCreatingTopic(true);
    // handler.handleTopicCreate(id);
  } 

  return (
    <div className="h-full w-full relative" style={{minHeight: '100%'}}>
      <Canvas style={{zIndex: 0}}>
        <pointLight color="indianred" />
        <pointLight position={[10, 10, -10]} color="orange" />
        <pointLight position={[-10, -10, 10]} color="lightblue" />

        {!loading && state.nodes.length > 0 && (
          <Tree
            topicRefs={state.topicRefs}
            handleTopicActive={handler.handleTopicActive}
            handleTopicCreate={handleTopicCreate}
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
      {(state.activeTopic || isCreatingTopic) && (
      <div className="w-1/4 absolute border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden p-6" style={{ right: '.5rem', top: '.5rem', backgroundColor: '#111' }}>
        <TopicEditCard
          topic={isCreatingTopic ? undefined : state.activeTopic}
          onEdit={handlePutTopic}
          onCreate={handlePostTopic}
        ></TopicEditCard>
        </div>
      )}
    </div>
  );
};

export default TreeCanvas;
