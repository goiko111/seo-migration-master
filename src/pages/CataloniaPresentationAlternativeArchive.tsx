import { useState } from "react";
import { ArrowDown, ArrowUp, Check, Printer, Wine, Languages, SlidersHorizontal, Cable } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { CATALONIA_PILOT_GATES, CATALONIA_ROUTE, CATALONIA_TIERS, calculateCataloniaQuote } from "@/data/cataloniaProposal";
import heroApp from "@/assets/presentation/hero-app.webp";
import wineCard from "@/assets/presentation/wine-card.webp";
import editorGlass from "@/assets/presentation/editor-glass-settings.png";
import "./CataloniaPresentation.css";

const euros = (value: number) => new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);

// Superseded local alternative. Not routed or imported by the active presentation.
export default function CataloniaPresentationAlternativeArchive() {
  const [restaurants, setRestaurants] = useState("1");
  const [revoPoints, setRevoPoints] = useState("1");
  const quote = restaurants.trim() && revoPoints.trim()
    ? calculateCataloniaQuote(Number(restaurants), Number(revoPoints)) : null;

  return <div className="catalonia-deck" lang="es">
    <SEOHead title="Catalonia Group · Propuesta Winerim" description="Propuesta de piloto para Beloved Gran Via con REVO. Documento comercial para revisión." url={`https://winerim.wine${CATALONIA_ROUTE}`} noindex />
    <a className="cat-skip" href="#propuesta">Ir a la propuesta</a>
    <header className="cat-header">
      <a className="cat-brand" href="#inicio" aria-label="Winerim, inicio de la propuesta">winerim<span>®</span></a>
      <span className="cat-header-context">Catalonia Group <span>/ Propuesta de piloto</span></span>
      <button type="button" title="Imprimir propuesta" aria-label="Imprimir propuesta" onClick={() => window.print()}><Printer size={19} /></button>
    </header>
    <main>
      <section className="cat-hero" id="inicio" aria-labelledby="cat-title">
        <img src={heroApp} width="1500" height="1500" alt="Carta digital Winerim: búsqueda, vinos por copa y filtros en la carta de demostración winerimrestaurant" fetchPriority="high" />
        <div className="cat-hero-heading">
          <p className="cat-eyebrow">Winerim para</p>
          <h1 id="cat-title">Catalonia Group</h1>
          <p>La experiencia del vino, desde la mesa hasta la bodega.</p>
          <a className="cat-link" href="#propuesta">Empezamos en Beloved Gran Via <ArrowDown size={18} /></a>
        </div>
        <div className="cat-hero-footer"><span>Carta · Sala · Bodega</span><span>Propuesta de piloto con REVO</span></div>
      </section>

      <section className="cat-band" id="propuesta">
        <div className="cat-inner">
          <p className="cat-eyebrow">01 / Un primer restaurante</p>
          <h2>Beloved Gran Via.<br />Un comienzo concreto.</h2>
          <p className="cat-lead">Una carta que ayude al huésped a elegir, un equipo con información a mano y una conexión con REVO que se compruebe antes de extenderla al grupo.</p>
          <div className="cat-three">
            <article><Wine /><h3>Para el huésped</h3><p>Explorar la carta, comparar vinos y consultar su perfil sin perder el acompañamiento del equipo de sala.</p></article>
            <article><SlidersHorizontal /><h3>Para sala y bodega</h3><p>Revisar referencias, formatos y precios desde el editor; contrastar disponibilidad con el inventario registrado.</p></article>
            <article><Cable /><h3>Para dirección</h3><p>Acordar qué datos medir y validar el circuito con REVO antes de decidir el siguiente restaurante.</p></article>
          </div>
        </div>
      </section>

      <section className="cat-band cat-product">
        <div className="cat-inner">
          <p className="cat-eyebrow">02 / La carta en la mesa</p>
          <h2>El vino se entiende.<br />La elección se acompaña.</h2>
          <p className="cat-lead">Ficha del vino, perfil sensorial, búsqueda y comparador. Información para conversar con el huésped, no para sustituir el criterio del sumiller.</p>
          <figure><img src={wineCard} width="1500" height="1500" loading="lazy" alt="Ficha de vino Winerim con perfil sensorial y comparador" /><figcaption>Interfaz real del producto, procedente de la presentación pública de Winerim. No representa la carta de Catalonia.</figcaption></figure>
          <div className="cat-inline-note"><Languages size={24} /><p><strong>Atención a una clientela internacional.</strong> El piloto incluye revisar los idiomas acordados sobre la carta real: fichas, nombres, precios y recorrido completo. No damos por validada una traducción por mostrar un selector.</p></div>
        </div>
      </section>

      <section className="cat-band">
        <div className="cat-inner">
          <p className="cat-eyebrow">03 / El trabajo detrás de la carta</p>
          <h2>Botella y copa.<br />Cada formato cuenta.</h2>
          <p className="cat-lead">El editor permite configurar formatos y copas por botella. En Beloved revisaremos esas equivalencias y sus precios antes de conectarlas al TPV.</p>
          <figure className="cat-editor"><a href={editorGlass} target="_blank" rel="noreferrer" aria-label="Abrir captura completa de ajustes de copas"><img src={editorGlass} width="1500" height="3109" loading="lazy" alt="Editor Winerim, ajustes de copas: tipo de vino, variante, capacidad y copas por botella" /></a><figcaption>Captura del centro de ayuda, verificada el 15/06/2026. Los valores mostrados son una configuración de ejemplo, no una recomendación de servicio.</figcaption></figure>
        </div>
      </section>

      <section className="cat-band cat-green">
        <div className="cat-inner">
          <p className="cat-eyebrow">04 / Bodega con contexto</p>
          <h2>Antes de decidir,<br />datos que encajen.</h2>
          <div className="cat-three">
            <article><span className="cat-number">01</span><h3>Identidad</h3><p>El mismo vino, añada y formato en carta y TPV. Resolver discrepancias antes de sumar datos.</p></article>
            <article><span className="cat-number">02</span><h3>Existencias</h3><p>Contrastar entradas y salidas con el inventario. Una integración no sustituye el conteo físico ni su conciliación.</p></article>
            <article><span className="cat-number">03</span><h3>Decisiones</h3><p>Analizar ventas, coste y rotación solo cuando el periodo, la cobertura y la calidad de los datos estén confirmados.</p></article>
          </div>
          <p className="cat-footnote">No se garantiza un aumento de ventas o ahorro. El piloto servirá para establecer una base medible.</p>
        </div>
      </section>

      <section className="cat-band" id="piloto">
        <div className="cat-inner">
          <p className="cat-eyebrow">05 / Beloved Gran Via + REVO</p>
          <h2>Primero lo probamos.<br />Después lo ampliamos.</h2>
          <p className="cat-lead">La integración forma parte del piloto propuesto. No se presenta como una conexión ya activa o certificada para Beloved.</p>
          <ol className="cat-timeline">{CATALONIA_PILOT_GATES.map((gate, index) => <li key={gate.title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{gate.title}</h3><p>{gate.body}</p></div></li>)}</ol>
        </div>
      </section>

      <section className="cat-band cat-light">
        <div className="cat-inner">
          <p className="cat-eyebrow">06 / Qué se demuestra y qué se valida</p>
          <h2>Un alcance claro<br />desde el primer día.</h2>
          <dl className="cat-scope">
            <div><dt>Producto documentado</dt><dd>Carta, fichas y comparador; editor de referencias y ajustes de formatos. Evidencia visual en la guía operativa de Winerim.</dd></div>
            <div><dt>Validación del piloto</dt><dd>Idiomas de la carta de Beloved, correspondencia de formatos con REVO, ventas y efecto único sobre stock.</dd></div>
            <div><dt>Ampliación a grupo</dt><dd>Roles, permisos, comparación entre restaurantes y posibles flujos de bodega central: alcance por acordar y validar, no funciones garantizadas por esta oferta.</dd></div>
            <div><dt>Módulos avanzados</dt><dd>CloudRIM, SAVia, RIMs y Supply requieren confirmar disponibilidad y alcance para esta operativa. No se incluyen por inferencia como capacidades productivas certificadas del piloto.</dd></div>
          </dl>
        </div>
      </section>

      <section className="cat-band" id="condiciones">
        <div className="cat-inner">
          <p className="cat-eyebrow">07 / Condiciones para Catalonia Group</p>
          <h2>Un precio de grupo.<br />Sin costes ocultos.</h2>
          <p className="cat-lead">La tarifa del tramo alcanzado se aplica a todos los restaurantes, no por bloques progresivos. Todos los importes son mensuales y más IVA.</p>
          <div className="cat-pricing-grid">
            <div><table><caption>Winerim por restaurante y mes, sin IVA</caption><thead><tr><th scope="col">Restaurantes</th><th scope="col">€/restaurante</th></tr></thead><tbody>{CATALONIA_TIERS.map(tier => <tr key={tier.minimum}><th scope="row">{tier.label}</th><td>{euros(tier.rate)}</td></tr>)}</tbody></table><p className="cat-revo">REVO: <strong>75 €/mes</strong> por cada punto de venta integrado, más IVA.</p></div>
            <div className="cat-calculator" aria-labelledby="cat-calc-title">
              <h3 id="cat-calc-title">Tu escenario de grupo</h3>
              <div className="cat-inputs"><label>Restaurantes<input type="number" min="1" step="1" value={restaurants} onChange={event => setRestaurants(event.target.value)} aria-describedby="cat-quote" /></label><label>Puntos de venta REVO<input type="number" min="0" step="1" value={revoPoints} onChange={event => setRevoPoints(event.target.value)} aria-describedby="cat-quote" /></label></div>
              <div id="cat-quote" aria-live="polite" aria-atomic="true" className="cat-quote">{quote ? <><p>Winerim <span>{quote.restaurants} × {euros(quote.rate)} = {euros(quote.winerim)}</span></p><p>REVO <span>{quote.revoPoints} × 75 € = {euros(quote.revo)}</span></p><p className="cat-total"><span>{euros(quote.total)}</span><small>/mes + IVA</small></p></> : <p className="cat-error">Introduce un número entero de restaurantes (mínimo 1) y de puntos REVO (mínimo 0), dentro del rango calculable.</p>}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cat-band cat-closing">
        <div className="cat-inner">
          <p className="cat-eyebrow">08 / El punto de partida</p>
          <h2>Beloved Gran Via</h2>
          <p className="cat-pilot-price">175 €<span>/mes + IVA</span></p>
          <p>100 € Winerim + 75 € por un punto de venta REVO.</p>
          <ul className="cat-checks"><li><Check size={18} /> Un restaurante para validar la operativa.</li><li><Check size={18} /> Un alcance revisado con sala y dirección.</li><li><Check size={18} /> Una decisión de ampliación basada en evidencias.</li></ul>
          <p className="cat-footnote">Duración y permanencia del piloto pendientes de acordar. Sin costes ocultos.</p>
          <a className="cat-link" href="#piloto">Revisar los pasos del piloto <ArrowUp size={18} /></a>
        </div>
      </section>
    </main>
    <footer className="cat-footer"><strong>winerim</strong><span>Propuesta para Catalonia Group · 11 septiembre 2026</span><a href="#inicio">Volver al inicio <ArrowUp size={16} /></a></footer>
  </div>;
}
