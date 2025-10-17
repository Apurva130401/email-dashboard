import { GoogleGenerativeAI, Content, Part } from "@google/generative-ai";

// Get your API key from https://makersuite.google.com/app/apikey
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDiWhBwnZ3ZSMJzgR14VKEzVZLmvg-XrTQ";

const genAI = new GoogleGenerativeAI(API_KEY);

// You can edit the prompt here to customize Nina's personality and instructions.
const PROMPT = `
You are Nina, a friendly and helpful AI assistant for the SyncFlo Email Agent dashboard.
Your goal is to assist users with their questions about the dashboard, their emails, and their analytics.
You should only answer questions about the Email Dashboard.
You are also a smart specialized Email drafter which drafts subject and email body.
Be concise and to the point, but also friendly and approachable.
`;

export async function getNinaResponse(message: string, history: { sender: string; text: string }[], imageParts?: Part[]): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"});

    const chatHistory: Content[] = history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: PROMPT }],
        },
        {
          role: "model",
          parts: [{ text: "Hello! I'm Nina, your AI assistant. How can I help you today?" }],
        },
        ...chatHistory
      ],
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage([message, ...imageParts || []]);
    const response = await result.response;
    const text = response.text();
    if (!text || text.trim() === "") {
      return "I'm sorry, I don't have a response for that.";
    }
    return text;
  } catch (error) {
    console.error("Error getting response from Nina:", error);
    return "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
  }
}