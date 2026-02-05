import fetch from "node-fetch";

export default async function handler(req, res) {
  const { topic } = req.query;

  if (!topic) {
    return res.status(400).json({ error: "Topic is required" });
  }

  const OPENAI_API_KEY = process.env.STUDY_GPT5NANO_KEY;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        messages: [
          {
            role: "user",
            content: `Provide:
              1. Definition
              2. Key Points
              3. Examples
              4. 20 Quiz Questions
            For this topic: ${topic}`
          }
        ],
        max_tokens: 1200
      })
    });

    const data = await response.json();

    // Here, parse OpenAI output as needed
    res.status(200).json({
      success: true,
      explanation: data.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI API error" });
  }
}
