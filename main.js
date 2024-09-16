import dotenv from "dotenv";
import { getQuery, getImagePath, close } from "./userInput.js";
import { convertToBase64, getImageMimeType } from "./imageProcessing.js";
import { callOpenAI } from "./OpenAIApiCall.js";
import { askClaude } from "./ClaudeApiCall.js";
import * as ollama from "./OllamaApiCall.js";

dotenv.config();

async function main() {
  while (true) {
    try {
      const query = await getQuery();
      const imagePath = await getImagePath();
      const imageBase64 = await convertToBase64(imagePath);
      const imageMimeType = getImageMimeType(imagePath);
      const aiModel = await getQuery("AI Model");
      console.log("Query:", aiModel);
      let response = "";
      switch (aiModel) {
        case "claude":
          response = await askClaude(query, imageBase64, imageMimeType);
          break;
        case "openai":
          response = await callOpenAI(query, imageBase64, imageMimeType);
          break;
        case "ollama":
          response = await ollama.askOllama2(query, imagePath);
          break;
        default:
          response = null;
      }
      console.log("AI Response:", response);
    } catch (error) {
      console.error("An error occurred:", error);
 
    }
  }
}

main().catch(console.error).finally(close);
