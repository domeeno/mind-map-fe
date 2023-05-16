import React, { useEffect, useState } from "react";
import { TopicDTO } from "../../generated/NetworkApi";
import Topic from "./Topic";

interface Props {
  topic: TopicDTO;
  topicRefs: any;
  x: number;
  y: number;
  handleTopicActive: (topicId: string, active: boolean) => void;
  handleTopicCreate: (topicId: string) => void;
  nodes: TopicDTO[];
  depth?: number;
}

const Tree: React.FC<Props> = ({
  topic,
  topicRefs,
  x,
  y,
  handleTopicActive,
  handleTopicCreate,
  nodes,
  depth = 0,
}) => {
  const [neighbours, setNeighbours] = useState<any[]>([]);

  
  useEffect(() => {
    getNeighboursRefs(topic);
  }, [topic]);
  
  const getNeighboursRefs = (topic: TopicDTO) => {
    const topicNeighbours: any[] = [];
    topic.childIds.forEach((childId) => {
      topicNeighbours.push(topicRefs.current[childId]);
    });
    topic.parentIds.forEach((parentId) => {
      topicNeighbours.push(topicRefs.current[parentId]);
    });
    
    setNeighbours(topicNeighbours);
  };

  const calculatePosition = (index, childLength) => {
    const angleStep = Math.PI / 2 / topic.childIds.length;
    const radius = 10 + depth * 1.2;

    let angle;

    if (childLength === 1) {
      angle = angleStep * index;
    } else {
      if (childLength % 2 === 0) {
        angle = angleStep * (index - Math.floor(childLength / 2) + 0.5);
      } else {
        angle = angleStep * (index - Math.floor(childLength / 2));
      }
    }

    const childX = x + radius * Math.cos(angle);
    const childY = y + radius * Math.sin(angle);

    return [childX, childY];
  };

  return (
    <group>
      <Topic
        ref={topicRefs.current[topic.id]}
        key={topic.id}
        topic={topic}
        position={[x, y, 0]}
        neighbourRefs={neighbours}
        onTopicActive={handleTopicActive}
        handleTopicCreate={handleTopicCreate}
      />

      {topic.childIds.map((childId, index) => {
        const childTopic = nodes.find((node) => node.id === childId);

        const [childX, childY] = calculatePosition(
          index,
          topic.childIds.length
        );

        return (
          <Tree
            key={childId}
            topicRefs={topicRefs}
            handleTopicActive={handleTopicActive}
            handleTopicCreate={handleTopicCreate}
            topic={childTopic!}
            x={childX}
            y={childY}
            nodes={nodes}
            depth={depth + 1}
          />
        );
      })}
    </group>
  );
};

export default Tree;
