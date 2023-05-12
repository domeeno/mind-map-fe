import React from "react";
import { Node } from "../../interface/interface";
import { TopicDTO } from "../../generated/NetworkApi";

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

const Tree: React.FC<Props> = ({}) => {
  return <group></group>;
};

export default Tree;
