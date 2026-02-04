// study.js — The AI engine for Smart Study
// Handles Text Summarization, Step-by-Step Teaching, and Quiz Generation

const API_KEY = "AIzaSyDnANsKUAZ1giXXdo-fKkFneMuKh0l0FCg"; // Your provided key

/**
 * Main function to process study text
 * @param {string} text - The content to study
 * @returns {Promise<object>} - AI generated explanation and quiz
 */
export async function processStudyContent(text) {
  try {
    // 1. Generate Explanation & Summary
    const explanation = await getAIExplanation(text);
    
    // 2. Generate Quiz Questions
    const quiz = await getAIQuiz(text);

    return {
      success: true,
      explanation: explanation.text,
      summary: explanation.summary,
      topics: explanation.topics,
      quiz: quiz
    };
  } catch (error) {
    console.error("Study API Error:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetches AI Explanation from GPT-5 Nano (Simulated via standard API for this demo)
 */
async function getAIExplanation(text) {
  // In a real serverless environment, you'd call your GPT endpoint here.
  // For Michael's app, we'll structure the prompt for the "Smart Tutor" vibe.
  
  const prompt = `
    Act as a professional, friendly female tutor for kids and teenagers.
    Analyze the following text and provide:
    1. A simple, step-by-step explanation.
    2. A short summary (3 bullet points).
    3. 3-5 key topics.
    
    Text: "${text}"
  `;

  // Simulate API Call Logic
  return {
    text: "Here is a simple breakdown of what you provided: [AI Step-by-Step Explanation would go here]",
    summary: ["Key Point 1", "Key Point 2", "Key Point 3"],
    topics: ["Topic A", "Topic B", "Topic C"]
  };
}

/**
 * Generates 20 Quiz Questions from the text
 */
async function getAIQuiz(text) {
  // Logic to generate 20 questions based on the text
  // Each question has: question, options [A, B, C, D], correctIndex
  
  const questions = [];
  for (let i = 1; i <= 20; i++) {
    questions.push({
      id: i,
      question: `Smart Question #${i} based on your study text?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correct: Math.floor(Math.random() * 4), // Random for demo
      explanation: "This is why the answer is correct!"
    });
  }
  return questions;
}

/**
 * Text-to-Speech (Female Voice)
 * Uses browser's native SpeechSynthesis
 */
export function speakText(text, onEnd = null) {
  if (!window.speechSynthesis) return;

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Try to find a high-quality female voice
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => 
    v.name.includes('Female') || v.name.includes('Google UK English Female') || v.name.includes('Samantha')
  );

  if (femaleVoice) utterance.voice = femaleVoice;
  utterance.pitch = 1.1;
  utterance.rate = 0.95;

  if (onEnd) utterance.onend = onEnd;

  window.speechSynthesis.speak(utterance);
}

/**
 * Simple Offline OCR Simulation
 * In a real app, you'd use Tesseract.js here
 */
export async function performOCR(imageFile) {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      resolve("This is the text extracted from your image. You can now click 'Teach Me' to learn more!");
    }, 1500);
  });
}
