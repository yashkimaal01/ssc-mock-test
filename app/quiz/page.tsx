// app/quiz/page.tsx "use client";

import { useSearchParams, useRouter } from "next/navigation"; import { useEffect, useState } from "react";

const questions = [ { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: "Delhi", }, { question: "Who wrote the Ramayana?", options: ["Tulsidas", "Valmiki", "Kalidas", "Vyas"], answer: "Valmiki", }, { question: "What is the full form of SSC?", options: [ "Staff Selection Commission", "State Service Commission", "School Service Council", "State Selection Council", ], answer: "Staff Selection Commission", }, ];

export default function QuizPage() { const searchParams = useSearchParams(); const router = useRouter(); const name = searchParams.get("name") || "User";

const [current, setCurrent] = useState(0); const [answers, setAnswers] = useState<string[]>([]); const [timeLeft, setTimeLeft] = useState(60); const [submitted, setSubmitted] = useState(false);

useEffect(() => { const timer = setInterval(() => { setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); }, 1000); return () => clearInterval(timer); }, []);

const handleOptionSelect = (option: string) => { const newAnswers = [...answers]; newAnswers[current] = option; setAnswers(newAnswers); };

const handleNext = () => { if (current < questions.length - 1) { setCurrent(current + 1); } };

const handlePrev = () => { if (current > 0) { setCurrent(current - 1); } };

const handleSubmit = () => { if (timeLeft > 0) { alert("You can only submit after 1 minute!"); return; } setSubmitted(true); };

const correct = questions.filter( (q, i) => answers[i] && answers[i] === q.answer ).length; const wrong = answers.filter((a, i) => a && a !== questions[i].answer).length; const unattempted = questions.length - answers.filter((a) => a).length;

if (submitted) { return ( <div className="p-4 text-center"> <h2 className="text-2xl font-bold mb-4">Results for {name}</h2> <p className="mb-2">Correct: {correct}</p> <p className="mb-2">Wrong: {wrong}</p> <p className="mb-2">Unattempted: {unattempted}</p> <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push("/")} > Back to Home </button> </div> ); }

const q = questions[current]; const selected = answers[current];

return ( <div className="max-w-xl mx-auto p-4"> <h2 className="text-xl font-semibold mb-2">Time left: {timeLeft}s</h2> <h3 className="text-lg font-bold mb-2"> Q{current + 1}: {q.question} </h3> <div className="space-y-2 mb-4"> {q.options.map((option) => ( <button key={option} onClick={() => handleOptionSelect(option)} className={block w-full text-left px-4 py-2 rounded border ${ selected === option ? "bg-blue-200 border-blue-600" : "bg-white" }} > {option} </button> ))} </div> <div className="flex justify-between"> <button onClick={handlePrev} disabled={current === 0} className="bg-gray-300 px-3 py-1 rounded" > Previous </button> <button onClick={handleNext} disabled={current === questions.length - 1} className="bg-gray-300 px-3 py-1 rounded" > Next </button> </div> <div className="text-center mt-6"> <button
onClick={handleSubmit}
className="bg-green-600 text-white px-4 py-2 rounded"
> Submit Test </button> </div> </div> ); }

