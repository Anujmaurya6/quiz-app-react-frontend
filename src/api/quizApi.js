const BASE_URL = "http://localhost:8080/quiz";
// 🔹 START QUIZ API
// Start Quiz button pe hit hogi
// Backend se quiz + questions laayegi
export const startQuizApi = async (quizId) => {
  const res = await fetch(`${BASE_URL}/${quizId}`);
  if (!res.ok) {
    throw new Error("Failed to load quiz");
  }
  return res.json(); // 👈 yahin se quiz object aata hai
};

// 🔹 SUBMIT SCORE API
// Submit button pe hit hogi
export const submitScoreApi = async (quizId, score) => {
  const res = await fetch(
    `${BASE_URL}/${quizId}/score?score=${score}`,
    {
      method: "POST",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to submit score");
  }
  return res.text(); // backend string return kar raha hai
};
