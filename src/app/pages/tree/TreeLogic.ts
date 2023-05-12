import { useState } from "react";
import { Node, TopicDTO } from "../../interface/interface";
import { Subscription } from "rxjs";
import { toArray, map } from "rxjs";
import { getSubjectTopics, postTopicTree } from "../../services/topic-service";

const TreeLogic = () => {
  const [nodes, setNodes] = useState<TopicDTO[]>([]);

  const getTopics = (subjectId: string) => {
    setNodes([]);
    const subscription = getSubjectTopics(subjectId)
      .pipe(
        map((item) => {
          return item;
        })
      )
      .subscribe({
        next: (item) => {
          console.log("this", item);
          setNodes((data) => [...data, item]);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });

    return () => {
      subscription.unsubscribe();
    };
  };

  // const buildNodes = (topics: TopicDTO[]): Node[] => {
  //   const nodes: Node[] = [];
  //   const map = {};

  //   // First pass - map nodes by ID and build the top level of the hierarchy
  //   for (const topic of topics) {
  //     const id = topic.id;
  //     const parentId = topic.parentId;
  //     const node = { topic, children: [] };

  //     // Add node to map
  //     map[id] = node;

  //     // If no parentId, this is a top-level node
  //     if (!parentId) {
  //       nodes.push(node);
  //     }
  //   }

  //   // Second pass - add children to their parents
  //   for (const topic of topics) {
  //     const id = topic.id;
  //     const parentId = topic.parentId;
  //     const node = map[id];

  //     // If this node has a parent, add it as a child
  //     if (parentId) {
  //       const parent = map[parentId];
  //       parent.children.push(node);
  //     }
  //   }

  //   return nodes;
  // };

  return {
    service: {
      getTopics,
    },
    nodes,
  };
};

export default TreeLogic;
