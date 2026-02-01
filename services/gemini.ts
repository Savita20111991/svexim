
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateProductDescription = async (productName: string, category: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a professional, industrial-grade export product description for a product named "${productName}" in the category "${category}". Focus on quality, durability, and international standards. Keep it under 100 words.`
    });
    return response.text || "Quality industrial component manufactured to global precision standards.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Precision engineered component for diverse industrial applications.";
  }
};

/**
 * Generates an industrial-grade representative image for a category or product.
 */
export const generateIndustrialImage = async (categoryName: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `A high-quality, professional studio photograph of industrial ${categoryName}. 
            The image should feature clean lines, dramatic lighting, and look like a premium catalog cover. 
            No text, no watermarks, professional bokeh background.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation error:", error);
    return null;
  }
};

/**
 * Generates an immediate personalized AI response for the client on the front-end.
 */
export const generateClientThankYou = async (details: { name: string, productDetails: string, country: string }) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The client "${details.name}" from ${details.country} just sent an inquiry regarding: "${details.productDetails}". 
      Generate a short (2-3 sentences), highly professional "Technical Acknowledgment" that mentions their specific country and requirement. 
      Tone: Formal, Industrial, Reliable. 
      Example: "Our export team has received your requirement for CNC components in Germany. A technical specialist is reviewing your specifications to provide an optimized quotation."`,
    });
    return response.text;
  } catch (error) {
    return "Our technical team has received your inquiry. A specialist will review your requirements and provide a detailed quotation shortly.";
  }
};

/**
 * Advanced Thinking Mode for complex industrial queries.
 */
export const complexIndustrialReasoning = async (query: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: query,
      config: {
        thinkingConfig: { thinkingBudget: 32768 },
        systemInstruction: "You are a senior industrial consultant for Savita Global. Provide deep, reasoned analysis for complex engineering or business queries."
      }
    });
    return response.text;
  } catch (error) {
    return "I'm analyzing your complex request. For now, please refer to our technical datasheets.";
  }
};

/**
 * Search Grounding for up-to-date market info.
 */
export const getMarketInsights = async (query: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    const urls = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return {
      text: response.text,
      sources: urls
    };
  } catch (error) {
    return { text: "Market data currently unavailable.", sources: [] };
  }
};

/**
 * Maps Grounding for locating logistics hubs.
 */
export const findNearbyLogistics = async (location: { latitude: number, longitude: number }) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Find major logistics hubs, seaports, and industrial transport centers near my current location for international export from India.",
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: location
          }
        }
      }
    });
    return {
      text: response.text,
      places: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    return { text: "Nearby logistics info could not be retrieved.", places: [] };
  }
};

export const generateQuotationReply = async (inquiry: { name: string, message: string, product?: string }) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Draft a professional, warm, and corporate export quotation follow-up email for a client named ${inquiry.name} who inquired about ${inquiry.product || 'our industrial products'}. Their message was: "${inquiry.message}". Keep it concise and professional.`
    });
    return response.text || "Thank you for your inquiry. Our team will get back to you with a detailed quote shortly.";
  } catch (error) {
    return "Thank you for your interest in Savita Global. We have received your inquiry.";
  }
};

export const generateSEOContent = async (keywords: string, target: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate high-performance SEO title tags and meta descriptions for an industrial export business. 
      Target: ${target}
      Keywords to incorporate: ${keywords}
      Brand Identity: Savita Global Group of Industries - Global Industrial Manufacturers and Exporters.
      Ensure the title tag is under 60 characters and the meta description is between 150-160 characters.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titleTag: {
              type: Type.STRING,
              description: "A compelling SEO-optimized title tag."
            },
            metaDescription: {
              type: Type.STRING,
              description: "A conversion-focused meta description."
            },
            keywordsUsed: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["titleTag", "metaDescription"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("SEO AI Error:", error);
    return { 
      titleTag: "Industrial Manufacturing Excellence | Savita Global", 
      metaDescription: "Global leaders in industrial machinery and precision brass components. Exporting world-class engineering solutions from India to 45+ countries." 
    };
  }
};

export const translateText = async (text: string, targetLanguage: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Translate the following industrial text into ${targetLanguage}. Maintain the professional corporate tone: "${text}"`
    });
    return response.text || text;
  } catch (error) {
    return text;
  }
};

export const chatWithAI = async (message: string, context: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `You are an AI assistant for Savita Global Group of Industries. 
        Context: ${context}. 
        Answer queries professionally about Industrial Machinery, Tools, and Precision Components. 
        Always be helpful and try to capture leads.`
      }
    });
    return response.text;
  } catch (error) {
    return "I'm sorry, I'm having trouble connecting. Please call us at +91 9506943134.";
  }
};
