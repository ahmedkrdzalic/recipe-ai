"use client";
import TagItem from "./TagItem";
import TagInput from "./TagInput";
import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { INGREDIENTS } from "@/utils/INGREDIENTS";
import { RecipeContext } from "@/utils/RecipeContext";

function TagsInput() {
  const inputRef = useRef(null);

  const { recipeData, setRecipeData } = useContext(RecipeContext);

  const [autoIngredients, setAutoIngredients] = useState<string[]>([]);

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
    if (!INGREDIENTS.includes(value.toLowerCase())) return;
    setRecipeData({
      ...recipeData,
      ingredients: [...recipeData.ingredients, value],
    });
    setAutoIngredients([]);
    (e.target as HTMLInputElement).value = "";
  };

  function removeTag(index: number) {
    setRecipeData({
      ...recipeData,
      ingredients: recipeData.ingredients.filter((_, i) => i !== index),
    });
  }

  return (
    <div
      id="tags-input-container"
      className="p-1 w-full border-2 rounded-md border-solid border-primary bg-secondary flex items-center flex-wrap gap-1"
    >
      {recipeData.ingredients.map((ing, i) => (
        <TagItem tagKey={i} tag={ing} removeTag={removeTag} />
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
