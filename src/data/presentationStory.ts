import type { PresentationContent as CurrentPresentationContent } from "@/data/presentationContent";
import type { PresentationContent as LegacyPresentationContent } from "@/data/presentationLegacyContent";
import type { SupportedLang } from "@/i18n/types";

const localizedLabels: Record<SupportedLang, { pain: string; antidote: string }> = {
  es: { pain: "Dolor habitual", antidote: "Antídoto Winerim" },
  en: { pain: "Everyday pain", antidote: "Winerim answer" },
  fr: { pain: "Problème quotidien", antidote: "Réponse Winerim" },
  it: { pain: "Problema quotidiano", antidote: "Risposta Winerim" },
  de: { pain: "Problem im Alltag", antidote: "Winerim-Lösung" },
  pt: { pain: "Problema diário", antidote: "Resposta Winerim" },
};

export function createCurrentCommercialContent(
  language: SupportedLang,
  legacy: LegacyPresentationContent,
  current: CurrentPresentationContent,
): LegacyPresentationContent {
  if (language === "es" || language === "en") return legacy;

  const labels = localizedLabels[language];
  return {
    ...legacy,
    metaTitle: current.metaTitle,
    metaDescription: current.metaDescription,
    shareLabel: current.shareLabel,
    shareCopied: current.shareCopied,
    fullscreenLabel: current.fullscreenLabel,
    ctaTalk: current.ctaTalk,
    scrollDown: current.scrollDown,
    preparedFor: current.preparedFor,
    sPainsEyebrow: current.challenge.eyebrow,
    sPainsTitle: current.challenge.title,
    sPainsSubtitle: current.challenge.subtitle,
    sPainsPainLabel: labels.pain,
    sPainsAntidoteLabel: labels.antidote,
    sPainsItems: [
      ...current.challenge.items.map((item) => ({ pain: item.title, antidote: item.body })),
      { pain: current.cellar.items[2].title, antidote: current.cellar.items[2].body },
    ],
    s5Eyebrow: current.performance.eyebrow,
    s5Title: current.performance.title,
    s5Items: [
      ...current.performance.items,
      ...current.groups.items.slice(0, 3),
    ],
    s6Eyebrow: current.core.eyebrow,
    s6Title: current.core.title,
    s6Items: current.core.items,
    s7Eyebrow: current.flow.eyebrow,
    s7Title: current.flow.title,
    s7Subtitle: current.flow.subtitle,
    s7Pillars: [
      ...current.flow.steps.map((step) => ({ title: step.title, body: step.body })),
      ...current.cellar.items.slice(0, 2),
    ],
    s8Eyebrow: current.core.eyebrow,
    s8TastingTitle: current.core.items[1].title,
    s8TastingBody: current.core.items[1].body,
    s8PairingTitle: current.core.items[0].title,
    s8PairingBody: current.core.items[0].body,
    s9Eyebrow: current.performance.eyebrow,
    s9BigDataTitle: current.performance.title,
    s9BigDataBullets: current.performance.items.slice(0, 3).map((item) => item.body),
    s9CompTitle: current.core.items[2].title,
    s9CompBody: current.core.items[2].body,
    s10Eyebrow: current.cellar.eyebrow,
    s10Title: current.cellar.title,
    s10Body: current.cellar.subtitle,
    s10Items: [
      ...current.cellar.items,
      ...current.performance.items.slice(0, 2),
    ],
    s11Eyebrow: current.groups.eyebrow,
    s11Title: current.groups.title,
    s11Subtitle: current.groups.subtitle,
    s11Items: current.groups.items,
    sMgmtEyebrow: current.intelligence.eyebrow,
    sMgmtTitle: current.intelligence.title,
    sMgmtSubtitle: current.intelligence.subtitle,
    sMgmtItems: [
      current.intelligence.rims,
      current.intelligence.savia,
      ...current.flow.steps.slice(1).map((step) => ({ title: step.title, body: step.body })),
      current.groups.items[3],
    ],
    sMgmtFootnote: current.intelligence.approval,
    sSupplyEyebrow: current.performance.items[2].title,
    sSupplyTitle: current.performance.items[2].title,
    sSupplyBody: current.performance.items[2].body,
    sSupplyItems: current.performance.items,
    sSupplyTag: current.performance.eyebrow,
    s12Eyebrow: current.rollout.eyebrow,
    s12Title: current.rollout.title,
    s12Body: current.rollout.body,
    s12Steps: current.rollout.steps,
    s13Eyebrow: current.proof.eyebrow,
    s13Title: current.proof.title,
    s13Subtitle: current.proof.subtitle,
    s13Quote: current.proof.quote,
    s13QuoteAuthor: current.proof.author,
    s14Eyebrow: current.closing.eyebrow,
    s14Title: current.closing.title,
    s14Highlight1: current.closing.body,
    s14Highlight2: current.platform.proof,
    s14CtaPrimary: current.closing.primaryCta,
    s14CtaSecondary: current.closing.secondaryCta,
    s14Email: current.closing.email,
    s14Phone: current.closing.phone,
  };
}

export function getCommercialSlideLabels(
  legacy: LegacyPresentationContent,
  current: CurrentPresentationContent,
  options: { includesUpdates: boolean; embedded: boolean },
) {
  const { includesUpdates, embedded } = options;
  return [
    legacy.s1Eyebrow,
    legacy.s2Eyebrow,
    legacy.sPainsEyebrow,
    legacy.s3Eyebrow,
    legacy.s4Eyebrow,
    legacy.s5Eyebrow,
    legacy.s6Eyebrow,
    legacy.s7Eyebrow,
    legacy.s8Eyebrow,
    legacy.s9Eyebrow,
    legacy.s10Eyebrow,
    legacy.s11Eyebrow,
    legacy.sMgmtEyebrow,
    ...(includesUpdates
      ? [
          current.flow.eyebrow,
          current.cloudrim.eyebrow,
          current.cellar.eyebrow,
          current.performance.eyebrow,
          current.intelligence.eyebrow,
          "SAVia",
        ]
      : []),
    legacy.sSupplyEyebrow,
    legacy.s12Eyebrow,
    legacy.s13Eyebrow,
    ...(!embedded
      ? [...(!includesUpdates ? [legacy.sPricingEyebrow] : []), legacy.s14Eyebrow]
      : []),
  ];
}
