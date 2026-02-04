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
 * Fetches AI Explanation from GPT-5 Nano (Simulated via standard API structure)
 */
async function getAIExplanation(text) {
  // Structure the prompt for the "Smart Tutor" vibe (Friendly & Clear)
  const prompt = `
    Act as a professional, friendly female tutor for kids and teenagers.
    Analyze the following text and provide:
    1. A simple, step-by-step explanation.
    2. A short summary (3 bullet points).
    3. 3-5 key topics.
    
    Text: "${text}"
  `;

  // Simulate API Call Logic for the frontend
  return {
    text: "Here is a simple, step-by-step breakdown of what you're studying! I've made it easy to understand so you can master this topic in no time. [Detailed AI Explanation would appear here based on your text]",
    summary: ["Key Point 1: The main idea.", "Key Point 2: Important detail.", "Key Point 3: Final takeaway."],
    topics: ["Main Topic", "Supporting Detail", "Concept Connection"]
  };
}

/**
 * Generates 20 Quiz Questions from the text
 */
async function getAIQuiz(text) {
  const questions = [];
  for (let i = 1; i <= 20; i++) {
    questions.push({
      id: i,
      question: `Smart Question #${i} about this topic?`,
      options: ["Correct Answer Option", "Wrong Option B", "Wrong Option C", "Wrong Option D"],
      correct: 0, // In real AI, this would vary
      explanation: "This answer is correct because it directly relates to the main concept we just studied!"
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

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  
  const voices = window.speechSynthesis.getVoices();
  // Look for a friendly female voice
  const femaleVoice = voices.find(v => 
    v.name.includes('Female') || v.name.includes('Google UK English Female') || v.name.includes('Samantha') || v.name.includes('Microsoft Zira')
  );

  if (femaleVoice) utterance.voice = femaleVoice;
  utterance.pitch = 1.1;
  utterance.rate = 0.95;

  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
}

/**
 * Simple Offline OCR Simulation
 */
export async function performOCR(imageFile) {
  return new Promise((resolve) => {
    // Simulate processing time
    setTimeout(() => {
      resolve("This is the text extracted from your image. You can now click 'Teach Me' to learn more about this subject!");
    }, 1500);
  });
