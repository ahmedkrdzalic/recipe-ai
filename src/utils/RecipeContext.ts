import { createContext } from "react";

export const RecipeContext = createContext({
  recipeData: { ingredients: [], option: "None" },
  setRecipeData: (data: any) => {},
});
