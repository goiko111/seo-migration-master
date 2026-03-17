import { DollarSign } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const margenesPricingFR: DeepAreaContent = {
  name: "Marges et pricing",
  tagline: "Comprenez la rentabilité réelle de chaque vin et agissez avec méthode",
  intro: "Cette section vous aide à interpréter tous les indicateurs de marge, pricing et rentabilité que Winerim vous montre. Vous n'avez pas besoin d'être financier : vous devez savoir quoi regarder, pourquoi c'est important et quoi faire de chaque donnée.",
  icon: DollarSign,
  accent: "text-amber-500",
  bg: "bg-amber-500/10",
  audiences: ["direccion", "compras-fb"],
  topErrors: [
    { error: "Augmenter le prix sans d'abord vérifier le coût d'achat", porQueOcurre: "Parce qu'il est plus facile de toucher le prix de vente que de négocier avec le fournisseur. On suppose que la marge faible est un problème de prix, alors que souvent l'origine est dans l'achat.", consecuencia: "Vous augmentez le prix pour le client (qui le remarque) alors que vous auriez pu améliorer la marge de manière invisible en renégociant le coût d'achat." },
    { error: "Appliquer un multiplicateur unique à toute la carte", porQueOcurre: "Parce que ça simplifie la gestion et semble 'juste'. Un ×3 sur tout semble raisonnable.", consecuencia: "Vous perdez de la marge sur les vins bon marché (où le client est le plus sensible au prix) et n'êtes pas compétitif sur les vins chers (où le multiplicateur devrait être inférieur)." },
    { error: "Ne pas réviser les marges chaque mois", porQueOcurre: "Parce que le quotidien absorbe tout le temps et les marges semblent stables. Mais les coûts augmentent, la casse varie et la demande change.", consecuencia: "Les écarts s'accumulent silencieusement. Vous ne les voyez que lorsque le trimestre se clôture et que les chiffres ne correspondent pas." },
    { error: "Fixer le prix au verre en divisant la bouteille par 5", porQueOcurre: "Parce que c'est le calcul mental le plus rapide. Mais il ignore la casse, le coût de service et la marge supplémentaire que le verre devrait générer.", consecuencia: "Vous vendez des verres à perte sans le savoir. Une casse réelle de 25 % transforme votre marge théorique de 70 % en 35 % réels." },
    { error: "Garder un vin avec bonne marge mais sans ventes", porQueOcurre: "Parce que le chiffre de marge semble positif et rassure. Mais un vin qui ne se vend pas ne génère aucune marge réelle.", consecuencia: "Capital immobilisé qui occupe de la place en cave et sur la carte sans générer de retour. La marge potentielle ne se matérialise jamais." },
  ],
  links: [
    { label: "Calculateur de marges", href: "/calculadora-margen-vino", description: "Calculez la marge réelle de n'importe quelle référence en quelques secondes", type: "tool" },
    { label: "Template : Révision mensuelle des marges", href: "/recursos/plantilla-revision-mensual-margenes", description: "Processus mensuel pour détecter les écarts et les opportunités", type: "resource" },
    { label: "Ressource : Analyse des marges", href: "/recursos/scorecard-mensual", description: "Scorecard pour surveiller la santé de votre pricing", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Le moteur analytique qui automatise tout cela pour vous", type: "product" },
    { label: "Blog : 7 erreurs de pricing", href: "/article/errores-fijar-precios-vino-restaurante", description: "Les erreurs de pricing les plus fréquentes et comment les éviter", type: "article" },
    { label: "Blog : Leviers pour améliorer la marge", href: "/article/palancas-mejorar-margen-vino-sin-rehacer-carta", description: "Comment améliorer la marge sans refaire votre carte des vins", type: "article" },
    { label: "Blog : Métriques F&B vin", href: "/article/metricas-fb-vino-restaurante", description: "Les métriques que tout responsable F&B devrait suivre" },
  ],
  miniCases: [
    {
      profile: "Gastronomique avec une carte de 60 références",
      situation: "Marge moyenne de 58 %, mais les 5 références les plus vendues avaient un multiplicateur de ×2,2 car elles n'avaient jamais été mises à jour après la dernière hausse du fournisseur.",
      action: "A recalculé les prix des 5 références phares. Augmentation entre 1 € et 3 € selon la gamme. A fourni à l'équipe de salle des arguments de valeur pour justifier le changement.",
      result: "La marge moyenne est passée à 63 % sans perdre une seule vente sur ces références. Impact estimé : +1 800 €/mois.",
    },
    {
      profile: "Casual dining avec 35 références",
      situation: "Appliquait un ×3 uniforme à toute la carte. Les vins d'entrée (coût <5 €) finissaient à 15 € et ne se vendaient pas ; ceux >15 € de coût finissaient à 45 € et non plus.",
      action: "A mis en place un multiplicateur progressif : ×3,5 pour les vins sous 8 € de coût, ×2,8 pour la gamme moyenne, ×2,2 pour les vins d'image.",
      result: "Le ticket moyen vin a augmenté de 12 % car les clients ont cessé de toujours choisir le moins cher.",
    },
  ],
  subtopics: [
    {
      id: "margen-bruto",
      title: "Qu'est-ce que la marge brute",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim a calculé la marge brute de chaque référence de votre carte en croisant le prix de vente avec le coût d'achat réel.",
        whyMatters: "Si vous ne distinguez pas entre marge en pourcentage et contribution absolue, vous risquez de pousser les mauvais vins.",
        riskIfIgnored: "Vous continuez à promouvoir des vins qui semblent rentables en pourcentage mais qui vous laissent moins en euros que d'autres que vous ne regardez même pas.",
      },
      queSignifica:
        "La marge brute est la différence entre ce que vous facturez un vin et ce qu'il vous coûte à l'achat. Elle s'exprime en euros (contribution) ou en pourcentage. C'est la métrique de rentabilité la plus basique, mais pas la seule qui compte. Un vin avec 60 % de marge peut vous laisser moins d'argent réel qu'un autre à 45 %, si ce dernier se vend au double du prix.",
      porQueImporta:
        "Parce que c'est le point de départ de toute décision de pricing. Si vous ne connaissez pas votre marge brute par référence, vous prenez des décisions à l'aveugle. Et si vous ne regardez que le pourcentage sans voir la contribution absolue, vous risquez de promouvoir les mauvais vins.",
      queHacer: [
        "Calculez la marge brute en euros et en pourcentage de vos 10 références les plus vendues.",
        "Classez-les par contribution absolue (€), pas par pourcentage.",
        "Comparez : vos vins les plus vendus sont-ils aussi ceux qui laissent le plus de marge ?",
        "S'ils ne le sont pas, vous avez une opportunité de repricing immédiate.",
      ],
      errores: [
        { mistake: "Ne regarder que le pourcentage de marge", consequence: "Un vin à 8 € avec 65 % de marge laisse 5,20 €. Un à 25 € avec 50 % laisse 12,50 €. Le second est meilleur." },
        { mistake: "Calculer la marge sur le PVP au lieu du coût", consequence: "Vous vous trompez avec un chiffre plus élevé qui ne reflète pas ce que vous gagnez réellement." },
        { mistake: "Ne pas mettre à jour le coût après des changements fournisseur", consequence: "Votre marge théorique n'existe plus : vous vendez en croyant gagner, mais ce n'est pas le cas." },
      ],
    },
    {
      id: "margen-sano",
      title: "Qu'est-ce qu'une marge saine",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim a comparé votre multiplicateur moyen pondéré avec le benchmark de votre segment.",
        whyMatters: "Si vous êtes en dessous de la fourchette saine, vous avez un problème structurel qui ne se résout pas en vendant plus.",
        riskIfIgnored: "Chaque mois qui passe avec une marge désalignée, c'est de la rentabilité accumulée que vous ne pourrez jamais récupérer.",
      },
      queSignifica:
        "Il n'existe pas de marge universelle 'correcte'. Cela dépend de votre segment, ticket moyen, volume et structure de coûts. Mais il existe des références de marché : la plupart des restaurants rentables opèrent avec un multiplicateur moyen entre ×2,5 et ×3,5 sur le coût, soit des marges brutes de 60 à 72 %. L'important n'est pas un chiffre fixe, mais que votre marge moyenne pondérée par les ventes soit en ligne avec votre modèle économique.",
      porQueImporta:
        "Parce que si votre marge moyenne est en dessous du benchmark de votre segment, vous avez un problème structurel qui ne se résout pas en vendant plus. Et si elle est bien au-dessus, vous pourriez perdre en compétitivité et en volume sans le savoir.",
      queHacer: [
        "Calculez votre multiplicateur moyen pondéré par les ventes (pas par référence).",
        "Comparez avec le benchmark de votre segment : casual (×2,5-3), gastronomique (×2-2,5), hôtel (×3-4).",
        "Si vous êtes en dessous, identifiez les références qui tirent la moyenne vers le bas.",
        "Si vous êtes au-dessus, évaluez si votre volume au verre et en bouteille correspond aux attentes.",
      ],
      errores: [
        { mistake: "Appliquer un multiplicateur unique à toute la carte", consequence: "Vous perdez de la marge sur les vins bon marché et n'êtes pas compétitif sur les chers." },
        { mistake: "Comparer votre marge avec celle d'un autre segment", consequence: "Un hôtel a une structure de coûts différente d'un bistrot. Ils ne sont pas comparables." },
        { mistake: "Ne pas pondérer par les ventes", consequence: "Votre moyenne de marge semble bonne, mais vos vins les plus vendus sont les pires en termes de marge." },
      ],
    },
    {
      id: "referencias-mal-calibradas",
      title: "Comment repérer les références mal calibrées",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim a identifié des références dont le prix ne correspond pas au coût, à la position sur la carte ou au rôle commercial.",
        whyMatters: "Une seule référence mal calibrée dans votre top 5 peut vous coûter des milliers d'euros par an sans que vous le remarquiez.",
        riskIfIgnored: "L'impact se cumule jour après jour et vous ne le voyez que lorsque vous clôturez le trimestre et que la marge est insuffisante.",
      },
      queSignifica:
        "Une référence mal calibrée est un vin dont le prix ne reflète pas son coût réel, sa position sur la carte ou son rôle commercial. Il peut être trop bon marché (vous perdez de la marge), trop cher (il ne tourne pas) ou mal positionné par rapport aux autres vins de la même gamme.",
      porQueImporta:
        "Parce qu'une seule référence mal calibrée dans votre top 5 de ventes peut vous coûter des milliers d'euros par an. Et si vous en avez plusieurs, l'impact s'accumule invisiblement jour après jour.",
      queHacer: [
        "Croisez vos 10 références les plus vendues avec leur marge : cherchez celles qui vendent le plus mais laissent le moins.",
        "Identifiez les références avec un multiplicateur < ×2 ou > ×4,5 (les deux extrêmes sont des signaux d'alerte).",
        "Vérifiez s'il y a des vins au même prix mais avec des coûts très différents : l'un d'eux est mal calibré.",
        "Corrigez au moins une référence cette semaine et mesurez l'impact dans 30 jours.",
      ],
      errores: [
        { mistake: "Supposer que si ça se vend bien, le prix est bon", consequence: "Un vin peut beaucoup se vendre précisément parce qu'il est trop bon marché." },
        { mistake: "Ne pas réviser après des changements de coût fournisseur", consequence: "La marge disparaît sans que vous le remarquiez jusqu'à la fin du mois." },
        { mistake: "Calibrer uniquement sur le coût, sans considérer la perception client", consequence: "Un repricing agressif peut rompre la confiance du client habituel." },
      ],
    },
    {
      id: "cuando-subir-precio",
      title: "Quand augmenter un prix",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim a trouvé des références avec un volume de vente élevé mais une marge en dessous de la moyenne de votre carte.",
        whyMatters: "Ce sont des candidates évidentes pour une hausse de 1-2 € qui impacte rarement la demande mais améliore votre résultat chaque jour.",
        riskIfIgnored: "Chaque service qui passe sans corriger le prix est de la marge que vous perdez et que vous ne pourrez jamais récupérer.",
      },
      queSignifica:
        "Augmenter le prix n'est pas toujours la réponse, mais c'est souvent l'action la plus directe pour améliorer la rentabilité. Le bon moment est lorsque vous avez des données qui le justifient : une marge en dessous du benchmark, un coût qui a augmenté, une référence qui se vend bien avec une marge faible, ou une gamme de prix sans concurrence interne.",
      porQueImporta:
        "Parce que beaucoup de restaurants évitent d'augmenter les prix par peur de perdre des clients, mais la réalité est que des hausses de 1-2 € sur des références stratégiques impactent rarement la demande. En revanche, ne pas augmenter quand vous devriez vous coûte de la marge chaque jour.",
      queHacer: [
        "Identifiez les 3 références avec le plus grand volume de vente et une marge en dessous de la moyenne.",
        "Évaluez une hausse de 1-2 € et calculez l'impact annuel (volume × augmentation).",
        "Vérifiez que le nouveau prix n'entre pas en conflit avec une autre référence de la même gamme.",
        "Mettez en œuvre le changement et révisez les ventes après 30 jours. Si le volume ne baisse pas, le prix était correct.",
      ],
      errores: [
        { mistake: "Augmenter tous les prix en même temps", consequence: "Le client habituel remarque le changement et la perception de valeur en souffre." },
        { mistake: "Ne jamais augmenter par peur de la réaction", consequence: "Votre marge s'érode année après année tandis que les coûts augmentent." },
        { mistake: "Augmenter sans vérifier la gamme concurrentielle", consequence: "Vous créez un trou de prix ou un chevauchement qui n'existait pas." },
      ],
    },
    {
      id: "cuando-revisar-compra",
      title: "Quand réviser l'achat",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim a détecté des références avec une marge faible dont le coût d'achat a augmenté par rapport à l'historique.",
        whyMatters: "Chaque euro économisé à l'achat est de la marge directe, invisible pour le client mais très visible dans votre compte de résultat.",
        riskIfIgnored: "Vous continuez à payer plus que vous ne devriez par fidélité au fournisseur, pas par valeur reçue.",
      },
      queSignifica:
        "Une marge faible ne se résout pas toujours en augmentant le prix. Parfois le problème est que vous achetez trop cher. Réviser l'achat signifie vérifier si le coût d'acquisition d'une référence est encore compétitif, s'il existe des alternatives moins chères de qualité équivalente, ou si vous pouvez négocier de meilleures conditions.",
      porQueImporta:
        "Parce que chaque euro économisé à l'achat est un euro de marge directe. Et contrairement à l'augmentation de prix (que le client voit), améliorer l'achat est invisible pour le client mais très visible dans votre compte de résultat.",
      queHacer: [
        "Identifiez les références avec une marge faible et révisez leur historique de coût : a-t-il augmenté ?",
        "Demandez au moins 2 devis alternatifs pour ces références.",
        "Négociez avec votre fournisseur actuel en utilisant les prix du marché comme levier.",
        "Si la différence est >10 %, envisagez le changement ou utilisez la négociation pour obtenir de meilleures conditions.",
      ],
      errores: [
        { mistake: "Ne pas réviser les coûts parce que 'vous achetez toujours au même'", consequence: "Vous payez plus que nécessaire par fidélité, pas par valeur reçue." },
        { mistake: "Comparer uniquement le prix sans évaluer le service et les conditions", consequence: "Un fournisseur bon marché mais peu fiable vous coûte plus à long terme." },
        { mistake: "Ne pas relier la marge faible à l'origine de l'achat", consequence: "Vous cherchez la solution dans le prix de vente alors que le problème est dans le coût." },
      ],
    },
    {
      id: "cuando-revisar-copeo",
      title: "Quand réviser le programme au verre",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim a trouvé des références au verre dont la marge réelle diffère significativement de la marge théorique.",
        whyMatters: "Le verre peut être votre meilleur levier de marge ou votre plus grande source de perte invisible. Une erreur de 0,50 € par verre sur 20 verres/semaine, c'est plus de 500 €/an perdus.",
        riskIfIgnored: "Vous continuez à servir des verres à un prix déficitaire sans le savoir, parce que vous n'avez jamais croisé les données de casse avec le pricing.",
      },
      queSignifica:
        "Si une référence a une marge faible et est servie au verre, le problème peut venir du programme au verre : prix mal calculé, casse non comptabilisée ou rotation insuffisante. Le verre multiplie les erreurs de pricing car chaque bouteille se divise en 4-6 services, et tout écart se répète à chaque verre.",
      porQueImporta:
        "Parce que le verre peut être votre plus grand levier de marge (jusqu'à ×3 par rapport à la bouteille) ou votre plus grande source de perte invisible. Une erreur de 0,50 € par verre, multipliée par 20 verres par semaine, c'est plus de 500 € par an perdus sur une seule référence.",
      queHacer: [
        "Recalculez le prix au verre en incluant la casse réelle (utilisez au minimum 20-25 % de perte).",
        "Comparez la marge au verre avec la marge à la bouteille de la même référence.",
        "Si le verre ne donne pas plus de marge que la bouteille, vous avez un problème de prix ou de casse.",
        "Vérifiez si la référence au verre a une rotation suffisante pour finir la bouteille en 24-48 heures.",
      ],
      errores: [
        { mistake: "Diviser le prix de la bouteille par 5 pour fixer le prix au verre", consequence: "Vous ne couvrez ni la casse, ni le service, ni la marge. Vous vendez à perte sans le savoir." },
        { mistake: "Ne pas mesurer la casse réelle pour chaque référence au verre", consequence: "Votre marge théorique et votre marge réelle peuvent différer de 30 % ou plus." },
        { mistake: "Garder des verres à faible rotation 'parce qu'ils font bien sur la carte'", consequence: "Chaque bouteille ouverte qui n'est pas terminée, c'est de l'argent jeté." },
      ],
    },
    {
      id: "revision-mensual",
      title: "Comment lire une révision mensuelle des marges",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim génère automatiquement une comparaison mensuelle des marges pour repérer les écarts avant qu'ils ne s'accumulent.",
        whyMatters: "Les fournisseurs augmentent les prix, la casse varie selon la saison et la demande évolue. Sans révision mensuelle, les surprises s'accumulent.",
        riskIfIgnored: "Les écarts s'additionnent silencieusement et vous ne les voyez que lorsque le trimestre se clôture moins bien que prévu.",
      },
      queSignifica:
        "La révision mensuelle des marges est le processus de vérifier, chaque mois, si votre carte est encore rentable. Elle inclut la comparaison des marges actuelles avec celles du mois précédent, la détection des écarts de coût, l'identification des références qui ont changé de performance et la décision d'ajustements. Ce n'est pas un rapport : c'est un processus de décision récurrent.",
      porQueImporta:
        "Parce que les marges changent sans que vous ne fassiez quoi que ce soit. Les fournisseurs augmentent les prix, la demande varie, les verres génèrent une casse différente selon la saison. Si vous ne révisez pas chaque mois, les écarts s'accumulent et se transforment en mauvaises surprises en fin de trimestre.",
      queHacer: [
        "Bloquez 1 heure par mois pour réviser les marges. Mettez-le dans le calendrier comme routine opérationnelle.",
        "Comparez la marge moyenne pondérée de ce mois avec celle du mois dernier. En hausse ou en baisse ?",
        "Identifiez les 3 références avec la plus forte baisse de marge et trouvez la cause (coût, volume, casse).",
        "Prenez au moins 1 décision d'ajustement par révision : repricing, changement de verre, négociation fournisseur.",
      ],
      errores: [
        { mistake: "Ne pas faire de révision mensuelle parce qu'« il n'y a pas le temps »", consequence: "Les écarts s'accumulent et vous ne les voyez que lorsqu'ils sont déjà un problème grave." },
        { mistake: "Ne réviser que la marge moyenne globale", consequence: "La moyenne peut aller bien tandis que 5 références sont dans le rouge." },
        { mistake: "Réviser sans prendre aucune décision concrète", consequence: "La révision devient un exercice théorique qui ne change rien." },
      ],
    },
  ],
  nextStep: {
    label: "Ouvrir le calculateur de marges",
    href: "/calculadora-margen-vino",
    description: "Calculez la marge réelle de vos références et repérez celles qui nécessitent un ajustement de prix.",
  },
};

export default margenesPricingFR;
