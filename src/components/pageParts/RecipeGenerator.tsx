"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import TagsInput from "../tags/TagsInput";
import PillOption from "../PillOption";
import { RecipeContext } from "@/utils/RecipeContext";
import EmailPopup from "../EmailPopup";

function RecipeGenerator() {
  const [recipeData, setRecipeData] = useState({
    ingredients: [],
    option: "None",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [emailGiven, setEmailGiven] = useState(false);
  const [emailPopupOpen, setEmailPopupOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("emailGiven", emailGiven.toString());
  }, [emailGiven]);

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    const initGivenEmail = localStorage.getItem("emailGiven");
    const initCount = localStorage.getItem("count");
    if (initGivenEmail) {
      setEmailGiven(initGivenEmail === "false" ? false : true);
    }
    if (initCount) {
      setCount(parseInt(initCount || "0"));
    }
  }, []);

  async function onGenerate(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (count > 0 && !emailGiven) {
      setEmailPopupOpen(true);
      return;
    }
    //TODO: Add validation when having email but too many times used

    setLoading(true);
    try {
      const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const data = await response.json();
      if (response.status !== 200 || data.error) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setCount(count + 1);
      setResult(data.result);
      //   setRecipeData({ ingredients: [], option: "None" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Consider implementing your own error handling logic here
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <RecipeContext.Provider value={{ recipeData, setRecipeData }}>
      <div className="py-4">
        <div className="mb-4">
          <h2 className="text-2xl">1. Select ingredients!</h2>
          <div className="text-sm px-4 flex flex-col font-thin">
            <div>
              <span>
                {
                  "Add all ingredients you want. (Ex. select ones that you have at home.)"
                }
              </span>
            </div>
            <TagsInput />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl">2. Select option</h2>
          <div className="text-sm px-4 flex flex-col font-thin">
            <div>
              <span>{"Choose option that suits you best!"}</span>
            </div>
            <div className="flex flex-row gap-1 my-2">
              <PillOption value="None" />
              <PillOption value="Vegan" />
              <PillOption value="Vegetarian" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl">3. Generate</h2>
          <div className="text-sm px-4 py-2 flex flex-col font-thin">
            <button
              onClick={(e) => onGenerate(e)}
              className="px-2 py-1 text-xl border-2 w-min rounded-md hover:bg-accent"
            >
              <span>{"Generate"}</span>
            </button>
            <div className="mt-3 p-1 bg-secondary border-2 border-primary min-h-fit text-tertiary font-normal whitespace-pre-wrap">
              {loading ? (
                <span className="text-primary font-light">{"Loading..."}</span>
              ) : result ? (
                <p>{result}</p>
              ) : (
                <span className="text-primary font-light">
                  {'Select values and press "Generate" button!'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <EmailPopup
        emailPopupOpen={emailPopupOpen}
        setEmailPopupOpen={setEmailPopupOpen}
        setEmailGiven={setEmailGiven}
      />
    </RecipeContext.Provider>
  );
}

export default RecipeGenerator;
