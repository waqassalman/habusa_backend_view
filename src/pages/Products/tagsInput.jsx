import React, { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-md bg-white border border-gray-300 p-2 focus-within:ring-2 focus-within:ring-indigo-500">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="flex items-center bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-sm"
        >
          {tag}
          <button
            type="button"
            className="ml-1 text-indigo-500 hover:text-indigo-700"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tag..."
        className="flex-grow outline-none text-sm text-gray-700 bg-transparent"
      />
    </div>
  );
};

export default TagsInput;
