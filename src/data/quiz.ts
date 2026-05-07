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
  url: string;
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Hvad er jeres største udfordring lige nu?",
    answers: [
      {
        label: "Vi har for meget kapital bundet i lageret og ved ikke præcist, hvad vi skal bestille og hvornår",
        scores: { lager: 3 },
      },
      {
        label: "Vores leverandører leverer forsinket og vi kan ikke forudsige det — det giver konstante problemer",
        scores: { leverandoer: 3 },
      },
      {
        label: "Vi sælger meget, men tjener for lidt — marginerne er for lave på for mange produkter",
        scores: { produkt: 3 },
      },
      {
        label: "Vi vokser, men mangler overblik over hvilke kunder og produkter der rent faktisk er profitable",
        scores: { e2e: 3 },
      },
    ],
  },
  {
    id: 2,
    question: "Hvad er jeres vigtigste mål de næste 6-12 måneder?",
    answers: [
      {
        label: "Reducere lagerniveauer og frigøre bundet kapital uden at gå på kompromis med serviceniveauet",
        scores: { lager: 3 },
      },
      {
        label: "Forbedre leveringssikkerheden og styrke samarbejdet med vores leverandører",
        scores: { leverandoer: 3 },
      },
      {
        label: "Optimere sortimentet, udfase tabsgivende produkter og løfte den gennemsnitlige margin",
        scores: { produkt: 3 },
      },
      {
        label: "Skabe mere profitabel vækst med fokus på de rigtige kunder og det rette kundemix",
        scores: { e2e: 3 },
      },
    ],
  },
  {
    id: 3,
    question: "Hvad ville give jer mest værdi i dag?",
    answers: [
      {
        label: "Et klart overblik over sikkerhedslager, ABC-segmentering og kapitalbinding i realtid",
        scores: { lager: 3 },
      },
      {
        label: "Leverandørscorecards og løbende overvågning af OTIF, lead times og kvalitet",
        scores: { leverandoer: 3 },
      },
      {
        label: "Analyse af dækningsbidrag, cost-to-serve og marginudvikling per produkt og SKU",
        scores: { produkt: 3 },
      },
      {
        label: "Kundesegmentering efter profitabilitet og mulighed for at køre what-if analyser",
        scores: { e2e: 3 },
      },
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
    url: "https://inact.io/loesning/end-to-end-intelligence/",
  },
};

export function calculateResult(
  selectedAnswers: Answer[]
): SolutionKey {
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

  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as SolutionKey;
}
