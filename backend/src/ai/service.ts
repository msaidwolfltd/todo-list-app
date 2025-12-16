import dotenv from "dotenv";

dotenv.config();

export async function generateAdviceForUser(userId: string) {
  // Placeholder implementation: in later tasks we'll call OpenAI/GPT and analyze user todos.
  // For now return a simple static suggestion object.
  return {
    userId,
    advice: "Try breaking large tasks into 25-minute focused intervals (Pomodoro) and prioritize tasks with near deadlines.",
    confidence: 0.6
  };
}
