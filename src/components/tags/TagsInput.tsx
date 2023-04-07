"use client";
import TagItem from "./TagItem";
import TagInput from "./TagInput";
import { KeyboardEvent, useRef, useState } from "react";

function TagsInput() {
  const inputRef = useRef(null);

  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const value = (e.target as HTMLInputElement).value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    (e.target as HTMLInputElement).value = "";
  };

  function removeTag(index: number) {
    console.log("here");
    console.log(index);

    setTags(tags.filter((_, i) => i !== index));
  }

  return (
    <div
      id="tags-input-container"
      className="p-1 w-full border-2 rounded-md border-solid border-primary bg-secondary flex items-center flex-wrap gap-1"
    >
      {tags.map((tag, i) => (
        <TagItem tagKey={i} tag={tag} removeTag={removeTag} />
      ))}

      <TagInput inputRef={inputRef} handleKeyDown={handleKeyDown} />
    </div>
  );
}

export default TagsInput;
