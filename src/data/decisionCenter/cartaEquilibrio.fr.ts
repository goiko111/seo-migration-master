import { BarChart3 } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const cartaEquilibrioFR: DeepAreaContent = {
  name: "Carte des vins et équilibre",
  tagline: "Votre carte doit raconter une histoire cohérente",
  intro: "Cette section vous aide à évaluer si votre carte a la bonne structure pour vendre, pas seulement pour impressionner. Équilibrer une carte, ce n'est pas avoir 'un peu de tout' : c'est que chaque référence ait un rôle clair. Surtout dans les cartes amples et complexes — à partir de 250 références — l'équilibre cesse d'être une question esthétique et devient une décision stratégique qui impacte directement les ventes, le stock et l'expérience en salle.",
  icon: BarChart3,
  accent: "text-wine",
  bg: "bg-wine/10",
  audiences: ["sala", "direccion", "compras-fb"],
  topErrors: [
    { error: "Construire la carte par accumulation plutôt que par design", porQueOcurre: "Parce que chaque nouveau vin s'ajoute sans en retirer un autre. Le fournisseur propose, le sommelier accepte, la carte grandit sans critère.", consecuencia: "La carte gonfle, se déséquilibre et se remplit de redondances qui cannibalisent les ventes et génèrent du stock mort." },
    { error: "Saturer une tranche de prix sans couvrir les autres", porQueOcurre: "Parce qu'on achète ce qui plaît ou ce que propose le fournisseur habituel, qui opère généralement dans la même tranche.", consecuencia: "Vous êtes en concurrence avec vous-même à 25-35 € alors que le convive qui cherche quelque chose à moins de 20 € ou plus de 50 € ne trouve pas d'options." },
    { error: "Déséquilibre par origine : 80 % d'une seule appellation", porQueOcurre: "Parce que la zone de confort de l'acheteur ou la proximité géographique concentrent les achats sur quelques origines.", consecuencia: "Dépendance à un marché (risque de prix), manque de diversité pour le client et une carte qui ne raconte pas une histoire intéressante." },
    { error: "Ajouter sans retirer : 'plus d'options, mieux c'est'", porQueOcurre: "Parce que retirer semble perdre, et ajouter semble gagner. Mais au-delà d'un certain point, chaque nouvelle référence dilue l'attention.", consecuencia: "Le convive met plus de temps à choisir, l'équipe ne peut pas connaître toute la carte et les ventes se concentrent sur 15-20 références tandis que le reste est de la décoration." },
    { error: "Ne pas cartographier la carte avant de prendre des décisions", porQueOcurre: "Parce qu'on travaille avec la liste de références sans visualiser la structure. Les décisions se prennent une par une, sans voir l'ensemble.", consecuencia: "Vous ajoutez là où vous êtes déjà saturé et laissez des trous là où il y a de la demande. C'est comme rénover une maison sans regarder le plan." },
  ],
  links: [
    { label: "Modèle wine mapping", href: "/recursos/plantilla-wine-mapping-restaurante", description: "Cartographiez votre carte par type, prix, origine et rôle commercial", type: "resource" as const },
    { label: "Modèle équilibre de carte", href: "/recursos/plantilla-equilibrio-carta", description: "Diagnostiquez saturations, trous et cannibalisation par tranche", type: "resource" as const },
    { label: "Checklist carte rentable", href: "/recursos/checklist-carta-rentable", description: "Vérifiez si votre carte remplit les critères d'une carte qui vend", type: "resource" as const },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Le moteur analytique qui évalue l'équilibre de votre carte automatiquement", type: "product" as const },
    { label: "Blog : Votre carte est-elle déséquilibrée ?", href: "/article/como-saber-si-carta-vinos-esta-descompensada", description: "Diagnostic rapide pour repérer les déséquilibres dans votre carte des vins", type: "article" as const },
    { label: "Blog : Votre carte est-elle trop longue ?", href: "/article/cuando-carta-vinos-es-demasiado-larga", description: "Signes d'excès de références et comment agir", type: "article" as const },
  ],
  subtopics: [
    {
      id: "carta-descompensada",
      title: "Comment savoir si une carte est déséquilibrée",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim a cartographié la distribution de votre carte par type, prix et origine et a trouvé des zones de saturation et des trous.", whyMatters: "Une carte déséquilibrée perd des ventes (le convive ne trouve pas ce qu'il cherche), cannibalise la marge et accumule du stock là où il y a excès.", riskIfIgnored: "Chaque nouvelle référence ajoutée sans critère déséquilibre davantage la carte et amplifie le problème." },
      queSignifica:
        "Une carte déséquilibrée est celle dont la distribution des références ne reflète pas ce que vos clients commandent réellement. Ce peut être un excès de rouges et presque aucun effervescent, une concentration exagérée dans une tranche de prix, ou 40 % de la carte consacrée à une seule région. Le déséquilibre ne se voit pas à l'œil nu : il se détecte quand on cartographie la carte par variables et qu'on compare avec les données de vente.",
      porQueImporta:
        "Parce qu'une carte déséquilibrée génère trois problèmes à la fois : le convive ne trouve pas ce qu'il cherche (vente perdue), les références saturées se cannibalisent entre elles (marge perdue) et vous accumulez du stock dans les zones en excès (capital immobilisé). Dans les cartes amples — à partir de 250 références — le déséquilibre s'amplifie exponentiellement.",
      queHacer: [
        "Cartographiez votre carte par type de vin (rouge, blanc, rosé, effervescent, muté) et calculez le % de chacun.",
        "Croisez cette distribution avec vos données de vente : 70 % de votre carte sont des rouges mais 40 % de vos ventes sont des blancs ?",
        "Identifiez les 3 catégories les plus saturées et les 2 plus vides. C'est là que se trouvent vos opportunités.",
        "Fixez une distribution cible cohérente avec votre concept et révisez-la chaque trimestre.",
      ],
      errores: [
        { mistake: "Supposer que la carte est équilibrée parce qu'elle a 'un peu de tout'", consequence: "Avoir un peu de tout n'est pas l'équilibre. Vous pouvez avoir 60 rouges et 4 blancs." },
        { mistake: "Équilibrer par nombre de références sans regarder les ventes", consequence: "Vous pouvez avoir 20 effervescents et en vendre 2. L'équilibre doit refléter la demande." },
        { mistake: "Ne pas revoir l'équilibre après avoir ajouté de nouvelles références", consequence: "Chaque ajout sans critère déséquilibre la carte un peu plus." },
      ],
    },
    {
      id: "exceso-huecos-precio",
      title: "Excès et trous par gamme de prix",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim a analysé la distribution de vos références par tranche de prix et a trouvé des zones saturées et des tranches vides.", whyMatters: "Le prix est le premier filtre du convive. Saturer une tranche génère de la cannibalisation ; laisser des trous perd des ventes que vous ne voyez jamais.", riskIfIgnored: "Vous continuez de saturer des tranches où vous êtes déjà en concurrence avec vous-même tandis que le client qui cherche autre chose part sans commander." },
      queSignifica:
        "Les gammes de prix sont les tranches dans lesquelles se distribuent vos références : 10-15 €, 15-25 €, 25-40 €, etc. Un excès dans une tranche signifie que vous avez trop de références en concurrence pour le même convive dans le même intervalle. Un trou signifie qu'il y a une tranche où le client cherche et ne trouve rien. Les deux sont des problèmes, mais l'excès est plus coûteux (génère cannibalisation et stock) et le trou plus invisible (vous perdez des ventes que vous ne voyez jamais).",
      porQueImporta:
        "Parce que le prix est le premier filtre du convive. Si votre carte a 15 rouges entre 18 et 22 € et aucun entre 30 et 40 €, vous saturez le client indécis dans une tranche et perdez celui qui cherche quelque chose de spécial. Dans les cartes amples, cet effet se multiplie : chaque tranche saturée est un nid de cannibalisation.",
      queHacer: [
        "Divisez votre carte en tranches de prix (ex. <15 €, 15-25 €, 25-40 €, 40-60 €, >60 €) et comptez les références dans chacune.",
        "Identifiez les tranches avec plus de 10 références du même type : c'est de la saturation.",
        "Cherchez les tranches vides ou avec moins de 2 options : c'est un trou à combler.",
        "Comparez la distribution des prix avec votre ticket moyen vin : la majorité de vos options est-elle dans la tranche que votre client choisit ?",
      ],
      errores: [
        { mistake: "Aucune visibilité de la distribution par tranche de prix", consequence: "Vous ne savez pas où vous êtes saturé ni où vous avez des trous jusqu'à ce qu'un client vous le dise." },
        { mistake: "Ajouter des références sans vérifier dans quelle tranche elles tombent", consequence: "Chaque nouvelle référence dans une tranche saturée aggrave le problème." },
        { mistake: "Combler un trou avec un vin qui ne correspond pas au concept", consequence: "Avoir quelque chose dans cette tranche ne suffit pas : cela doit être cohérent avec votre restaurant." },
      ],
    },
    {
      id: "equilibrio-estilos",
      title: "Équilibre par styles",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim a classé votre carte par profil organoleptique et a détecté une concentration excessive dans certains styles.", whyMatters: "Si tous vos rouges sont puissants ou tous vos blancs fruités, vous limitez votre marché potentiel à un seul type de palais.", riskIfIgnored: "Vous perdez le convive qui veut quelque chose de différent. Et vous ne le saurez jamais, car il ne demande pas : il choisit simplement autre chose ou ne commande pas de vin." },
      queSignifica:
        "Au-delà de rouge/blanc/rosé, l'équilibre par styles examine la diversité des profils organoleptiques : avez-vous des vins légers et frais en plus des puissants ? Y a-t-il des options jeunes en plus des élevés ? Votre carte offre-t-elle de la variété de cépages et d'élaborations, ou tout se ressemble ? L'équilibre par styles détermine si votre carte couvre l'éventail des goûts de votre clientèle ou ne parle qu'à un type de palais.",
      porQueImporta:
        "Parce que le convive ne choisit pas seulement par type et prix : il choisit par envie. Si tous vos rouges sont puissants et boisés, vous perdez celui qui veut quelque chose de léger. Si tous vos blancs sont fruités, vous perdez celui qui cherche de la minéralité. Un bon équilibre de styles maximise la probabilité que chaque convive trouve quelque chose qui lui convient.",
      queHacer: [
        "Classez vos références par profil : léger/moyen/corsé, jeune/élevé/réserve, aromatique/minéral/structuré.",
        "Vérifiez si vous avez des options dans chaque quadrant ou si tout se concentre sur un profil.",
        "Demandez à l'équipe de salle : y a-t-il des demandes qu'ils ne peuvent pas satisfaire avec la carte actuelle ?",
        "Si 80 % de votre carte a un profil similaire, vous limitez votre marché potentiel.",
      ],
      errores: [
        { mistake: "Concevoir la carte selon les goûts du sommelier ou du chef", consequence: "Votre carte satisfait celui qui la crée, mais peut ignorer 60 % de vos convives." },
        { mistake: "Confondre variété de domaines avec variété de styles", consequence: "20 domaines différents peuvent produire des vins très similaires s'ils sont de la même zone et du même cépage." },
        { mistake: "Ne pas adapter les styles à la cuisine du restaurant", consequence: "Une carte pleine de rouges puissants dans un restaurant de cuisine légère crée de la dissonance." },
      ],
    },
    {
      id: "equilibrio-origen",
      title: "Équilibre par origine",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim a analysé la distribution de votre carte par appellation et origine et a détecté une surconcentration ou une dispersion.", whyMatters: "La concentration d'origine crée un risque d'achat (dépendance à un marché) et peut ne pas refléter ce que demande votre clientèle.", riskIfIgnored: "Si votre appellation principale augmente ses prix, vous n'avez pas d'alternatives. Et votre carte raconte une histoire qui ne correspond peut-être pas à votre client." },
      queSignifica:
        "L'équilibre par origine évalue comment vos références se distribuent par appellation, région ou pays. Une concentration excessive sur une origine peut limiter votre offre et créer une dépendance à un marché d'achat. Une distribution trop dispersée peut générer une carte sans identité. Le point optimal dépend de votre concept : un restaurant de cuisine régionale a une logique de concentration ; un cosmopolite a besoin d'amplitude.",
      porQueImporta:
        "Parce que l'origine fait partie de l'histoire que raconte votre carte. Si vous avez 30 Bordeaux et 2 Bourgognes, votre carte dit quelque chose sur vos priorités — qui peut ou non correspondre à ce que commande votre clientèle. De plus, la concentration d'origine crée un risque d'achat : si votre appellation principale augmente ses prix, vous n'avez pas d'alternatives immédiates.",
      queHacer: [
        "Listez les 5 appellations ou régions avec le plus de références dans votre carte. Dépassent-elles 50 % du total ?",
        "Comparez avec vos données de vente : la concentration est-elle justifiée par la demande ou par l'inertie d'achat ?",
        "Évaluez si votre distribution d'origines est cohérente avec le type de cuisine et le profil de votre client.",
        "Si vous détectez une surconcentration, ne supprimez pas d'un coup : substituez progressivement au renouvellement des références.",
      ],
      errores: [
        { mistake: "Surreprésenter une appellation par relations personnelles avec des domaines ou distributeurs", consequence: "Votre carte reflète vos contacts commerciaux, pas les besoins de votre client." },
        { mistake: "Diversifier pour diversifier sans critère", consequence: "Une carte avec 30 pays et aucune profondeur ne transmet pas de l'expertise : elle transmet de la dispersion." },
        { mistake: "Ne pas adapter les origines à la saisonnalité de la cuisine", consequence: "Des blancs de zones froides en hiver et des rouges puissants en été ne correspondent pas à ce que le convive désire." },
      ],
    },
    {
      id: "carta-demasiado-larga",
      title: "Quand une carte est trop longue",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim a calculé votre ratio d'efficacité : références avec ventes réelles vs. total de références en carte.", whyMatters: "L'excès d'options paralyse le convive, concentre les ventes sur 15-20 références et transforme le reste en décoration coûteuse.", riskIfIgnored: "Vous accumulez complexité, stock et gestion sans retour. Votre équipe recommande toujours la même chose parce qu'elle ne peut pas connaître toute la carte." },
      queSignifica:
        "Une carte est trop longue quand elle a plus de références que votre opérationnel peut gérer, que votre équipe peut connaître ou que votre convive peut traiter. Il n'y a pas de nombre magique, mais il y a des signaux clairs : si plus de 20 % de vos références ne se sont pas vendues en 60 jours, si votre équipe de salle ne peut pas décrire la moitié de la carte, ou si le convive met plus de 5 minutes à choisir, votre carte est trop longue pour votre contexte.",
      porQueImporta:
        "Parce qu'une carte longue n'impressionne pas : elle paralyse. L'excès d'options (paradoxe du choix) réduit la conversion, augmente le temps de service et concentre les ventes sur les mêmes 15-20 références que l'équipe connaît et recommande. Le reste est de la décoration qui génère stock, gestion et coût sans retour. Dans les cartes amples à partir de 250 références, ce risque est structurel.",
      queHacer: [
        "Calculez votre ratio d'efficacité : références avec ventes réelles sur les 60 derniers jours / total de références.",
        "Si votre ratio est < 70 %, votre carte a trop de références pour votre niveau de demande.",
        "Identifiez les références que l'équipe de salle ne recommande jamais : elles sont probablement de trop.",
        "Fixez une limite opérationnelle et respectez-la : chaque nouvel ajout nécessite un retrait.",
      ],
      errores: [
        { mistake: "Croire qu'une carte longue est synonyme de qualité ou de prestige", consequence: "Une carte de 400 références dont 150 ne se vendent pas n'est pas prestigieuse : elle est inefficace." },
        { mistake: "Ne pas fixer de limite au nombre de références", consequence: "La carte grandit par accumulation et n'est jamais élaguée, jusqu'à ce que le stock mort oblige à agir." },
        { mistake: "Réduire la carte en éliminant les vins les moins chers", consequence: "Les vins d'entrée de gamme sont les plus rotés et souvent la porte d'entrée vers la vente au verre." },
      ],
    },
    {
      id: "carta-amplia-compleja",
      title: "Ce que signifie une carte ample et complexe",
      priority: "seguimiento",
      porQueTeLoMostramos: { detected: "Votre carte dépasse les 250 références : c'est un actif stratégique si géré avec des données, et un passif si géré à l'intuition.", whyMatters: "La complexité ajoute de la profondeur mais aussi de la friction : plus de stock, plus de cannibalisation, plus de risque sans visibilité.", riskIfIgnored: "Sans outils analytiques, la complexité devient du chaos. Vous ne voyez pas ce qui se cannibalise ni où sont vos trous." },
      queSignifica:
        "Une carte ample et complexe — à partir de 250 références — n'est ni intrinsèquement bonne ni mauvaise. C'est un actif stratégique si elle est gérée avec des données, et un passif opérationnel si elle est gérée à l'intuition. La complexité ajoute de la profondeur (plus d'options pour le convive expert) mais aussi de la friction (plus difficile à gérer, plus de stock, plus de risque de cannibalisation). Winerim est conçu spécifiquement pour ce scénario.",
      porQueImporta:
        "Parce que gérer une carte de 250+ références sans outils analytiques, c'est comme piloter un avion sans instruments. Vous devez savoir ce qui se vend, ce qui ne se vend pas, ce qui se cannibalise, où sont vos trous et où sont vos excès. Sans cette visibilité, la complexité devient du chaos. Avec elle, elle devient un avantage concurrentiel.",
      queHacer: [
        "Si votre carte dépasse les 250 références, priorisez la mise en place d'un système d'analyse continue (pas des revues ponctuelles).",
        "Segmentez la carte en blocs gérables : par type, par tranche de prix, par origine. Analysez chaque bloc séparément.",
        "Désignez un responsable de la santé de la carte qui révise mensuellement les indicateurs clés.",
        "Acceptez que la complexité nécessite des outils : ce qui fonctionne avec 80 références ne passe pas à l'échelle à 300.",
      ],
      errores: [
        { mistake: "Gérer une carte de 300 références avec les mêmes méthodes qu'une de 50", consequence: "La complexité croît exponentiellement, mais les méthodes manuelles ne passent pas à l'échelle." },
        { mistake: "Ne pas segmenter : traiter toute la carte comme un seul bloc", consequence: "Les problèmes d'un segment se diluent dans la moyenne et ne sont détectés que lorsqu'ils sont graves." },
        { mistake: "Considérer la complexité comme un problème à réduire plutôt qu'un actif à gérer", consequence: "Si votre concept nécessite de l'amplitude, la solution n'est pas de couper : c'est de mieux gérer." },
      ],
    },
    {
      id: "wine-mapping",
      title: "Comment interpréter le wine mapping et l'architecture de carte",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim a généré automatiquement le wine mapping de votre carte en croisant type × prix × style.", whyMatters: "Sans carte visuelle, chaque décision (ajout, retrait, repricing) est prise sans contexte. La carte vous dit où agir en 5 minutes.", riskIfIgnored: "Vous prenez des décisions sur une liste sans voir la structure. C'est comme rénover une maison sans plan." },
      queSignifica:
        "Le wine mapping est la représentation visuelle de votre carte dans une matrice croisant au moins deux variables : typiquement type de vin × tranche de prix, ou style × origine. L'architecture de carte est l'étape suivante : assigner un rôle commercial à chaque zone de la carte (attraction, conversion, positionnement, exploration). Une carte bien lue vous dit où agir. Une architecture bien définie vous dit pourquoi.",
      porQueImporta:
        "Parce que sans carte visuelle, vous ne pouvez pas voir la structure de votre carte des vins. Et sans structure, chaque décision (ajouter, retirer, repricing) est prise sans contexte. Le wine mapping convertit une liste de 200 références en une image que n'importe quel responsable peut interpréter en 5 minutes. C'est l'outil de diagnostic le plus rapide qui existe pour une carte des vins.",
      queHacer: [
        "Créez une carte de votre carte des vins avec les axes type × prix. Chaque référence est un point sur la carte.",
        "Identifiez les zones denses (saturation) et les zones vides (opportunité ou non-pertinence).",
        "Assignez des rôles : quelle zone attire le convive ? Laquelle convertit ? Laquelle positionne votre restaurant ?",
        "Utilisez la carte pour les décisions d'ajout/retrait : si un nouveau vin tombe dans une zone saturée, vous devez en retirer un autre d'abord.",
      ],
      errores: [
        { mistake: "Ne pas avoir de carte visuelle de la carte des vins", consequence: "Vous prenez des décisions sur une liste sans voir la structure. C'est comme rénover une maison sans plan." },
        { mistake: "Faire le wine mapping une fois et ne pas le mettre à jour", consequence: "La carte expire à chaque changement. Elle doit être un document vivant." },
        { mistake: "Cartographier uniquement par type et prix sans inclure les données de vente", consequence: "Vous voyez la structure mais ne savez pas quelles zones fonctionnent et lesquelles non." },
      ],
    },
  ],
  miniCases: [
    {
      profile: "Gastronomique avec carte de 180 références",
      situation: "65 % de la carte étaient des rouges de Rioja et Ribera, concentrés entre 25 € et 35 €. Blancs et effervescents ne représentaient que 12 %. L'équipe de salle reconnaissait que beaucoup de convives demandaient 'quelque chose de frais' sans trouver d'options.",
      action: "A cartographié la carte par type × prix. Retiré 14 rouges redondants dans la tranche saturée et ajouté 6 blancs et 3 effervescents dans les tranches vides (15-25 € et 35-50 €). Redistribué sans toucher au total de références.",
      result: "Les ventes de blanc ont augmenté de 28 % le premier mois. Le ticket moyen vin a augmenté de 2,40 € car les convives trouvaient des options là où il n'y en avait pas.",
    },
    {
      profile: "Hôtel boutique avec carte de 310 références",
      situation: "Carte ample et complexe gérée comme une liste plate, sans wine mapping. 22 % des références ne s'étaient pas vendues en 90 jours. L'équipe achats ne savait pas quoi retirer car 'tout pouvait se vendre'.",
      action: "A implémenté Winerim Core pour générer le wine mapping automatique. Identifié 68 références en zones de saturation et 4 tranches de prix sans couverture. Retiré 35 références en 3 phases mensuelles.",
      result: "Le ratio d'efficacité est passé de 72 % à 89 %. Capital libéré du stock : 8 200 €. L'équipe de salle est passée de recommander toujours la même chose à couvrir des demandes diversifiées.",
    },
    {
      profile: "Bar à vins avec 95 références et haute rotation",
      situation: "Tous les vins étaient entre 18 € et 30 €. Rien en dessous de 15 € (entrée de gamme) ni au-dessus de 45 € (spécial). Le convive casual repartait sans commander et le connaisseur ne trouvait pas de profondeur.",
      action: "A créé trois nouvelles tranches : entrée (<15 €, 4 vins), exploration (35-45 €, 5 vins) et image (>50 €, 3 vins). Réduit la tranche centrale de 95 à 83 références.",
      result: "La pénétration vin par table est passée de 62 % à 74 %. Les vins d'image ouvraient des conversations que l'équipe exploitait pour vendre la tranche exploration.",
    },
    {
      profile: "Groupe de 5 établissements casual-premium",
      situation: "Chaque établissement avait une carte différente créée par son responsable de salle. Il n'y avait pas de standard d'équilibre par type ni par prix. Deux établissements n'avaient pas d'effervescents ; un avait 40 % de rosés sans demande.",
      action: "A défini une architecture de carte commune : distribution cible par type (50 % rouge, 25 % blanc, 15 % effervescent, 10 % autre) avec marge d'adaptation locale de ±10 %. Utilisé Winerim Core pour monitorer les écarts mensuels.",
      result: "En 3 mois, les 5 établissements ont convergé vers l'équilibre sans perdre leur identité. L'établissement avec excès de rosé a réduit le stock mort de 60 %. Le benchmarking entre établissements a permis de détecter des bonnes pratiques réplicables.",
    },
  ],
  nextStep: {
    label: "Révisez l'équilibre de votre carte",
    href: "/recursos/plantilla-equilibrio-carta",
    description: "Téléchargez le modèle et diagnostiquez saturations, trous et cannibalisation dans votre carte actuelle.",
  },
};

export default cartaEquilibrioFR;
