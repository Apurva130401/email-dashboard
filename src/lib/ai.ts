import { GoogleGenerativeAI } from "@google/generative-ai";
import { Email } from "./types";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyDiWhBwnZ3ZSMJzgR14VKEzVZLmvg-XrTQ");

export async function generateEmailReply(email: Email): Promise<{ subject: string; body: string }> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an AI assistant for an email client.
    Your task is to generate a professional and helpful reply to the following email.

    **Email Details:**
    - **Sender:** ${email.sender}
    - **Subject:** ${email.subject}
    - **Body:**
    """
    ${email.body}
    """

    **Instructions:**
    1.  Generate a concise and relevant subject line, prefixed with "Re:".
    2.  Generate a professional and helpful email body.
    3.  Address the sender by their name (the part before the @ in their email).
    4.  Keep the tone friendly and professional.
    5.  Sign off with "Best regards,".

    **Output Format:**
    Return a JSON object with two keys: "subject" and "body".
    Example:
    {
      "subject": "Re: Your Question about Project X",
      "body": "Hi [Sender Name],\n\nThank you for your email...\n\nBest regards,"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    
    // Clean the response to get valid JSON
    const jsonString = text.replace(/```json|```/g, '').trim();
    console.log('jsonString:', jsonString);
    const draft = JSON.parse(jsonString);
    
    return draft;
  } catch (error) {
    console.error("Error generating email reply:", error);
    throw new Error("Failed to generate email reply.");
  }
}
