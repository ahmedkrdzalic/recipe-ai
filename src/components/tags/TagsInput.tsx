"use client";
import TagItem from "./TagItem";
import TagInput from "./TagInput";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { INGREDIENTS } from "@/utils/INGREDIENTS";

function TagsInput() {
  const inputRef = useRef(null);

  const [autoIngredients, setAutoIngredients] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = (e.target as HTMLInputElement).value;
    if (!value.trim()) return;
    if (e.key !== "Enter") {
      const filteredIngredients = INGREDIENTS.filter((ingredient) =>
        ingredient.toLowerCase().includes(value.toLowerCase())
      );
      setAutoIngredients(filteredIngredients);
      return;
    }
    setAutoIngredients([]);
    setTags([...tags, value]);
    (e.target as HTMLInputElement).value = "";
  };

  function removeTag(index: number) {
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
      <datalist id="ingredients">
        {autoIngredients.map((ingredient) => (
          <option value={ingredient} />
        ))}
      </datalist>
    </div>
  );
}

export default TagsInput;
