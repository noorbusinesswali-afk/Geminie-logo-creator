import { GoogleGenAI } from "@google/genai";
import { LogoFormData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLogoImage = async (formData: LogoFormData): Promise<string> => {
  const { name, style, colors, description } = formData;
  
  // Construct the prompt based on the user's template and inputs
  const prompt = `Create a unique and professional logo for the name '${name}'. 
  Design the logo with ${style} style, balanced composition, and clear readability. 
  Use colors like ${colors} and shapes that reflect the personality and theme of the name. 
  ${description ? `Additional details: ${description}.` : ''} 
  The logo should be suitable for digital and print use, scalable, and aesthetically harmonious. 
  Ensure the background is clean or solid to distinguish the logo easily.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    // Extract the image from the response
    let imageUrl = '';
    const candidates = response.candidates;
    if (candidates && candidates.length > 0) {
      const parts = candidates[0].content.parts;
      for (const part of parts) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          // Assuming mimeType is image/png or image/jpeg, usually standardizes to png or jpeg
          const mimeType = part.inlineData.mimeType || 'image/png';
          imageUrl = `data:${mimeType};base64,${base64EncodeString}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data found in the response.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Error generating logo:", error);
    throw error;
  }
};