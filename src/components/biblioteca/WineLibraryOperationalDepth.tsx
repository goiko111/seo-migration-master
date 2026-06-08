import { ArrowRight, ClipboardCheck, Link2, MessageSquare, Target } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

type WineLibraryOperationalKind = "grape" | "region" | "style" | "pairing";

type CopyBlock = {
  eyebrow: string;
  intro: (name: string) => string;
  title: Record<WineLibraryOperationalKind, (name: string) => string>;
  labels: {
    guestRead: string;
    serviceCue: string;
    listRole: string;
    nextStep: string;
  };
  body: Record<
    WineLibraryOperationalKind,
    {
      guestRead: (name: string) => string;
      serviceCue: (name: string) => string;
      listRole: (name: string) => string;
      nextStep: (name: string) => string;
    }
  >;
};

interface WineLibraryOperationalDepthProps {
  entityName: string;
  kind: WineLibraryOperationalKind;
  lang: string;
  tone?: "default" | "dark";
  ctaHref?: string;
  ctaLabel?: string;
}

const copyByLang: Record<string, CopyBlock> = {
  es: {
    eyebrow: "Uso práctico en hostelería",
    intro: (name) => `Referencia rápida para convertir ${name} en compra, recomendación y navegación dentro de la biblioteca.`,
    title: {
      grape: (name) => `Cómo usar ${name} en una carta real`,
      region: (name) => `Cómo posicionar ${name} en una carta real`,
      style: (name) => `Cómo vender ${name} con criterio`,
      pairing: (name) => `Cómo convertir ${name} en una recomendación útil`,
    },
    labels: {
      guestRead: "Lectura de cliente",
      serviceCue: "Argumento de sala",
      listRole: "Papel en carta",
      nextStep: "Siguiente paso",
    },
    body: {
      grape: {
        guestRead: (name) => `${name} debe leerse como variedad reconocible, descubrimiento o argumento de origen. Esa función decide cuánto peso visual merece.`,
        serviceCue: (name) => `Resume ${name} en textura, acidez, origen o plato. Si la explicación tarda más que la decisión, la venta pierde fuerza.`,
        listRole: (name) => `Conecta ${name} con regiones, estilos y maridajes para que no quede como una ficha aislada.`,
        nextStep: (name) => `Compárala con una alternativa segura y otra diferencial antes de incorporarla por copa o botella.`,
      },
      region: {
        guestRead: (name) => `${name} funciona cuando el cliente entiende si compra prestigio, identidad local, valor o descubrimiento.`,
        serviceCue: (name) => `Presenta ${name} con una uva, un estilo y un plato concreto; así la región deja de ser una etiqueta abstracta.`,
        listRole: (name) => `Úsala para ordenar la carta por territorio y abrir caminos hacia uvas, estilos y maridajes relacionados.`,
        nextStep: (name) => `Define una referencia de entrada y una premium para que ${name} tenga recorrido comercial.`,
      },
      style: {
        guestRead: (name) => `${name} se vende mejor cuando comunica momento de consumo: aperitivo, menú largo, copa segura o propuesta premium.`,
        serviceCue: (name) => `Traduce ${name} a temperatura, copa, textura y plato. El servicio necesita una frase concreta, no una categoría genérica.`,
        listRole: (name) => `Conecta ${name} con uvas, regiones y maridajes para que el usuario pueda elegir por ocasión.`,
        nextStep: (name) => `Comprueba si ${name} cubre una necesidad real de la carta o si duplica otro estilo ya presente.`,
      },
      pairing: {
        guestRead: (name) => `${name} debe reducir incertidumbre: el cliente quiere saber qué vino funcionará y por qué.`,
        serviceCue: (name) => `Explica ${name} desde intensidad, grasa, salsa y temperatura. Esa lectura evita recomendaciones automáticas.`,
        listRole: (name) => `Úsalo como puente entre platos, estilos, uvas y regiones para aumentar exploración y ticket medio.`,
        nextStep: (name) => `Define una recomendación segura y una alternativa premium para que ${name} tenga salida real en sala.`,
      },
    },
  },
  en: {
    eyebrow: "Practical hospitality use",
    intro: (name) => `A quick operating read to turn ${name} into buying, recommendation and library navigation.`,
    title: {
      grape: (name) => `How to use ${name} on a real wine list`,
      region: (name) => `How to position ${name} on a real wine list`,
      style: (name) => `How to sell ${name} with intent`,
      pairing: (name) => `How to turn ${name} into a useful recommendation`,
    },
    labels: {
      guestRead: "Guest reading",
      serviceCue: "Floor cue",
      listRole: "List role",
      nextStep: "Next step",
    },
    body: {
      grape: {
        guestRead: (name) => `${name} should read as a familiar variety, a discovery or an origin argument. That role decides its visual weight.`,
        serviceCue: (name) => `Summarize ${name} through texture, acidity, origin or dish. If the explanation takes longer than the decision, the sale weakens.`,
        listRole: (name) => `Connect ${name} with regions, styles and pairings so it does not become an isolated entry.`,
        nextStep: (name) => `Compare it with one safe alternative and one differentiating option before listing it by the glass or bottle.`,
      },
      region: {
        guestRead: (name) => `${name} works when guests understand whether they are buying prestige, local identity, value or discovery.`,
        serviceCue: (name) => `Present ${name} with one grape, one style and one dish; the region stops feeling abstract.`,
        listRole: (name) => `Use it to structure the list by territory and open paths to related grapes, styles and pairings.`,
        nextStep: (name) => `Define an entry reference and a premium reference so ${name} has a commercial path.`,
      },
      style: {
        guestRead: (name) => `${name} sells best when it signals a drinking moment: aperitif, long menu, safe glass or premium proposal.`,
        serviceCue: (name) => `Translate ${name} into temperature, glass, texture and dish. Service needs a concrete phrase, not a generic category.`,
        listRole: (name) => `Connect ${name} with grapes, regions and pairings so users can choose by occasion.`,
        nextStep: (name) => `Check whether ${name} covers a real list need or duplicates another style already present.`,
      },
      pairing: {
        guestRead: (name) => `${name} should reduce uncertainty: guests want to know which wine will work and why.`,
        serviceCue: (name) => `Explain ${name} through intensity, fat, sauce and temperature. That read prevents automatic recommendations.`,
        listRole: (name) => `Use it as a bridge between dishes, styles, grapes and regions to increase exploration and spend.`,
        nextStep: (name) => `Define one safe recommendation and one premium alternative so ${name} can work on the floor.`,
      },
    },
  },
  it: {
    eyebrow: "Uso pratico in ristorazione",
    intro: (name) => `Lettura rapida per trasformare ${name} in acquisto, raccomandazione e navigazione nella biblioteca.`,
    title: {
      grape: (name) => `Come usare ${name} in una carta reale`,
      region: (name) => `Come posizionare ${name} in una carta reale`,
      style: (name) => `Come vendere ${name} con criterio`,
      pairing: (name) => `Come trasformare ${name} in una raccomandazione utile`,
    },
    labels: {
      guestRead: "Lettura del cliente",
      serviceCue: "Argomento di sala",
      listRole: "Ruolo in carta",
      nextStep: "Passo successivo",
    },
    body: {
      grape: {
        guestRead: (name) => `${name} deve leggersi come varieta riconoscibile, scoperta o argomento di origine. Questo ruolo decide il peso visivo.`,
        serviceCue: (name) => `Riassumi ${name} in texture, acidita, origine o piatto. Se la spiegazione dura piu della decisione, la vendita perde forza.`,
        listRole: (name) => `Collega ${name} a regioni, stili e abbinamenti per evitare una scheda isolata.`,
        nextStep: (name) => `Confrontala con un'alternativa sicura e una differenziante prima di inserirla al calice o in bottiglia.`,
      },
      region: {
        guestRead: (name) => `${name} funziona quando il cliente capisce se compra prestigio, identita locale, valore o scoperta.`,
        serviceCue: (name) => `Presenta ${name} con un vitigno, uno stile e un piatto; la regione smette di essere astratta.`,
        listRole: (name) => `Usala per ordinare la carta per territorio e aprire percorsi verso vitigni, stili e abbinamenti.`,
        nextStep: (name) => `Definisci una referenza di ingresso e una premium affinche ${name} abbia percorso commerciale.`,
      },
      style: {
        guestRead: (name) => `${name} si vende meglio quando comunica momento di consumo: aperitivo, menu lungo, calice sicuro o proposta premium.`,
        serviceCue: (name) => `Traduci ${name} in temperatura, calice, texture e piatto. La sala ha bisogno di una frase concreta, non di una categoria generica.`,
        listRole: (name) => `Collega ${name} a vitigni, regioni e abbinamenti per scegliere per occasione.`,
        nextStep: (name) => `Verifica se ${name} copre un bisogno reale della carta o duplica uno stile gia presente.`,
      },
      pairing: {
        guestRead: (name) => `${name} deve ridurre l'incertezza: il cliente vuole sapere quale vino funziona e perche.`,
        serviceCue: (name) => `Spiega ${name} da intensita, grasso, salsa e temperatura. Questa lettura evita raccomandazioni automatiche.`,
        listRole: (name) => `Usalo come ponte tra piatti, stili, vitigni e regioni per aumentare esplorazione e ticket.`,
        nextStep: (name) => `Definisci una raccomandazione sicura e una alternativa premium affinche ${name} funzioni in sala.`,
      },
    },
  },
  fr: {
    eyebrow: "Usage pratique en restauration",
    intro: (name) => `Lecture rapide pour transformer ${name} en achat, recommandation et navigation dans la bibliotheque.`,
    title: {
      grape: (name) => `Comment utiliser ${name} dans une vraie carte`,
      region: (name) => `Comment positionner ${name} dans une vraie carte`,
      style: (name) => `Comment vendre ${name} avec intention`,
      pairing: (name) => `Comment transformer ${name} en recommandation utile`,
    },
    labels: {
      guestRead: "Lecture client",
      serviceCue: "Argument de salle",
      listRole: "Role en carte",
      nextStep: "Etape suivante",
    },
    body: {
      grape: {
        guestRead: (name) => `${name} doit se lire comme cepage reconnu, decouverte ou argument d'origine. Cette fonction decide son poids visuel.`,
        serviceCue: (name) => `Resumez ${name} par texture, acidite, origine ou plat. Si l'explication dure plus que la decision, la vente faiblit.`,
        listRole: (name) => `Reliez ${name} aux regions, styles et accords pour eviter une fiche isolee.`,
        nextStep: (name) => `Comparez-le avec une alternative sure et une option differenciante avant de l'ajouter au verre ou en bouteille.`,
      },
      region: {
        guestRead: (name) => `${name} fonctionne quand le client comprend s'il achete prestige, identite locale, valeur ou decouverte.`,
        serviceCue: (name) => `Presentez ${name} avec un cepage, un style et un plat ; la region cesse d'etre abstraite.`,
        listRole: (name) => `Utilisez-la pour structurer la carte par territoire et ouvrir vers cepages, styles et accords lies.`,
        nextStep: (name) => `Definissez une reference d'entree et une premium pour donner a ${name} une route commerciale.`,
      },
      style: {
        guestRead: (name) => `${name} se vend mieux quand il signale un moment : aperitif, menu long, verre sur ou proposition premium.`,
        serviceCue: (name) => `Traduisez ${name} en temperature, verre, texture et plat. Le service a besoin d'une phrase concrete, pas d'une categorie generique.`,
        listRole: (name) => `Reliez ${name} aux cepages, regions et accords pour choisir par occasion.`,
        nextStep: (name) => `Verifiez si ${name} couvre un vrai besoin de carte ou duplique un style deja present.`,
      },
      pairing: {
        guestRead: (name) => `${name} doit reduire l'incertitude : le client veut savoir quel vin fonctionne et pourquoi.`,
        serviceCue: (name) => `Expliquez ${name} par intensite, gras, sauce et temperature. Cette lecture evite les recommandations automatiques.`,
        listRole: (name) => `Utilisez-le comme pont entre plats, styles, cepages et regions pour augmenter exploration et ticket.`,
        nextStep: (name) => `Definissez une recommandation sure et une alternative premium pour que ${name} fonctionne en salle.`,
      },
    },
  },
  de: {
    eyebrow: "Praktischer Einsatz im Restaurant",
    intro: (name) => `Schnelle operative Lesart, um ${name} in Einkauf, Empfehlung und Bibliotheksnavigation zu ubersetzen.`,
    title: {
      grape: (name) => `Wie ${name} auf einer echten Weinkarte genutzt wird`,
      region: (name) => `Wie ${name} auf einer echten Weinkarte positioniert wird`,
      style: (name) => `Wie ${name} gezielt verkauft wird`,
      pairing: (name) => `Wie ${name} zu einer nutzlichen Empfehlung wird`,
    },
    labels: {
      guestRead: "Gaste-Lesart",
      serviceCue: "Service-Argument",
      listRole: "Rolle auf der Karte",
      nextStep: "Nachster Schritt",
    },
    body: {
      grape: {
        guestRead: (name) => `${name} sollte als bekannte Sorte, Entdeckung oder Herkunftsargument lesbar sein. Diese Rolle bestimmt das visuelle Gewicht.`,
        serviceCue: (name) => `${name} uber Textur, Saure, Herkunft oder Gericht zusammenfassen. Dauert die Erklarung langer als die Entscheidung, verliert der Verkauf Kraft.`,
        listRole: (name) => `${name} mit Regionen, Stilen und Pairings verbinden, damit die Seite keine isolierte Referenz bleibt.`,
        nextStep: (name) => `Mit einer sicheren und einer differenzierenden Alternative vergleichen, bevor ${name} glasweise oder als Flasche gelistet wird.`,
      },
      region: {
        guestRead: (name) => `${name} funktioniert, wenn Gaste verstehen, ob sie Prestige, lokale Identitat, Wert oder Entdeckung kaufen.`,
        serviceCue: (name) => `${name} mit einer Rebsorte, einem Stil und einem Gericht vorstellen; so wirkt die Region nicht abstrakt.`,
        listRole: (name) => `Die Karte nach Herkunft strukturieren und Wege zu passenden Rebsorten, Stilen und Pairings offnen.`,
        nextStep: (name) => `Eine Einstiegsreferenz und eine Premiumreferenz definieren, damit ${name} kommerziell eine klare Route hat.`,
      },
      style: {
        guestRead: (name) => `${name} verkauft sich am besten, wenn ein Moment klar wird: Aperitif, langes Menu, sicheres Glas oder Premiumvorschlag.`,
        serviceCue: (name) => `${name} in Temperatur, Glas, Textur und Gericht ubersetzen. Der Service braucht einen konkreten Satz, keine generische Kategorie.`,
        listRole: (name) => `${name} mit Rebsorten, Regionen und Pairings verbinden, damit Nutzer nach Anlass wahlen konnen.`,
        nextStep: (name) => `Prufen, ob ${name} einen echten Bedarf der Karte deckt oder einen vorhandenen Stil doppelt.`,
      },
      pairing: {
        guestRead: (name) => `${name} sollte Unsicherheit reduzieren: Gaste wollen wissen, welcher Wein passt und warum.`,
        serviceCue: (name) => `${name} uber Intensitat, Fett, Sauce und Temperatur erklaren. Diese Lesart verhindert automatische Empfehlungen.`,
        listRole: (name) => `Als Brucke zwischen Gerichten, Stilen, Rebsorten und Regionen nutzen, um Exploration und Bon zu steigern.`,
        nextStep: (name) => `Eine sichere Empfehlung und eine Premiumalternative definieren, damit ${name} im Service wirklich funktioniert.`,
      },
    },
  },
  pt: {
    eyebrow: "Uso prático em restauração",
    intro: (name) => `Leitura rápida para transformar ${name} em compra, recomendação e navegação dentro da biblioteca.`,
    title: {
      grape: (name) => `Como usar ${name} numa carta real`,
      region: (name) => `Como posicionar ${name} numa carta real`,
      style: (name) => `Como vender ${name} com critério`,
      pairing: (name) => `Como transformar ${name} numa recomendação útil`,
    },
    labels: {
      guestRead: "Leitura do cliente",
      serviceCue: "Argumento de sala",
      listRole: "Papel na carta",
      nextStep: "Próximo passo",
    },
    body: {
      grape: {
        guestRead: (name) => `${name} deve ser lida como casta reconhecível, descoberta ou argumento de origem. Essa função decide o peso visual.`,
        serviceCue: (name) => `Resuma ${name} por textura, acidez, origem ou prato. Se a explicação demora mais do que a decisão, a venda perde força.`,
        listRole: (name) => `Ligue ${name} a regiões, estilos e harmonizações para não ficar como ficha isolada.`,
        nextStep: (name) => `Compare-a com uma alternativa segura e outra diferencial antes de a colocar a copo ou garrafa.`,
      },
      region: {
        guestRead: (name) => `${name} funciona quando o cliente entende se compra prestígio, identidade local, valor ou descoberta.`,
        serviceCue: (name) => `Apresente ${name} com uma casta, um estilo e um prato; assim a região deixa de ser abstrata.`,
        listRole: (name) => `Use-a para ordenar a carta por território e abrir caminhos para castas, estilos e harmonizações.`,
        nextStep: (name) => `Defina uma referência de entrada e uma premium para que ${name} tenha percurso comercial.`,
      },
      style: {
        guestRead: (name) => `${name} vende melhor quando comunica momento de consumo: aperitivo, menu longo, copo seguro ou proposta premium.`,
        serviceCue: (name) => `Traduza ${name} em temperatura, copo, textura e prato. A sala precisa de uma frase concreta, não de uma categoria genérica.`,
        listRole: (name) => `Ligue ${name} a castas, regiões e harmonizações para o utilizador escolher por ocasião.`,
        nextStep: (name) => `Verifique se ${name} cobre uma necessidade real da carta ou duplica outro estilo já presente.`,
      },
      pairing: {
        guestRead: (name) => `${name} deve reduzir incerteza: o cliente quer saber que vinho funciona e porquê.`,
        serviceCue: (name) => `Explique ${name} por intensidade, gordura, molho e temperatura. Essa leitura evita recomendações automáticas.`,
        listRole: (name) => `Use-a como ponte entre pratos, estilos, castas e regiões para aumentar exploração e ticket médio.`,
        nextStep: (name) => `Defina uma recomendação segura e uma alternativa premium para que ${name} tenha saída real em sala.`,
      },
    },
  },
};

const getCopy = (lang: string) => copyByLang[lang] || copyByLang.en;

const WineLibraryOperationalDepth = ({
  entityName,
  kind,
  lang,
  tone = "default",
  ctaHref,
  ctaLabel,
}: WineLibraryOperationalDepthProps) => {
  const copy = getCopy(lang);
  const body = copy.body[kind];
  const blocks = [
    { icon: MessageSquare, label: copy.labels.guestRead, text: body.guestRead(entityName) },
    { icon: Target, label: copy.labels.serviceCue, text: body.serviceCue(entityName) },
    { icon: Link2, label: copy.labels.listRole, text: body.listRole(entityName) },
  ];

  return (
    <section className={`section-padding ${tone === "dark" ? "bg-gradient-dark" : ""}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <ScrollReveal className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ClipboardCheck size={18} className="text-wine" />
            <p className="text-sm tracking-[0.3em] uppercase text-gradient-gold font-semibold">{copy.eyebrow}</p>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{copy.title[kind](entityName)}</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl">{copy.intro(entityName)}</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-4">
          {blocks.map((block, index) => (
            <ScrollReveal key={block.label} delay={index * 0.05}>
              <div className="bg-gradient-card rounded-xl border border-border p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <block.icon size={18} className="text-wine shrink-0" />
                  <h3 className="font-heading text-sm font-semibold">{block.label}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{block.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-wine/5 border border-wine/20 rounded-xl p-5">
            <p className="text-sm text-muted-foreground leading-relaxed">{body.nextStep(entityName)}</p>
            {ctaHref && ctaLabel && (
              <Link
                to={ctaHref}
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-gradient-wine text-primary-foreground px-5 py-3 rounded-lg text-xs font-semibold tracking-wider uppercase hover:opacity-90 transition-all"
              >
                {ctaLabel} <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WineLibraryOperationalDepth;
