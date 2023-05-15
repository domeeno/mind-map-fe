import React, { useState } from "react";
import { TopicDTO } from "../../generated/NetworkApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TopicEditCardProps {
  topic: TopicDTO;
  onSubmit: (topic: TopicDTO) => void;
  onClose: () => void;
}

const TopicEditCard: React.FC<TopicEditCardProps> = ({ topic, onSubmit, onClose }) => {
  
  const [topicName, setTopicName] = useState(topic.topicName);
  const [content, setContent] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...topic,
      topicName,
      // content
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="topicName"
        >
          Topic Name
        </label>
        <input
          type="text"
          id="topicName"
          name="topicName"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          value={topicName}
          onChange={e => setTopicName(e.target.value)}
        />
      </div>
      <ReactQuill theme="snow" value={content} onChange={val =>setContent(val)} />
      <button>Confirm!</button>
    </form>
  );
};

export default TopicEditCard;
