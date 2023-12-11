import React, { useState } from 'react';

const Card = () => {
  const [age, setAge] = useState('');
  const [textType, setTextType] = useState('');
  const [relation, setRelation] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleSubmit = async () => {
    // Call OpenAI API here
  };

  return (
    <div>
      <select value={age} onChange={(e) => setAge(e.target.value)}>
        {/* Options for Age */}
      </select>
      <select value={textType} onChange={(e) => setTextType(e.target.value)}>
        {/* Options for Text Type */}
      </select>
      <select value={relation} onChange={(e) => setRelation(e.target.value)}>
        {/* Options for Relation */}
      </select>
      <button onClick={handleSubmit}>Generate</button>
      <div>{generatedText}</div>
    </div>
  );
};

export default Card;
