"use client";

import { useState } from "react";
import { questions, solutions, calculateResult, type Answer, type SolutionKey } from "@/data/quiz";
import Result from "@/components/Result";
import { trackEvent } from "@/lib/gtag";

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Answer[]>([]);
  const [result, setResult] = useState<SolutionKey | null>(null);

  const totalSteps = questions.length;
  const currentQuestion = questions[step - 1];
  const isIntro = step === 0;
  const isDone = result !== null;

  function handleStart() {
    trackEvent("quiz_started");
    setStep(1);
  }

  function handleBack() {
    if (step > 1) {
      setSelected(selected.slice(0, -1));
      setStep(step - 1);
    } else {
      setStep(0);
    }
  }

  function handleAnswer(answer: Answer) {
    const next = [...selected, answer];
    if (step < totalSteps) {
      setSelected(next);
      setStep(step + 1);
    } else {
      setSelected(next);
      const solution = calculateResult(next);
      trackEvent("quiz_completed", { solution });
      setResult(solution);
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
      <div className="flex flex-col items-center justify-center px-5 py-10 sm:px-10 sm:py-20 w-full box-border">
        <div className="w-full max-w-3xl text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#ff5a00] mb-4">
            Løsningsberegner
          </p>
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-[#304642] break-words">
            Hvilken løsning passer til jer?
          </h1>
          <p className="text-base sm:text-lg text-[#304642]/70 mb-8 leading-relaxed max-w-xl mx-auto">
            Besvar fire korte spørgsmål og få et klart svar på, hvilken Inact-løsning I skal starte med — og hvorfor.
          </p>
          <button
            onClick={handleStart}
            className="inline-block bg-[#ff5a00] text-white font-semibold text-base sm:text-lg px-8 py-4 rounded-full hover:bg-[#e05000] transition-colors duration-200"
          >
            Find jeres løsning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-8 sm:py-10 w-full">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#304642]/50 hover:text-[#304642] transition-colors duration-150"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Tilbage
          </button>
          <span className="text-xs sm:text-sm font-medium text-[#304642]/50">
            {step} / {totalSteps}
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
      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#304642] mb-5 leading-snug">
        {currentQuestion.question}
      </h2>

      {/* Answers */}
      <div className="flex flex-col gap-2.5">
        {currentQuestion.answers.map((answer, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(answer)}
            className="group text-left w-full border border-[#304642]/15 rounded-2xl px-4 sm:px-5 py-3.5 sm:py-4 hover:border-[#ff5a00] hover:bg-[#ff5a00]/5 transition-all duration-150 cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-[#304642]/20 group-hover:border-[#ff5a00] group-hover:bg-[#ff5a00] transition-all duration-150 flex items-center justify-center text-xs font-semibold text-[#304642]/40 group-hover:text-white">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-base sm:text-lg text-[#304642] leading-relaxed">
                {answer.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
