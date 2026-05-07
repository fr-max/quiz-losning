export type SolutionKey = "lager" | "leverandoer" | "produkt" | "e2e";

export interface Answer {
  label: string;
  scores: Partial<Record<SolutionKey, number>>;
}

export interface Question {
  id: number;
  question: string;
  answers: Answer[];
}

export interface Solution {
  key: SolutionKey;
  name: string;
  tagline: string;
  why: string;
  bullets: string[];
  stat: string | null;
  url: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Hvor oplever I den største udfordring i dag?",
    answers: [
      { label: "I lageret — vi kæmper med kapitalbinding og lagerniveauer", scores: { lager: 3 } },
      { label: "Hos leverandørerne — vi kan ikke stole på deres leveringer", scores: { leverandoer: 3 } },
      { label: "I sortimentet — for mange produkter med for lave marginer", scores: { produkt: 3 } },
      { label: "I kundeporteføljen — vi ved ikke hvem der rent faktisk er profitable", scores: { e2e: 3 } },
    ],
  },
  {
    id: 2,
    question: "Hvad er jeres vigtigste mål de næste 6-12 måneder?",
    answers: [
      { label: "Frigøre kapital bundet i lageret", scores: { lager: 3 } },
      { label: "Øge leveringssikkerheden fra vores leverandører", scores: { leverandoer: 3 } },
      { label: "Løfte den gennemsnitlige margin på vores produkter", scores: { produkt: 3 } },
      { label: "Skabe profitabel vækst med fokus på de rigtige kunder", scores: { e2e: 3 } },
    ],
  },
  {
    id: 3,
    question: "Hvad bruger I mest tid på at håndtere?",
    answers: [
      { label: "Over- eller underfyldte lagre", scores: { lager: 3 } },
      { label: "Forsinkede eller mangelfulde leverancer", scores: { leverandoer: 3 } },
      { label: "Produkter der sælger, men ikke tjener penge", scores: { produkt: 3 } },
      { label: "At forstå hvilke ordrer og kunder der er rentable", scores: { e2e: 3 } },
    ],
  },
  {
    id: 4,
    question: "Hvad mangler I mest indsigt i?",
    answers: [
      { label: "Hvilke produkter der binder mest kapital — og hvad vi burde bestille", scores: { lager: 3 } },
      { label: "Hvilke leverandører der udgør den største risiko for os", scores: { leverandoer: 3 } },
      { label: "Hvilke produkter der trækker bundlinjen ned", scores: { produkt: 3 } },
      { label: "Hvilke kunder der faktisk driver profitten i vores forretning", scores: { e2e: 3 } },
    ],
  },
];

export const solutions: Record<SolutionKey, Solution> = {
  lager: {
    key: "lager",
    name: "Lageroptimering",
    tagline: "Reducer kapitalbinding i lageret",
    why: "Jeres svar peger tydeligt på, at kapitalbinding og lagerubalancer er den største barriere for jer lige nu. Med Lageroptimering får I klare lagerpolitikker, ABC-segmentering og realtidsoverblik over jeres kapitalbinding — så I kan reducere lagerniveauer markant uden at gå på kompromis med serviceniveauet.",
    bullets: [
      "Etablér klare lagerpolitikker (sikkerhedslager, MOQ osv.)",
      "Implementér ABC-segmentering",
      "Identificér dødt og forældet lager",
      "Simulér service- og lagerniveauer",
      "Visualisér kapitalbinding i realtid",
    ],
    stat: "Reducer kapitalbindingen med 15-25 % og øg servicegraden",
    url: "https://inact.io/loesning/lageroptimering/",
  },
  leverandoer: {
    key: "leverandoer",
    name: "Leverandørperformance",
    tagline: "Øg leveringssikkerheden hos leverandører",
    why: "Jeres svar peger tydeligt på, at leveringssikkerhed og leverandørrisiko er det, der bremser jer mest. Med Leverandørperformance får I scorecards, OTIF-overvågning og hårde fakta til forhandlingsbordet — så I kan styrke de strategiske partnerskaber og reducere risikoen i jeres supply chain.",
    bullets: [
      "Overvåg leverandørstabilitet løbende",
      "Opret leverandørscorecards",
      "Prioritér strategiske partnere",
      "Understøt forhandlinger med fakta",
      "Identificér risikoleverandører tidligt",
    ],
    stat: "Reducer forsinkelser med 30 % og øg OTIF",
    url: "https://inact.io/loesning/leverandoerperformance/",
  },
  produkt: {
    key: "produkt",
    name: "Produkt Management",
    tagline: "Løft marginen på produkter",
    why: "Jeres svar peger tydeligt på, at lave marginer og et uoptimeret sortiment er jeres primære udfordring. Med Produkt Management får I overblik over dækningsbidrag per SKU, cost-to-serve og hvilke produkter der trækker bundlinjen ned — så I kan tage datadrevne beslutninger om sortimentet.",
    bullets: [
      "Identificér lav-margin produkter",
      "Forstå dækningsbidrag per SKU",
      "Beregn cost-to-serve",
      "Overvåg pris- og marginudvikling",
      "Udfas tabsgivende produkter",
    ],
    stat: "Reducer lav-margin varer med 20 % og løft profitten",
    url: "https://inact.io/loesning/produkt-management/",
  },
  e2e: {
    key: "e2e",
    name: "End-to-End Intelligence",
    tagline: "Skab profitabel vækst med kundefokus",
    why: "Jeres svar peger tydeligt på, at I mangler overblik over hvad der rent faktisk driver profitabiliteten på tværs af kunder, produkter og leverandører. Med End-to-End Intelligence får I kundesegmentering, rentabilitetsanalyser og what-if beregninger — så I kan skabe profitabel vækst med det rette kundefokus.",
    bullets: [
      "Segmentér kunder efter profitabilitet",
      "Visualisér relationer og afhængigheder",
      "Udfør rentabilitets- og risikoanalyser",
      "Skab balance mellem top- og bundlinje",
      "Beregn what-if på kommercielle valg",
    ],
    stat: null,
    url: "https://inact.io/loesning/end-to-end-intelligence/",
  },
};

export function calculateResult(selectedAnswers: Answer[]): SolutionKey {
  const scores: Record<SolutionKey, number> = {
    lager: 0,
    leverandoer: 0,
    produkt: 0,
    e2e: 0,
  };

  for (const answer of selectedAnswers) {
    for (const [key, val] of Object.entries(answer.scores)) {
      scores[key as SolutionKey] += val;
    }
  }

  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as SolutionKey;
}
