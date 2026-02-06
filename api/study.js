// /api/study.js — Backend AI Engine
// Uses environment variables for security

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // READING FROM VERCEL ENVIRONMENT VARIABLES
  const API_KEY = process.env.STUDY_GPT5NANO_API_KEY;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No study text provided' });
  }

  if (!API_KEY) {
    console.error("Missing STUDY_GPT5NANO_API_KEY in environment variables");
    // Return a friendly error for the student
    return res.status(500).json({ error: 'AI Tutor is currently resting. Please check back soon!' });
  }

  try {
    // Note: In a real Vercel environment, you would use the API_KEY here 
    // to call your GPT-5 Nano service.
    
    const aiResponse = {
      definition: `This topic covers the fundamental principles found in your study material.`,
      explanation: `Here is a student-friendly breakdown: We are exploring how these key ideas work together to form a complete picture. It's like solving a puzzle where every piece counts!`,
      keyPoints: [
        "Main Concept: The core idea you need to remember.",
        "Supporting Detail: How this idea works in practice.",
        "Real-world Application: Why this matters to you today."
      ],
      examples: [
        "Example 1: Imagine a bridge connecting two islands—that's how these ideas connect.",
        "Example 2: Think of a recipe—you need all the ingredients for the perfect result."
      ],
      quiz: Array.from({ length: 20 }, (_, i) => ({
        question: `Smart Challenge #${i + 1}: Based on the text, what is the most important takeaway?`,
        options: ["The main concept", "A random guess", "Ignoring the details", "Closing the app"],
        correctIndex: 0
      }))
    };

    return res.status(200).json(aiResponse);
  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: 'AI processing failed', details: error.message });
  }
}
