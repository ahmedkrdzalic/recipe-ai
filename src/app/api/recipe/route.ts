import { Configuration, OpenAIApi } from "openai";
import { NextRequest, NextResponse as res } from "next/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  const reqBody = await req.json();

  if (!configuration.apiKey) {
    return res.json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
  }

  const ingredients = reqBody.ingredients || "";
  const option = reqBody.option || "";

  if (ingredients.length === 0 || option.trim().length === 0) {
    return res.json({
      error: {
        message: "Please enter some ingredients and/or option",
      },
    });
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-001",
      prompt: generatePrompt(ingredients, option),
      temperature: 0.4,
      max_tokens: parseInt(process.env.OPENAI_API_NUMBER_OF_TOKENS || "200"),
    });

    return res.json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return res.json({ error: error.response });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return res.json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(ingredients: string[], option: string) {
  return `Return a ${
    option === "Vegan" || option === "Vegetarian" ? option : ""
  } recipe using some or all ingredients provided. Return should consist of these fields: name: string (recipe name), ingredients: {name: string, amount: string}[], instructions: string[], note: string (any notes that are not meant for other fields). 
ingredients: ${ingredients.join(", ")}`;

  // `Return a ${
  //   option === "Vegan" || option === "Vegetarian" ? option : ""
  // } recipe using some or all ingredients provided. Return the whole recipe in the JSON format with fields: name: string (recipe name), ingredients: {name: string, amount: string}[], instructions: string[], note: string (if you have any notes regarding this query).
  //   ingredients: ${ingredients.join(", ")}`;
}
