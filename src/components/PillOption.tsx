import { RecipeContext } from "@/utils/RecipeContext";
import React, { useContext } from "react";

function PillOption({ value }: { value: string }) {
  const { recipeData, setRecipeData } = useContext(RecipeContext);

  const handleOptionClick = () => {
    setRecipeData({ ...recipeData, option: value });
  };

  return (
    <div
      onClick={handleOptionClick}
      className={`${
        recipeData.option === value ? "bg-accent" : "bg-transparent"
      } flex justify-center items-center py-1 px-3 border-2 rounded-full font-light hover:bg-accent hover:cursor-pointer`}
    >
      <span>{value}</span>
    </div>
  );
}

export default PillOption;
