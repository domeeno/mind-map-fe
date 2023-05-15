import React from "react";
import { TopicDTO } from "../../generated/NetworkApi";

interface TopicEditCardProps {
  topic: TopicDTO;
  onSubmit: (topic: TopicDTO) => void;
}

const TopicEditCard: React.FC<TopicEditCardProps> = ({ topic, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(topic);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    topic[name] = value;
  };

  return (
    <div>
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
            value={topic.topicName}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default TopicEditCard;
