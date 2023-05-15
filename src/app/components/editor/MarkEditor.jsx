import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('');

  const handleInputChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <textarea value={markdown} onChange={handleInputChange} />
      <div>
        <ReactMarkdown source={markdown} />
      </div>
    </div>
  );
};

export default MarkdownEditor;
