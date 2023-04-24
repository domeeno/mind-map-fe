import { useState } from "react";
import { Node, TopicDTO } from "../../interface/interface";
import { Subscription } from "rxjs";
import { toArray, map } from "rxjs";
import { getTopicTree } from "../../services/topic-service";

const TreeLogic = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<TopicDTO>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newMode, setNewMode] = useState<boolean>(false);

  const handleTopicClick = (topic: TopicDTO) => {
    setSelectedTopic(topic);
  };

  const handlenewMode = () => {
    setNewMode(!newMode);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const getTree = (rootTopicId) => {
    setNodes([]);
    const subscription: Subscription = getTopicTree(rootTopicId)
      .pipe(
        map((item: TopicDTO) => {
          console.log(item);
          return item;
        }),
        toArray(),
        map((topics: TopicDTO[]) => buildNodes(topics))
      )
      .subscribe((nodes: Node[]) => {
        setNodes(nodes);
      });

    return () => {
      subscription.unsubscribe();
    };
  };

  const buildNodes = (topics: TopicDTO[]): Node[] => {
    const nodes: Node[] = [];
    const map = {};

    // First pass - map nodes by ID and build the top level of the hierarchy
    for (const topic of topics) {
      const id = topic.id;
      const parentId = topic.parentId;
      const node = { topic, children: [] };

      // Add node to map
      map[id] = node;

      // If no parentId, this is a top-level node
      if (!parentId) {
        nodes.push(node);
      }
    }

    // Second pass - add children to their parents
    for (const topic of topics) {
      const id = topic.id;
      const parentId = topic.parentId;
      const node = map[id];

      // If this node has a parent, add it as a child
      if (parentId) {
        const parent = map[parentId];
        parent.children.push(node);
      }
    }

    return nodes;
  };

  return {
    service: {
      handleTopicClick,
      getTree,
      handlenewMode,
      handleEditMode,
    },
    nodes,
    editMode,
    newMode,
    selectedTopic
  };
};

export default TreeLogic;
