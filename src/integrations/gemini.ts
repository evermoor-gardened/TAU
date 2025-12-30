import { GoogleGenAI } from "@google/genai";
import { store } from "../store";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY || 'dummy',
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

export async function askGemini(prompt: string) {
  try {
    store.addLog(`Sending prompt to Gemini: ${prompt.substring(0, 50)}...`, 'info', 'Gemini');
    
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    store.addLog(`Gemini responded: ${text.substring(0, 50)}...`, 'info', 'Gemini');
    return text;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    store.addLog(`Gemini Error: ${errorMsg}`, 'error', 'Gemini');
    throw error;
  }
}
