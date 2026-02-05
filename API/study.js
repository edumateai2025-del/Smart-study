export default async function handler(req, res) {
  const { topic } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5-nano",
      messages: [{
        role: "user",
        content: `
Explain "${topic}" for a student.

Return JSON ONLY with:
{
  "definition": "",
  "keyPoints": [],
  "examples": [],
  "quiz": [
    {
      "question": "",
      "options": [],
      "answer": ""
    }
  ]
}
`
      }]
    })
  });

  const data = await response.json();
  const text = data.choices[0].message.content;

  res.status(200).json(JSON.parse(text));
}
