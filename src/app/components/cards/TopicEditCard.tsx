import React, { useState, useEffect } from "react";
import { TopicDTO } from "../../generated/NetworkApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import  './TopicEditCard.css'
import { VscArrowRight } from "react-icons/vsc";
import { getFile } from "../../services/file-service";

interface TopicEditCardProps {
  topic?: TopicDTO ;
  onEdit: (topic: TopicDTO, text: string) => void;
  onCreate: (topicName:string, text: string) => void;

}

const TopicEditCard: React.FC<TopicEditCardProps> = ({ topic, onEdit, onCreate }) => {
  const [topicName, setTopicName] = useState(topic?.topicName);
  const [content, setContent] = useState("");

  useEffect(() =>{
    console.log('content:', content);
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (topic?.id) {
      onEdit({
        ...topic,
        topicName: topicName || ''
      }, content);
      return
    }
    
    onCreate(topicName || '', content)
  };

  useEffect(() =>{
    setTopicName(topic?.topicName || '')
  }, [topic?.topicName, topic])

  useEffect(() =>{
    if (!topic?.id) {
      setContent('');
      return
    }
    getFile(topic?.id).then((res) => setContent(res.content) )
  }, [topic?.id])

  return (
    <form onSubmit={handleSubmit} className="topic-edit-card__form">
      <label
          className="flex block text-gray-700 text-sm font-bold topic-edit-card__input-row"
          htmlFor="topicName"
        >
          <span className="flex-shrink-0" style={{lineHeight: '38px'}}>Topic Name</span>
        <input
          type="text"
          id="topicName"
          name="topicName"
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 topic-edit-card__input"
          style={{backgroundColor: '#111', borderRadius: '5px'}}
          value={topicName}
          onChange={e => setTopicName(e.target.value)}
          autoComplete="off"
        />
        </label>

      <ReactQuill className="topic-edit-card__quill" theme="snow" value={content} onChange={val =>setContent(val)} />
      <button className="topic-edit-card__button">
        Done
        <VscArrowRight className="topic-edit-card__button-icn"/>
      </button>
    </form>
  );
};

export default TopicEditCard;
