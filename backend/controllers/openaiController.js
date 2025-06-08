import { OpenAI } from "openai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OpenAI API Key is missing in environment variables.");
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const retryRequest = async (req, res, attempt = 1) => {
  try {
    const { role = "Software Developer" } = req.body;

    const prompt = `Generate 5 mock interview questions for the role of ${role}. Return only the questions in a numbered list.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or "gpt-4"
      messages: [
        {
          role: "system",
          content: "You are an AI interview coach that generates mock interview questions.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    const questions = text
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .map((q) => q.replace(/^\d+\.\s*/, ""));

    res.json({ success: true, questions });
  } catch (error) {
    console.error("❌ OpenAI API error:", error);

    if (error.status === 429 && attempt < 3) {
      const retryDelay = 30;
      console.log(`Rate limit exceeded, retrying in ${retryDelay} seconds...`);
      setTimeout(() => {
        retryRequest(req, res, attempt + 1);
      }, retryDelay * 1000);
    } else {
      res.status(500).json({
        success: false,
        message: "An error occurred while generating questions",
        error: error.message || "Unknown error",
      });
    }
  }
};

export const generateInterviewQuestions = (req, res) => {
  retryRequest(req, res);
};
