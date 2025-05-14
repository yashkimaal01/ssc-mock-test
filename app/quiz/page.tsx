// app/quiz/page.tsx 
"use client";

import { useEffect, useState } from "react"; import { useSearchParams } from "next/navigation";

const questions = [ { question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"], answer: "New Delhi", }, { question: "Who wrote the Ramayana?", options: ["Tulsidas", "Valmiki", "Vyasa", "Kalidasa"], answer: "Valmiki", }, { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars", }, ];

export default function QuizPage() { const searchParams = useSearchParams(); const name = searchParams.get("name") || "Guest";

const [current, setCurrent] = useState(0); const [answers, setAnswers] = useState<(string | null)[]>( Array(questions.length).fill(null) ); const [submitted, setSubmitted] = useState(false); const [timeLeft, setTimeLeft] = useState(60);

useEffect(() => { if (timeLeft > 0 && !submitted) { const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000); return () => clearTimeout(timer); } }, [timeLeft, submitted]);

const handleOptionSelect = (option: string) => { const updated = [...answers]; updated[current] = option; setAnswers(updated); };

const handleNext = () => { if (current < questions.length - 1) setCurrent(current + 1); };

const handlePrev = () => { if (current > 0) setCurrent(current - 1); };

const handleSubmit = () => { if (timeLeft <= 0) setSubmitted(true); };

const q = questions[current]; const selected = answers[current];

const correctCount = answers.filter( (a, i) => a === questions[i].answer ).length; const wrongCount = answers.filter( (a, i) => a !== null && a !== questions[i].answer ).length; const unattemptedCount = answers.filter((a) => a === null).length;

return ( <div className="max-w-xl mx-auto p-4"> <h1 className="text-2xl font-bold mb-2">Welcome, {name}</h1> <h2 className="text-xl font-semibold mb-2">Time left: {timeLeft}s</h2>

{!submitted ? (
    <>
      <h3 className="text-lg font-bold mb-2">
        Q{current + 1}: {q.question}
      </h3>
      <div className="space-y-2 mb-4">
        {q.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={`block w-full text-left px-4 py-2 rounded border ${
              selected === option
                ? "bg-blue-200 border-blue-600"
                : "bg-white"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={current === 0}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={current === questions.length - 1}
          className="bg-gray-300 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleSubmit}
          disabled={timeLeft > 0}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Test
        </button>
      </div>
    </>
  ) : (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Test Submitted!</h2>
      <p className="mb-2">Correct: {correctCount}</p>
      <p className="mb-2">Wrong: {wrongCount}</p>
      <p className="mb-2">Unattempted: {unattemptedCount}</p>
    </div>
  )}
</div>

); }

