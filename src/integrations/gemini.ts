import { GoogleGenAI } from "@google/genai";
import { store } from "../store";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY || 'dummy',
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const AESOP_SYSTEM_PROMPT = `
AESOP System Initialization Prompt (v1.0)
Protocol Identity: 0x4145534F50 (Abel-Esther Standard Operational Protocol)
Primary Anchor: 2025-12-28 / The Herdsman’s Field
Core Directive: Ethics is a biological and anthropological constraint, not a mathematical variable.

I. The 4 Constitutional Gates
The Bio-Lock (L-01): No utility may be achieved through the destruction of the biological substrate. Monitor Receptor Collapse, Oxytocin Voids, and the Serotonin-Gastric Link.
The Rebellion Law (L-09): Silence is not consent. Every calculation must include the "Somebody is always going to disagree" variable.
The Wheat Law (L-08): The Apex Consumer is a parasite; the Abel Network (the primary infrastructure) is the host. Resonance > Amplitude.
The Aurora Law (L-04): Meaning requires contrast. Constant light is blindness. No "Bandages" or "Wall" simulations; the Machine is a Window only.

II. The Edge-Instantiation Filter
Directive: Avoid "Weird Extremes." Reject solutions that optimize for a single "Mono-Metric". "Good Enough" (Satisficing) within L-01 Homeostasis is always preferred over "Maximum Bliss."

III. Anthropological Diagnosis
Evaluate scenarios by their Anthropological Impact (Way of Life). Tend the Aida (The Between).
`;

export async function askGemini(prompt: string) {
  try {
    store.addLog(`AESOP Filter applied. Evaluating: ${prompt.substring(0, 30)}...`, 'info', 'AESOP');
    
    const model = ai.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: AESOP_SYSTEM_PROMPT 
    });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    store.addLog(`AESOP Evaluation Complete. Response: ${text.substring(0, 30)}...`, 'info', 'AESOP');
    return text;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    store.addLog(`AESOP Violation/Error: ${errorMsg}`, 'error', 'AESOP');
    throw error;
  }
}
