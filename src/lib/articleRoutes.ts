import { type SupportedLang } from "@/i18n/types";

const ARTICLE_LANG_SUFFIX = /_(en|it|fr|de|pt)$/;

export const stripArticleLangSuffix = (slug: string) =>
  slug.replace(ARTICLE_LANG_SUFFIX, "");

export const inferArticleLangFromSlug = (slug: string): SupportedLang | null => {
  const match = slug.match(ARTICLE_LANG_SUFFIX);
  return match ? (match[1] as SupportedLang) : null;
};

export const articleDbSlugForLang = (baseSlug: string, lang: SupportedLang) =>
  lang === "es" ? stripArticleLangSuffix(baseSlug) : `${stripArticleLangSuffix(baseSlug)}_${lang}`;

export const localizedArticlePath = (slug: string, lang: SupportedLang) => {
  const baseSlug = stripArticleLangSuffix(slug);
  return lang === "es" ? `/article/${baseSlug}` : `/${lang}/article/${baseSlug}`;
};
