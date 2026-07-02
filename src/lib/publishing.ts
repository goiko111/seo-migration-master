export const visiblePublishedAtFilter = () => {
  const nowIso = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  return `published_at.is.null,published_at.lte.${nowIso}`;
};
