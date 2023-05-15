import React, { useState, useRef } from "react";
import { map } from "rxjs";
import { getSubjectTopics } from "../../services/topic-service";
import { TopicDTO } from "../../generated/NetworkApi";
import Topic from "../../components/canvas/Topic";

const TreeLogic = () => {
  const [nodes, setNodes] = useState<TopicDTO[]>([]);
  const topicRefs = useRef<{ [key: string]: React.RefObject<Topic> }>({});
  const [activeTopic, setActiveTopic] = useState<TopicDTO | null | undefined>(
    null
  );
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const getTopics = (subjectId: string) => {
    setNodes([]);
    setTags([]);
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

  const handleTopicActive = (topicId: string, active: boolean) => {
    nodes.forEach((node) => {
      const nodeRef = topicRefs.current[node.id].current;
      if (node.id !== topicId && nodeRef?.getActive()) {
        nodeRef?.setActive(false);
      }
    });
    if (active) {
      setActiveTopicId(topicId);
      setActiveTopic(nodes.find((node) => node.id === topicId));
    } else {
      setActiveTopicId(null);
      setActiveTopic(null);
    }
  };

  const handleHighlightTag = (tag: string, activeSelection: boolean) => {
    nodes.forEach((node) => {
      console.log(activeSelection);
      if (activeSelection) {
        const nodeRef = topicRefs.current[node.id].current;

        if (node.tags.includes(tag)) {
          console.log("found one");
          nodeRef?.handleHover(true);
        } else {
          nodeRef?.handleHover(false);
        }
      } else {
        const nodeRef = topicRefs.current[node.id].current;
        nodeRef?.handleHover(false);
      }
    });
  };

  return {
    service: {
      getTopics,
    },
    handler: {
      handleTopicActive,
      handleHighlightTag,
      setTags,
    },
    state: {
      nodes,
      tags,
      activeTopic,
      topicRefs,
      activeTopicId,
    },
  };
};

export default TreeLogic;
