import React, { useState, useRef } from "react";
import { map } from "rxjs";
import { getSubjectTopics } from "../../services/topic-service";
import { TopicDTO } from "../../generated/NetworkApi";
import Topic from "../../components/canvas/Topic";

const TreeLogic = () => {
  const [nodes, setNodes] = useState<TopicDTO[]>([]);
  const [tree, setTree] = useState<TopicDTO[]>([]);
  const topicRefs = useRef<{ [key: string]: React.RefObject<Topic> }>({});

  const getTopics = (subjectId: string) => {
    setNodes([]);
    const subscription = getSubjectTopics(subjectId)
      .pipe(
        map((item) => {
          return item;
        })
      )
      .subscribe({
        next: (item: TopicDTO) => {
          topicRefs.current[item.id] = React.createRef<Topic>();
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

  return {
    service: {
      getTopics,
    },
    nodes,
    tree,
    topicRefs
  };
};

export default TreeLogic;
