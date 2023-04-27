import React, { useEffect, useState } from "react";
import { TopicDTO } from "../../interface/interface";

interface TopicCardProps {
  topic?: TopicDTO;
  parentId: string;
  handleClick: (rootTopicId: string, topic: TopicDTO) => void;
}

const TopicCard = ({ topic, handleClick, parentId}: TopicCardProps) => {
  const [formData, setFormData] = useState<TopicDTO>({
    id: "",
    type: "TOPIC",
    color: "#ffffff",
    weight: "MEDIUM",
    tags: [],
    parentId: "",
    userId: null,
    topicName: "",
  });

  useEffect(() => {
    if (topic) {
      setFormData(topic);
    }
  }, [topic]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // submit form data
    handleClick(parentId, formData)
  };

  return (
    <div className="p-2" onClick={() => handleClick(parentId, formData)}>
      <div className=" border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
        <div className=" p-6 group border-gray-200 border-opacity-60 rounded-lg overflow-hidden shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label
                htmlFor="topicName"
                className="block text-sm font-medium text-gray-700"
              >
                Topic Name
              </label>
              <input
                type="text"
                name="topicName"
                id="topicName"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.topicName}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="mt-4">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-700"
              >
                Tags
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                value={formData.tags.join(", ")}
                onChange={handleChange}
                required
              />
            </div> */}
            <div className="mt-4">
              <button
                type="submit"
                className="hover:cursor-pointer  text-teal-200 hover:text-indigo-200 py-2 px-4 border border-gray-500 hover:border-transparent rounded"
              >
                {topic === null ? "Create Topic" : "Update Topic"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
