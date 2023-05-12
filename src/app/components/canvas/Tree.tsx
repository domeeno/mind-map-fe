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

const Tree: React.FC<Props> = ({}) => {
  return <group></group>;
};

export default Tree;
