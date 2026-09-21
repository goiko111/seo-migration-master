import PresentationLegacy from "./PresentationLegacy";
import { CATALONIA_ROUTE, CATALONIA_TIERS } from "@/data/cataloniaProposal";
import "./CataloniaPricing.css";

export default function CataloniaPresentation() {
  return <PresentationLegacy variant="current" canonicalPath={CATALONIA_ROUTE} noindex suppressTracking
    appendix={{ label: "Catalonia Group · Condiciones", content: <div className="catalonia-pricing">
      <p className="text-xs uppercase font-semibold text-wine-light">Propuesta para Catalonia Group</p>
      <h2 className="font-heading text-4xl md:text-5xl font-bold mt-4 mb-5">Condiciones para Catalonia Group</h2>
      <p className="catalonia-pricing-intro">La tarifa del tramo alcanzado se aplica a todos los restaurantes, no por bloques progresivos.</p>
      <div className="catalonia-pricing-columns">
        <table>
          <caption>Winerim por restaurante y mes, más IVA</caption>
          <thead><tr><th scope="col">Restaurantes</th><th scope="col">€/restaurante/mes</th></tr></thead>
          <tbody>{CATALONIA_TIERS.map(tier => <tr key={tier.minimum}><th scope="row">{tier.label}</th><td>{tier.rate} €</td></tr>)}</tbody>
        </table>
        <div className="catalonia-pricing-pilot">
          <p className="text-xs uppercase font-semibold">Piloto · Beloved Gran Via</p>
          <h3 className="font-heading text-3xl mt-3">Winerim + REVO</h3>
          <p className="catalonia-pricing-total">175 €<span>/mes + IVA</span></p>
          <p>100 € Winerim + 75 € por un punto de venta REVO.</p>
          <p className="mt-4 font-semibold">Sin costes ocultos.</p>
        </div>
      </div>
      <p className="catalonia-pricing-revo"><strong>REVO: 75 €/mes más IVA</strong> por cada punto de venta integrado.</p>
      <p className="catalonia-pricing-note">El piloto está propuesto, no se presenta como una integración ya activa en Beloved Gran Via. Duración y permanencia pendientes de acordar.</p>
    </div> }} />;
}
