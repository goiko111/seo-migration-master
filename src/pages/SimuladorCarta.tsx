import { useEffect, useRef, useState } from "react";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimulatorHero from "@/components/simulator/SimulatorHero";
import SimulatorForm, { type FormData } from "@/components/simulator/SimulatorForm";
import SimulationProgress from "@/components/simulator/SimulationProgress";
import TeaserReport from "@/components/simulator/TeaserReport";
import UnlockForm from "@/components/simulator/UnlockForm";
import {
  generateSimulationId, submitSimulation, pollStatus,
  SIMULATION_DEADLINE_MS, type Teaser,
} from "@/lib/simulatorApi";

type Phase = "landing" | "simulating" | "teaser" | "contact";

export default function SimuladorCarta() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [simId, setSimId] = useState<string>("");
  const [teaser, setTeaser] = useState<Teaser | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<number | null>(null);
  const deadlineRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (pollRef.current) window.clearInterval(pollRef.current);
    if (deadlineRef.current) window.clearTimeout(deadlineRef.current);
  }, []);

  const startSubmission = async (data: FormData) => {
    const id = generateSimulationId();
    setSimId(id);
    setTeaser(null);
    setIsComplete(false);
    setPhase("simulating");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Fire-and-forget POST; capture teaser when it returns
    submitSimulation({ simulationId: id, ...data, lang: "es" }).then((res) => {
      if (res?.teaser) setTeaser(res.teaser);
    });

    // Polling every 3s
    pollRef.current = window.setInterval(async () => {
      const status = await pollStatus(id);
      if (!status) return;
      if (status.teaser) setTeaser(status.teaser);
      if (status.status === "complete") {
        setIsComplete(true);
        if (pollRef.current) window.clearInterval(pollRef.current);
        if (deadlineRef.current) window.clearTimeout(deadlineRef.current);
        // Reveal teaser as soon as backend is done, ahead of skeleton timeline
        setPhase((p) => (p === "simulating" ? "teaser" : p));
      }
    }, 3000);

    // Skeleton minimum (~15s) then reveal teaser even if backend pending
    window.setTimeout(() => {
      setPhase((p) => (p === "simulating" ? "teaser" : p));
    }, 15000);

    // Deadline: at 40s, if not complete switch to contact form (polling continues)
    deadlineRef.current = window.setTimeout(() => {
      setPhase((p) => (p !== "teaser" && p !== "contact" ? "contact" : p));
      setIsComplete((done) => done);
      // If teaser still missing, show contact-only screen
    }, SIMULATION_DEADLINE_MS);
  };

  return (
    <>
      <SEOHead
        title="Simulador de Carta de Vinos · Winerim"
        description="Diseña la carta de vinos perfecta para tu restaurante en 3 minutos. Gratis. Basado en datos de 149+ restaurantes reales."
        url="/simulador-carta"
      />
      <Navbar />
      <main className="min-h-screen bg-background">
        {phase === "landing" && (
          <>
            <SimulatorHero onStart={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} />
            <section ref={formRef} className="py-12 px-4">
              <SimulatorForm onSubmit={startSubmission} />
            </section>
          </>
        )}

        {phase === "simulating" && (
          <section className="py-16 px-4">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-semibold">Simulando tu carta...</h2>
              <p className="text-muted-foreground mt-2">Esto tarda entre 15 y 30 segundos.</p>
            </div>
            <SimulationProgress teaser={teaser} />
          </section>
        )}

        {phase === "teaser" && teaser && (
          <section className="py-12 px-4">
            <TeaserReport teaser={teaser} simulationId={simId} isComplete={isComplete} />
          </section>
        )}

        {phase === "teaser" && !teaser && (
          <section className="py-16 px-4">
            <SimulationProgress teaser={null} />
          </section>
        )}

        {phase === "contact" && (
          <section className="py-16 px-4">
            {teaser ? (
              <TeaserReport teaser={teaser} simulationId={simId} isComplete={false} />
            ) : (
              <div className="max-w-md mx-auto text-center space-y-4">
                <h2 className="text-2xl font-semibold">Casi listo</h2>
                <p className="text-muted-foreground">
                  Tu simulación se está terminando de procesar. Déjanos tus datos y te enviaremos el informe por email en menos de 48 horas.
                </p>
                <UnlockForm simulationId={simId} showContactCopy />
              </div>
            )}
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}