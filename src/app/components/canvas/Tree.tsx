import React from "react";
import { Node, TopicDTO } from "../../interface/interface";
import Topic from "./Topic";
import Connection from "./Connection";

interface Props {
  node: Node;
  handleSelect: (topic: TopicDTO) => void;
  handlenewMode: () => void;
  handleEditMode: () => void;
  radius?: number;
  angleStep?: number;
  centerX?: number;
  centerY?: number;
}

const Tree: React.FC<Props> = ({
  node,
  handleSelect,
  radius = 10,
  handleEditMode,
  handlenewMode,
  angleStep = (Math.PI / 2) / node.children.length,
  centerX = 0,
  centerY = 0,
}) => {
  return (
    <group>
      <Topic
        topic={node.topic}
        handleEditMode={handleEditMode}
        handlenewMode={handlenewMode}
        key={node.topic.id}
        root={node.topic.type === "ROOT"}
        position={[centerX, centerY, 0]}
        onTopicClick={handleSelect}
      />

      {node.children.map((child, index) => {
        const angle = angleStep * index;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        return (
          <group>
            <Connection
              from={[x, y, 0]}
              to={[centerX, centerY, 0]}
              weight={0.5}
              color="white"
              opacity={50}
            />
            <Tree
              handleSelect={handleSelect}
              handlenewMode={handlenewMode}
              handleEditMode={handleEditMode}
              node={child}
              key={child.topic.id}
              radius={radius}
              angleStep={angleStep}
              centerX={x}
              centerY={y}
            />
          </group>
        );
      })}
    </group>
  );
};

export default Tree;
