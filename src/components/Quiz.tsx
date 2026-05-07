"use client";

import { useState } from "react";
import { questions, solutions, calculateResult, type Answer, type SolutionKey } from "@/data/quiz";
import Result from "@/components/Result";

export default function Quiz() {
  const [step, setStep] = useState(0); // 0 = intro
  const [selected, setSelected] = useState<Answer[]>([]);
  const [result, setResult] = useState<SolutionKey | null>(null);

  const currentQuestion = questions[step - 1];
  const totalSteps = questions.length;
  const isIntro = step === 0;
  const isDone = result !== null;

  function handleStart() {
    setStep(1);
  }

  function handleAnswer(answer: Answer) {
    const next = [...selected, answer];
    if (step < totalSteps) {
      setSelected(next);
      setStep(step + 1);
    } else {
      setSelected(next);
      setResult(calculateResult(next));
    }
  }

  function handleRestart() {
    setStep(0);
    setSelected([]);
    setResult(null);
  }

  if (isDone && result) {
    return <Result solution={solutions[result]} onRestart={handleRestart} />;
  }

  if (isIntro) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
        <div className="max-w-xl w-full text-center">
          <p className="text-sm font-semibold tracking-widest uppercase text-[#ff5a00] mb-4">
            Løsningsberegner
          </p>
          <h1 className="text-4xl font-bold leading-tight mb-6 text-[#304642]">
            Hvilken løsning passer til jer?
          </h1>
          <p className="text-lg text-[#304642]/70 mb-10 leading-relaxed">
            Besvar tre korte spørgsmål og få et klart svar på, hvilken Inact-løsning I skal starte med — og hvorfor.
          </p>
          <button
            onClick={handleStart}
            className="inline-block bg-[#ff5a00] text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-[#e05000] transition-colors duration-200"
          >
            Find jeres løsning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-[#304642]/50">
              Spørgsmål {step} af {totalSteps}
            </span>
            <span className="text-sm font-medium text-[#304642]/50">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-1.5 bg-[#304642]/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff5a00] rounded-full transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-[#304642] mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        {/* Answers */}
        <div className="flex flex-col gap-3">
          {currentQuestion.answers.map((answer, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(answer)}
              className="group text-left w-full border border-[#304642]/15 rounded-2xl px-6 py-5 hover:border-[#ff5a00] hover:bg-[#ff5a00]/5 transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full border border-[#304642]/20 group-hover:border-[#ff5a00] group-hover:bg-[#ff5a00] transition-all duration-150 flex items-center justify-center text-xs font-semibold text-[#304642]/40 group-hover:text-white">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-base text-[#304642] leading-relaxed">
                  {answer.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
