import React, { KeyboardEvent, KeyboardEventHandler, useState } from "react";

interface TagInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
}

function TagInput({ inputRef, handleKeyDown }: TagInputProps) {
  return (
    <input
      ref={inputRef}
      onKeyDown={handleKeyDown}
      type="text"
      placeholder="Type something"
      id="tag-input"
      list="ingredients"
      className="border-none outline-none bg-transparent text-black"
    />
  );
}

export default TagInput;
