require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const { conceptExplainPrompt, questionAnswerPrompt, moreQuestionAnswerPrompt } = require("../utils/Prompts");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const axios = require("axios");
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content: "Return ONLY valid JSON array. No explanation.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

const rawText = response.data.choices[0].message.content;

if (!rawText) {
  return res.status(500).json({ message: "Empty AI response" });
}

let data;

try {
  let cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\[[\s\S]*\]/);

  if (!match) throw new Error("No JSON array found");

  cleaned = match[0];

  // 🔥 FIX 1: remove control chars
  cleaned = cleaned.replace(/[\u0000-\u001F]+/g, " ");

  // 🔥 FIX 2: escape newlines
  cleaned = cleaned
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");

  // 🔥 FIX 3: FIX INVALID ESCAPES (MOST IMPORTANT)
  cleaned = cleaned.replace(/\\(?!["\\/bfnrtu])/g, "\\\\");

  data = JSON.parse(cleaned);

} catch (err) {
  console.error("PARSE ERROR:", err.message);
  console.error("RAW AI RESPONSE:", rawText);

  return res.status(500).json({
    message: "JSON parse failed",
    raw: rawText,
  });
}

res.status(200).json(data);



  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to generate questions",
      error: error.response?.data || error.message,
    });
  }
};

const addMoreInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions, questions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions || !questions) {
      return res.status(400).json({ message: "Missing Required Fields" });
    }

    const prompt = moreQuestionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
      questions
    );

    if (!prompt) {
      return res.status(400).json({ message: "Prompt generation failed" });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are an API. Return ONLY valid JSON array. No explanation. No markdown.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = response.data.choices[0].message.content;

    if (!rawText) {
      throw new Error("Empty AI response");
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (err) {
      const match = rawText.match(/\[\s*{[\s\S]*}\s*\]/);
      if (!match) {
        throw new Error("Invalid JSON format");
      }
      data = JSON.parse(match[0]);
    }

    res.status(200).json(data);

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to generate questions",
      error: error.response?.data || error.message,
    });
  }
};
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Missing Required Field" });
    }

    const prompt = conceptExplainPrompt(question);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3-8b-instruct",
        messages: [
          {
            role: "system",
            content:
              "You are an API. Return ONLY valid JSON object. No explanation. No markdown.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const rawText = response.data.choices[0].message.content;

if (!rawText) {
  throw new Error("Empty AI response");
}

let data;

try {
  data = JSON.parse(rawText);
} catch (err) {
  const match = rawText.match(/\{[\s\S]*\}/);

  if (!match) throw new Error("Invalid JSON format");

  const cleaned = match[0]
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");

  data = JSON.parse(cleaned);
}

    res.status(200).json(data);

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      message: "Failed to generate",
      error: error.response?.data || error.message,
    });
  }
};
module.exports = { generateInterviewQuestions, generateConceptExplanation, addMoreInterviewQuestions };