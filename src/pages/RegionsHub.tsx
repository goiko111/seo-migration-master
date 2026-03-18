import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Globe, Search, ArrowRight, Filter, Wine } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import FAQSection from "@/components/seo/FAQSection";
import ScrollReveal from "@/components/ScrollReveal";
import { Input } from "@/components/ui/input";
import { wineCountries, regionEntries } from "@/data/regionsLibrary";

const faqs = [
  { q: "¿Cuántas regiones vinícolas cubre Winerim?", a: "El catálogo de Winerim incluye más de 3.700 denominaciones, regiones e indicaciones geográficas de más de 40 países, con información de más de 95.000 bodegas." },
  { q: "¿Qué diferencia hay entre DO, AOP, AVA y DOC?", a: "Son sistemas de clasificación de distintos países: DO (España), AOP (Francia), AVA (EE.UU.) y DOC (Italia/Portugal). Todos definen zonas geográficas con reglas de producción, pero con diferencias en restricciones y requisitos." },
  { q: "¿Por qué importa conocer las regiones para gestionar una carta?", a: "La región es uno de los principales factores de decisión del comensal. Entender qué comunica cada región permite diseñar cartas más efectivas, con un equilibrio inteligente entre regiones seguras y diferenciales." },
  { q: "¿Cómo usa Winerim esta información?", a: "Winerim integra el conocimiento de regiones directamente en la experiencia de gestión de carta: recomendaciones, benchmarks, pricing inteligente y herramientas de decisión que tienen en cuenta la percepción y el rol comercial de cada denominación." },
];

type SearchResult = {
  type: "country" | "denomination";
  name: string;
  flag?: string;
  extra: string;
  to: string;
};

const RegionsHub = () => {
  const [search, setSearch] = useState("");

  const totalDenominations = wineCountries.reduce((acc, c) => acc + c.denominationsCount, 0);

  // Combined search across countries AND denominations
  const { filteredCountries, searchResults } = useMemo(() => {
    if (!search.trim()) return { filteredCountries: wineCountries, searchResults: [] as SearchResult[] };
    const q = search.toLowerCase();

    const countries = wineCountries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.denominationTypes.toLowerCase().includes(q)
    );

    // Search within denominations/regions
    const denomResults: SearchResult[] = regionEntries
      .filter((r) =>
        r.name.toLowerCase().includes(q) ||
        (r.altNames && r.altNames.some((a) => a.toLowerCase().includes(q))) ||
        r.denominationType.toLowerCase().includes(q)
      )
      .slice(0, 12)
      .map((r) => {
        const country = wineCountries.find((c) => c.slug === r.country);
        return {
          type: "denomination" as const,
          name: r.name,
          flag: country?.flag,
          extra: `${country?.name || r.country} · ${r.denominationType}`,
          to: `/biblioteca-vino/regiones/${r.country}/${r.slug}`,
        };
      });

    return { filteredCountries: countries, searchResults: denomResults };
  }, [search]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Regiones Vinícolas del Mundo | Biblioteca del Vino"
        description="Guía completa de regiones vinícolas, denominaciones de origen y su papel en hostelería. Más de 3.700 denominaciones de más de 40 países con criterio Winerim."
        url="https://winerim.wine/biblioteca-vino/regiones"
      />
      <Navbar />

      {/* HERO */}
      <section className="relative flex items-center overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-wine-dark/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--wine)/0.08),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <Breadcrumbs items={[
            { label: "Biblioteca del Vino", href: "/biblioteca-vino" },
            { label: "Regiones vinícolas" },
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-wine/30 bg-wine/5 mb-6"
          >
            <Globe size={14} className="text-wine" />
            <span className="text-xs font-semibold tracking-widest uppercase text-wine-light">
              {wineCountries.length} países con guía · {totalDenominations.toLocaleString()}+ denominaciones
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6 max-w-4xl"
          >
            Regiones vinícolas del <span className="text-gradient-wine italic">mundo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            Denominaciones, indicaciones geográficas y regiones vinícolas de {wineCountries.length} países.
            Con enfoque Winerim: consulta, interpretación y aplicación comercial para hostelería.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {[
              { label: "Países con guía", value: String(wineCountries.length) },
              { label: "Denominaciones", value: totalDenominations.toLocaleString() },
              { label: "Bodegas en BD", value: wineCountries.reduce((a, c) => a + c.bodegasCount, 0).toLocaleString() },
              { label: "Tipos", value: "DO, AOP, AVA…" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gradient-card rounded-xl border border-border p-4 text-center">
                <p className="font-heading text-2xl font-bold text-wine">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-md"
          >
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar país, denominación o tipo (DO, AVA…)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-gradient-card border-border"
            />

            {/* Denomination search results dropdown */}
            {search.trim() && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 max-h-80 overflow-y-auto">
                <p className="text-xs text-muted-foreground px-4 pt-3 pb-1">Denominaciones y regiones</p>
                {searchResults.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-sm">{r.flag}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{r.name}</p>
                      <p className="text-xs text-muted-foreground">{r.extra}</p>
                    </div>
                    <ArrowRight size={12} className="text-muted-foreground shrink-0" />
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* COUNTRIES GRID */}
      <section className="section-padding pt-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal className="mb-10">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
              Explora por país
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Cada país tiene su propia arquitectura de denominaciones, estilos y regiones. Selecciona uno para explorar su mapa vinícola completo.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCountries.map((country, i) => {
              const countryRegions = regionEntries.filter((r) => r.country === country.slug);
              return (
                <ScrollReveal key={country.slug} delay={i * 0.04}>
                  <Link
                    to={`/biblioteca-vino/regiones/${country.slug}`}
                    className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">
                            {country.name}
                          </h3>
                          <p className="text-xs text-muted-foreground">{country.nameEn}</p>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-wine/10 text-wine px-2 py-1 rounded-md">
                        {country.denominationsCount} denominaciones
                      </span>
                      <span className="text-xs bg-secondary/50 text-muted-foreground px-2 py-1 rounded-md">
                        {country.bodegasCount.toLocaleString()} bodegas
                      </span>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {country.denominationTypes}
                    </p>

                    {countryRegions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-border flex flex-wrap gap-1.5">
                        {countryRegions.slice(0, 3).map((r) => (
                          <span key={r.slug} className="text-xs bg-secondary/30 px-2 py-0.5 rounded-md text-foreground/70">
                            {r.name}
                          </span>
                        ))}
                        {countryRegions.length > 3 && (
                          <span className="text-xs text-muted-foreground">+{countryRegions.length - 3}</span>
                        )}
                      </div>
                    )}
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {filteredCountries.length === 0 && searchResults.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No se encontraron países ni denominaciones que coincidan con "{search}"</p>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED REGIONS */}
      {!search.trim() && (
        <section className="section-padding bg-gradient-dark">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal className="mb-10">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                Regiones destacadas
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Denominaciones icónicas que todo profesional de hostelería debería conocer.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionEntries.filter((r) => r.prestige === "icónico").map((region, i) => {
                const country = wineCountries.find((c) => c.slug === region.country);
                return (
                  <ScrollReveal key={region.slug} delay={i * 0.06}>
                    <Link
                      to={`/biblioteca-vino/regiones/${region.country}/${region.slug}`}
                      className="group block bg-gradient-card rounded-xl border border-border p-6 hover:border-wine/30 transition-all duration-300 hover:-translate-y-1 h-full"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">{country?.flag}</span>
                        <span className="text-xs text-muted-foreground">{country?.name}</span>
                        <span className="text-xs bg-wine/10 text-wine px-2 py-0.5 rounded-md ml-auto">
                          {region.denominationType}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-heading text-lg font-semibold group-hover:text-wine transition-colors">
                          {region.name}
                        </h3>
                        <ArrowRight size={16} className="text-muted-foreground group-hover:text-wine group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                        {region.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {region.cartaRole.slice(0, 3).map((role) => (
                          <span key={role} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-md capitalize">
                            {role}
                          </span>
                        ))}
                        {region.bodegasCount && (
                          <span className="text-xs text-muted-foreground ml-auto">
                            {region.bodegasCount.toLocaleString()} bodegas
                          </span>
                        )}
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FAQSection faqs={faqs} schemaId="regions-hub" />

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-gradient-card rounded-3xl border border-border p-8 sm:p-12 md:p-16 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--wine)/0.08),transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                Lleva este conocimiento a tu{" "}
                <span className="text-gradient-wine italic">carta de vinos</span>
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto text-sm sm:text-base">
                Winerim integra información de regiones, denominaciones y percepción comercial directamente en tu herramienta de gestión de carta.
              </p>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-8 py-4 rounded-lg text-sm font-semibold tracking-wider uppercase hover:opacity-90 transition-all hover:shadow-lg hover:shadow-wine/20"
              >
                Solicitar demo
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegionsHub;
