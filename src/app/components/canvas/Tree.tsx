import React, { useEffect, useState } from "react";
import { TopicDTO } from "../../generated/NetworkApi";
import Topic from "./Topic";

interface Props {
  topic: TopicDTO;
  topicRefs: any;
  x: number;
  y: number;
  handleTopicActive: (topicId: string, active: boolean) => void;
  nodes: TopicDTO[];
}

const Tree: React.FC<Props> = ({
  topic,
  topicRefs,
  x,
  y,
  handleTopicActive,
  nodes,
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

  return (
    <group>
      <Topic
        ref={topicRefs.current[topic.id]}
        key={topic.id}
        topic={topic}
        position={[x, y, 0]}
        neighbourRefs={neighbours}
        onTopicActive={handleTopicActive}
      />

      {topic.childIds.map((childId, index) => {
        const childTopic = nodes.find((node) => node.id === childId);
        const angleStep = Math.PI / 2 / topic.childIds.length;
        const radius = 16;
        const angle = angleStep * (index);
        const childX = x + radius * Math.cos(angle);
        const childY = y + radius * Math.sin(angle);

        return (
          <Tree
            topicRefs={topicRefs}
            handleTopicActive={handleTopicActive}
            topic={childTopic!}
            x={childX}
            y={childY}
            nodes={nodes}
          />
        );
      })}
    </group>
  );
};

export default Tree;
