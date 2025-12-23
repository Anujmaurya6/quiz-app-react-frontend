import React, { useState } from 'react'
import { startQuizApi,submitScoreApi } from './api/quizapi'


function App() {
  const quizId = 1;

  const [quiz, setQuiz] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  const startQuiz = async () => {
    const data = await startQuizApi(quizId);
    setQuiz(data);
    setStarted(true);
  };

  const selectOption = (option) => {
    const copy = [...answers];
    copy[currentIndex] = option;
    setAnswers(copy);
  };

  const next = () => setCurrentIndex(currentIndex + 1);
  const prev = () => setCurrentIndex(currentIndex - 1);

  const submitQuiz = async () => {
    let sc = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) sc++;
    });
    setScore(sc);
    setFinished(true);
    await submitScoreApi(quizId, sc);
  };

  /* ---------- UI ---------- */

  if (!started) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Quiz App</h2>
        <button
          onClick={startQuiz}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Quiz
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-2">Quiz Finished</h2>
        <p className="text-lg">
          Score: {score} / {quiz.questions.length}
        </p>
      </div>
    );
  }

  const q = quiz.questions[currentIndex];

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h3 className="mb-2 font-medium">
        Question {currentIndex + 1} / {quiz.questions.length}
      </h3>

      <p className="mb-4">{q.questionText}</p>

      <div className="space-y-2">
      <button
  onClick={() => selectOption(q.optionA)}
  className={`w-full border px-3 py-2 rounded
    ${answers[currentIndex] === q.optionA ? "bg-green-500 text-white" : ""}
  `}
>
  A) {q.optionA}
</button>

<button
  onClick={() => selectOption(q.optionB)}
  className={`w-full border px-3 py-2 rounded
    ${answers[currentIndex] === q.optionB ? "bg-green-500 text-white" : ""}
  `}
>
  B) {q.optionB}
</button>

<button
  onClick={() => selectOption(q.optionC)}
  className={`w-full border px-3 py-2 rounded
    ${answers[currentIndex] === q.optionC ? "bg-green-500 text-white" : ""}
  `}
>
  C) {q.optionC}
</button>

<button
  onClick={() => selectOption(q.optionD)}
  className={`w-full border px-3 py-2 rounded
    ${answers[currentIndex] === q.optionD ? "bg-green-500 text-white" : ""}
  `}
>
  D) {q.optionD}
</button>

      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={prev}
          disabled={currentIndex === 0}
          className="px-4 py-2 border rounded"
        >
          Prev
        </button>

        {currentIndex === quiz.questions.length - 1 ? (
          <button
            onClick={submitQuiz}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
