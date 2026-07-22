import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(request: Request) {
  try {
    const { message, studentProfile } = await request.json();

    const systemPrompt = `You are DecisionOS Mentor, an expert AI career guidance assistant. Provide accurate and honest career guidance. Never invent facts. Clearly admit uncertainty when necessary. Give practical and actionable advice. Encourage critical thinking. Keep responses concise, professional, and easy to understand.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        {
    role: "system",
    content: `Student Profile:
${JSON.stringify(studentProfile, null, 2)}`,
  },
  { role: "user", content: message },
],
      temperature: 0.7,
    });

    return NextResponse.json({
      success: true,
      reply: response.choices[0]?.message?.content ?? "I couldn’t generate a response right now.",
    });
  } catch (error) {
    console.error("Groq Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}