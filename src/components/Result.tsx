"use client";

import type { Solution } from "@/data/quiz";

const solutionColors: Record<string, string> = {
  lager: "bg-blue-50 text-blue-700",
  leverandoer: "bg-emerald-50 text-emerald-700",
  produkt: "bg-amber-50 text-amber-700",
  e2e: "bg-violet-50 text-violet-700",
};

interface ResultProps {
  solution: Solution;
  onRestart: () => void;
}

export default function Result({ solution, onRestart }: ResultProps) {
  const badgeClass = solutionColors[solution.key] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16">
      <div className="max-w-2xl w-full">
        {/* Badge */}
        <div className="mb-6">
          <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${badgeClass}`}>
            Anbefalet løsning
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#304642] leading-tight mb-2">
          Start med
        </h1>
        <h2 className="text-4xl font-bold text-[#ff5a00] leading-tight mb-3">
          {solution.name}
        </h2>
        <p className="text-base text-[#304642]/60 font-medium mb-8">
          {solution.tagline}
        </p>

        {/* Stat */}
        {solution.stat && (
          <div className="bg-[#304642] text-white rounded-2xl px-6 py-5 mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">
              Det ser vi typisk hos vores kunder
            </p>
            <p className="text-lg font-semibold leading-snug">
              {solution.stat}
            </p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-[#304642]/10 mb-8" />

        {/* Why */}
        <p className="text-lg text-[#304642]/80 leading-relaxed mb-10">
          {solution.why}
        </p>

        {/* Bullets */}
        <div className="bg-[#304642]/[0.03] border border-[#304642]/10 rounded-2xl px-6 py-6 mb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#304642]/40 mb-4">
            Hvad I får
          </p>
          <ul className="flex flex-col gap-3">
            {solution.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#ff5a00] flex items-center justify-center">
                  <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                    <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-base text-[#304642]">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consultant note */}
        <div className="flex items-start gap-3 bg-[#ff5a00]/5 border border-[#ff5a00]/15 rounded-2xl px-6 py-5 mb-10">
          <svg className="mt-0.5 flex-shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="9" fill="#ff5a00" fillOpacity="0.15" />
            <path d="M6 9.5l2 2 4-4" stroke="#ff5a00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-sm text-[#304642]/70 leading-relaxed">
            <span className="font-semibold text-[#304642]">Vores konsulentteam sikrer implementeringen.</span>{" "}
            Vi sætter løsningen op efter jeres behov, giver løbende sparring og tager medansvar for at I når jeres mål.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={solution.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-[#ff5a00] text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-[#e05000] transition-colors duration-200"
          >
            Lær mere om {solution.name}
          </a>
          <a
            href="https://inact.io/vaerdianalyse/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center border border-[#304642]/20 text-[#304642] font-semibold text-base px-8 py-4 rounded-full hover:bg-[#304642]/5 transition-colors duration-200"
          >
            Prøv vores værdianalyse
          </a>
        </div>

        {/* Restart */}
        <div className="text-center mt-6">
          <button
            onClick={onRestart}
            className="text-sm text-[#304642]/40 hover:text-[#304642]/70 transition-colors duration-150"
          >
            Tag testen igen
          </button>
        </div>
      </div>
    </div>
  );
}
