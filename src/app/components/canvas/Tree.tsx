import React from "react";
import { Node } from "../../interface/interface";
import Topic from "./Topic";
import Connection from "./Connection";

interface Props {
  node: Node;
  radius?: number;
  angleStep?: number;
  centerX?: number;
  centerY?: number;
}

const Tree: React.FC<Props> = ({
  node,
  radius = 10,
  angleStep = (Math.PI / 2) / node.children.length,
  centerX = 0,
  centerY = 0,
}) => {
  return (
    <group>
      <Topic
        topic={node.topic}
        key={node.topic.id}
        root={node.topic.type === "ROOT"}
        position={[centerX, centerY, 0]}
        clickHandler={() => console.log("clicked")}
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
