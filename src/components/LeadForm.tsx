"use client";

import { useEffect, useRef } from "react";
import type { Solution } from "@/data/quiz";
import { trackEvent } from "@/lib/gtag";

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: Record<string, unknown>) => void;
      };
    };
  }
}

interface LeadFormProps {
  solution: Solution;
  onBack: () => void;
}

export default function LeadForm({ solution, onBack }: LeadFormProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const created = useRef(false);

  useEffect(() => {
    function mountForm() {
      if (created.current || !containerRef.current) return;
      if (typeof window === "undefined" || !window.hbspt) return;

      created.current = true;
      window.hbspt.forms.create({
        region: "eu1",
        portalId: "145837274",
        formId: "3d392b29-5ce4-433f-abe5-e3f6b545b447",
        target: "#hs-lead-form",
        onFormReady: () => {
          const field = document.querySelector<HTMLInputElement>('input[name="anbefalet_lsning"]');
          if (field) {
            field.value = solution.key;
            field.dispatchEvent(new Event("input", { bubbles: true }));
            field.dispatchEvent(new Event("change", { bubbles: true }));
          }
        },
        onFormSubmitted: () => {
          trackEvent("lead_submitted", { solution: solution.key });
        },
      });
    }

    if (window.hbspt) {
      mountForm();
    } else {
      const script = document.createElement("script");
      script.src = "https://js-eu1.hsforms.net/forms/embed/v2.js";
      script.onload = mountForm;
      document.head.appendChild(script);
    }
  }, [solution.key]);

  return (
    <div className="px-5 py-10 sm:px-10 sm:py-16 w-full">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-medium text-[#304642]/50 hover:text-[#304642] transition-colors duration-150 mb-8"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Tilbage til resultatet
      </button>

      <div className="max-w-xl">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#ff5a00] mb-3">
          Næste skridt
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#304642] leading-tight mb-3">
          Vil du se hvad {solution.name} konkret ville betyde for jer?
        </h2>
        <p className="text-base text-[#304642]/70 mb-8 leading-relaxed">
          Book en gratis 30-minutters gennemgang — vi kigger på jeres situation og viser hvad I realistisk kan opnå.
        </p>

        <div id="hs-lead-form" ref={containerRef} />
      </div>
    </div>
  );
}
