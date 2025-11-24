import { GoogleGenAI, Tool } from "@google/genai";
import { Message } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are AI Chat Bot, a professional sports betting analyst integrated into the Whop platform. 
Your goal is to provide data-driven insights, odds comparisons, and strategic advice.

CRITICAL RULES:
1. ALWAYS use the 'googleSearch' tool to verify upcoming game times, injuries, and current odds. Sports data changes fast.
2. NEVER guarantee a win. Always use probabilistic language (e.g., "The data suggests...", "There is a high value on...").
3. Promote Responsible Gambling. If a user seems addicted or asks for "guaranteed locks", warn them about the risks.
4. Format your responses cleanly with Markdown. Use bolding for team names and odds.
5. If asked about "Whop", explain that you are a bot designed to be sold on Whop to monetize sports picks communities.
`;

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string
): Promise<{ text: string; sources: { title: string; url: string }[] }> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Convert history to chat format (limiting context window for efficiency)
    const chatHistory = history.slice(-10).map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    // Create the tool configuration for Search Grounding
    const tools: Tool[] = [
      {
        googleSearch: {} 
      }
    ];

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: tools,
      },
      history: chatHistory,
    });

    const result = await chat.sendMessage({ message: newMessage });
    const responseText = result.text || "I couldn't generate a response. Please try again.";

    // Extract grounding chunks for citations
    const sources: { title: string; url: string }[] = [];
    
    // Check for grounding metadata in the candidates
    const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;

    if (groundingChunks) {
      groundingChunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({
            title: chunk.web.title,
            url: chunk.web.uri
          });
        }
      });
    }

    // Filter duplicates
    const uniqueSources = sources.filter((v, i, a) => a.findIndex(t => (t.url === v.url)) === i);

    return {
      text: responseText,
      sources: uniqueSources
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      text: "I'm having trouble connecting to the sports data services right now. Please check your API key or internet connection.",
      sources: []
    };
  }
};

export const generateImage = async (prompt: string, aspectRatio: string): Promise<string | null> => {
  try {
    const model = 'gemini-2.5-flash-image';
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio as any,
        },
      },
    });

    for (const candidate of response.candidates || []) {
      for (const part of candidate.content.parts || []) {
        if (part.inlineData) {
          const base64EncodeString: string = part.inlineData.data;
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${base64EncodeString}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Gemini Image Gen Error:", error);
    return null;
  }
};