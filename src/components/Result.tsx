"use client";

import type { Solution } from "@/data/quiz";

interface ResultProps {
  solution: Solution;
  onRestart: () => void;
}

export default function Result({ solution, onRestart }: ResultProps) {

  return (
    <div className="px-6 py-8 md:px-8 md:py-10 max-w-4xl mx-auto">
      {/* Top: badge + heading + stat side by side on wide screens */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:gap-10 mb-6">
        <div className="flex-1 mb-6 lg:mb-0">
          <div className="mb-4">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-[#ff5a00]/10 text-[#ff5a00]">
              Anbefalet løsning
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#304642] leading-tight mb-1">Start med</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[#ff5a00] leading-tight mb-3">{solution.name}</h2>
          <p className="text-base text-[#304642]/60 font-medium mb-5">{solution.tagline}</p>
          <p className="text-base text-[#304642]/80 leading-relaxed">{solution.why}</p>
        </div>

        {/* Right column: stat + bullets */}
        <div className="sm:w-72 flex-shrink-0 flex flex-col gap-4">
          {solution.stat && (
            <div className="bg-[#304642] text-white rounded-2xl px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-1">
                Det ser vi typisk hos vores kunder
              </p>
              <p className="text-base font-semibold leading-snug">{solution.stat}</p>
            </div>
          )}

          <div className="bg-[#304642]/[0.03] border border-[#304642]/10 rounded-2xl px-5 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#304642]/40 mb-3">
              Hvad I får
            </p>
            <ul className="flex flex-col gap-2.5">
              {solution.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-[#ff5a00] flex items-center justify-center">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-sm text-[#304642]">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Consultant note */}
      <div className="flex items-start gap-3 bg-[#ff5a00]/5 border border-[#ff5a00]/15 rounded-2xl px-5 py-4 mb-6">
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

      <div className="text-center mt-5">
        <button
          onClick={onRestart}
          className="text-sm text-[#304642]/40 hover:text-[#304642]/70 transition-colors duration-150"
        >
          Tag testen igen
        </button>
      </div>
    </div>
  );
}
