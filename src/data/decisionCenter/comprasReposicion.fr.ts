import { ShoppingCart } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const comprasReposicionFR: DeepAreaContent = {
  name: "Achats et réapprovisionnement",
  tagline: "Achetez avec des données, pas avec l'intuition",
  intro: "Cette section vous aide à prendre de meilleures décisions d'achat et de réapprovisionnement. Il ne s'agit pas d'acheter moins cher : il s'agit d'acheter ce qui va se vendre, au bon prix, dans la bonne quantité. Chaque décision d'achat impacte directement votre marge, votre stock et la cohérence de votre carte des vins.",
  icon: ShoppingCart,
  accent: "text-blue-500",
  bg: "bg-blue-500/10",
  audiences: ["compras-fb", "direccion"],
  topErrors: [
    { error: "Acheter par habitude ou sous la pression du fournisseur", porQueOcurre: "Parce que le fournisseur appelle chaque semaine et il est plus facile de répéter la commande que de la réviser. La routine remplace l'analyse.", consecuencia: "Votre cave se remplit de ce qu'on vous vend, pas de ce dont vous avez besoin. Le stock augmente sans lien avec la demande réelle." },
    { error: "Évaluer les fournisseurs uniquement sur le prix catalogue", porQueOcurre: "Parce que le prix à la bouteille est le chiffre le plus visible. Mais vous ignorez le transport, les minimums, les ristournes, les délais de paiement et les retours.", consecuencia: "Vous choisissez le fournisseur 'le moins cher' qui en réalité vous coûte plus par bouteille servie quand on additionne tout." },
    { error: "Ne pas croiser les commandes avec les données de vente", porQueOcurre: "Parce que les achats et la salle fonctionnent comme des services séparés. Celui qui commande ne regarde pas ce qui se vend.", consecuencia: "Vous achetez ce qui ne se vend pas et manquez de ce qui se demande. Le désalignement s'aggrave commande après commande." },
    { error: "Réapprovisionner sans vérifier le stock actuel en cave", porQueOcurre: "Parce que compter le stock prend du temps et semble inutile quand 'on en a toujours besoin'. Mais souvent vous en avez déjà suffisamment.", consecuencia: "Vous accumulez un excès de stock sur des références déjà couvertes. Le capital est immobilisé inutilement." },
    { error: "Ne négocier que lorsqu'il y a un problème", porQueOcurre: "Parce que la relation fournisseur est considérée comme stable. Elle n'est révisée que lors d'un incident ou d'une hausse de prix.", consecuencia: "Vous perdez l'occasion d'améliorer proactivement vos conditions. Le fournisseur suppose que vous êtes satisfait et ne vous propose rien de mieux." },
  ],
  links: [
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Intelligence achats : comparaison de prix, alertes surprix et réapprovisionnement basé sur les données", type: "product" },
    { label: "Calculateur d'achat intelligent", href: "/herramientas/calculadora-compra-inteligente", description: "Évaluez si un achat a du sens en croisant rotation, marge et stock actuel", type: "tool" },
    { label: "Modèle : Contrôle groupe de restauration", href: "/recursos/plantilla-control-grupo-restauracion", description: "Coordonnez achats et assortiment entre les établissements d'un même groupe", type: "resource" },
    { label: "Modèle : Révision mensuelle de la carte", href: "/recursos/plantilla-revision-mensual-carta", description: "Processus mensuel pour relier la performance de la carte aux décisions d'achat", type: "resource" },
    { label: "Blog : Achetez-vous mal votre vin ?", href: "/blog/como-saber-si-estas-comprando-mal-vino-restaurante", description: "Signes que votre processus d'achat a besoin d'une révision", type: "article" },
    { label: "Blog : Quels vins faut-il réapprovisionner ?", href: "/blog/que-vinos-merece-la-pena-reponer", description: "Critères pour décider ce qui entre et ce qui sort de votre prochaine commande", type: "article" },
  ],
  miniCases: [
    {
      profile: "Groupe casual de 4 établissements",
      situation: "Chaque établissement commandait séparément au fournisseur, sans coordination. Le même vin était acheté à 3 prix différents selon qui négociait.",
      action: "A centralisé les achats des 15 références communes. A négocié un prix unique avec volume agrégé et transport inclus.",
      result: "Économie moyenne de 11 % sur le coût d'achat. 4 200 €/an sur les seules références partagées.",
    },
    {
      profile: "Restaurant gastronomique indépendant",
      situation: "Le sommelier achetait par intuition et catalogue. Les commandes n'étaient jamais croisées avec les données de vente. Résultat : 30 % de la commande mensuelle allait à des références à faible rotation.",
      action: "Avant chaque commande, exporte le top 20 par rotation et la liste du stock mort. Ne réapprovisionne que ce qui tourne et teste 2 nouvelles références par mois.",
      result: "A réduit la commande mensuelle de 20 % sans perdre de ventes. L'investissement se concentre sur ce qui fonctionne.",
    },
  ],
  subtopics: [
    {
      id: "comprando-mal",
      title: "Comment savoir si vous achetez mal",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim a croisé vos commandes récentes avec les données de vente et a détecté qu'une partie de votre budget va à des références sans demande réelle.", whyMatters: "Si vous achetez mal, votre stock gonfle, votre marge se comprime et votre carte se remplit de ce que personne ne commande.", riskIfIgnored: "Chaque commande par inertie finance une erreur récurrente qui érode votre rentabilité mois après mois." },
      queSignifica:
        "Mal acheter, ce n'est pas seulement payer trop cher. C'est acheter ce qui ne se vend pas, en quantités inutiles, auprès de fournisseurs non comparés, ou réapprovisionner par inertie sans consulter les données. Le signe le plus clair d'un mauvais achat est un stock qui augmente tandis que les ventes stagnent. Si votre cave est plus pleine chaque mois mais que votre ticket moyen ne monte pas, quelque chose cloche dans vos achats.",
      porQueImporta:
        "Parce que l'achat est la première décision qui conditionne tout le reste. Si vous achetez mal, votre stock gonfle, votre marge se comprime et votre carte se remplit de références que personne ne demande. Corriger les achats a un effet cascade positif sur toute l'opération : meilleur stock, meilleure marge, meilleure carte.",
      queHacer: [
        "Croisez votre dernière commande avec les données de vente des 30 derniers jours. Combien de références commandées n'avaient aucune demande réelle ?",
        "Calculez quel pourcentage de votre budget d'achat va à des références à rotation faible ou nulle.",
        "Identifiez si vous avez des ruptures de stock sur les références que vos clients demandent réellement (signe que vous achetez les mauvaises choses).",
        "Vérifiez si vous réapprovisionnez par inertie (même commande chaque mois) ou par les données (en ajustant à la demande réelle).",
      ],
      errores: [
        { mistake: "Répéter la même commande chaque mois sans vérifier les ventes", consequence: "Vous accumulez ce qui ne se vend pas et manquez de ce qui se vend." },
        { mistake: "Acheter en volume pour un rabais sans demande réelle", consequence: "Le rabais de 10 % ne compense pas 6 mois de stock immobilisé." },
        { mistake: "Aucune visibilité sur le stock en cave avant de commander", consequence: "Vous doublez le stock sur des références déjà couvertes, immobilisant du capital." },
      ],
    },
    {
      id: "cuando-no-reponer",
      title: "Quand ne pas réapprovisionner une référence",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim a détecté des références à rotation faible soutenue qui continuent d'être réapprovisionnées automatiquement.", whyMatters: "Réapprovisionner par inertie est la façon la plus courante d'accumuler du stock mort. Chaque réapprovisionnement sans données, c'est de l'argent qui ne revient pas.", riskIfIgnored: "Vous financez une erreur récurrente chaque mois, achetant ce qui ne se vend pas pendant que ce qui se vend s'épuise." },
      queSignifica:
        "Ne pas réapprovisionner est une décision active, pas un oubli. Vous cessez de réapprovisionner quand les données vous disent que cette référence ne justifie plus sa place : rotation faible soutenue, marge insuffisante, cannibalisation avec une meilleure référence, ou changement du profil de votre clientèle. L'essentiel est que la décision soit consciente et documentée.",
      porQueImporta:
        "Parce que réapprovisionner par inertie est la façon la plus courante d'accumuler du stock mort. Chaque référence réapprovisionnée sans justification prive de budget une autre qui pourrait se vendre. Et chaque mois où vous réapprovisionnez un vin qui ne tourne pas, vous financez une erreur récurrente.",
      queHacer: [
        "Avant chaque commande, passez en revue les références avec rotation < 1 fois/mois. Avez-vous vraiment besoin de réapprovisionner ?",
        "Si une référence a eu 2 mois consécutifs de faible rotation, mettez-la en quarantaine : ne réapprovisionnez pas avant épuisement, puis évaluez.",
        "Si une fois épuisée, ni vous ni vos clients ne la regrettez, ne la rachetez pas.",
        "Documentez chaque décision de non-réapprovisionnement pour que l'équipe sache pourquoi et ne la recomande pas.",
      ],
      errores: [
        { mistake: "Réapprovisionner tout ce qui s'épuise sans évaluer les performances", consequence: "Vous traitez toutes les références comme égales alors qu'elles ne le sont pas." },
        { mistake: "Ne pas réapprovisionner sans prévenir l'équipe de salle", consequence: "Le serveur promet un vin qui n'existe plus et le client est déçu." },
        { mistake: "Laisser le fournisseur décider ('je vous envoie la même chose')", consequence: "Votre carte est décidée par celui qui vous vend, pas par celui qui gère votre établissement." },
      ],
    },
    {
      id: "precios-compra",
      title: "Comment lire les prix d'achat",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim a analysé vos coûts d'achat incluant transport, minimums et conditions pour calculer le coût total réel.", whyMatters: "Chaque euro de différence à l'achat est un euro direct sur votre marge. 0,80 € de plus sur 50 bouteilles/mois représentent 480 €/an perdus sur une seule référence.", riskIfIgnored: "Vous choisissez les fournisseurs sur le tarif, pas sur le coût réel. Votre marge s'érode sans que cela apparaisse dans le prix unitaire." },
      queSignifica:
        "Le prix d'achat n'est pas seulement le chiffre sur la facture. C'est ce chiffre plus le transport, les minimums de commande, les ristournes, les délais de paiement et les conditions de retour. Deux fournisseurs peuvent vous proposer le même vin au 'même prix' avec des coûts réels très différents. Bien lire un prix d'achat signifie comprendre le coût total d'acquisition, pas seulement le prix unitaire.",
      porQueImporta:
        "Parce que chaque euro de différence à l'achat est un euro direct sur votre marge. Si vous achetez 50 bouteilles par mois d'une référence et payez 0,80 € de trop, ce sont 480 € par an perdus sur une seule référence. Multipliez par 10 références mal achetées et vous approchez les 5 000 € annuels.",
      queHacer: [
        "Pour chaque référence clé, calculez le coût total : prix + transport par unité + coût du capital (paiement à 30 jours vs. 60 jours).",
        "Comparez le coût total entre fournisseurs, pas seulement le prix catalogue.",
        "Vérifiez si vos conditions de retour couvrent les pertes : un fournisseur qui accepte les retours peut être moins cher même si son prix est plus élevé.",
        "Négociez avec des données : apportez votre historique d'achats à la réunion fournisseur.",
      ],
      errores: [
        { mistake: "Comparer uniquement le prix unitaire entre fournisseurs", consequence: "Vous choisissez le moins cher sur le papier mais le plus cher en coût réel." },
        { mistake: "Ne pas réviser les prix après la première négociation", consequence: "Votre fournisseur augmente de 5 % chaque année et vous ne le remarquez que quand vous regardez les marges." },
        { mistake: "Ne pas prendre en compte le coût des minimums de commande", consequence: "Vous achetez 24 bouteilles pour obtenir le prix alors que vous n'en avez besoin que de 6." },
      ],
    },
    {
      id: "detectar-sobreprecio",
      title: "Comment détecter le surprix",
      priority: "inmediato",
      porQueTeLoMostramos: { detected: "Winerim a comparé vos prix d'achat avec les données du marché et a détecté des références où vous pourriez payer plus que nécessaire.", whyMatters: "Le surprix est invisible tant que vous ne le cherchez pas. Dans un groupe, 8 % de trop sur 20 références peut représenter des dizaines de milliers d'euros par an.", riskIfIgnored: "Vous continuez de surpayer faute de comparer. La fidélité au fournisseur ne doit pas être incompatible avec la gestion." },
      queSignifica:
        "Un surprix, c'est quand vous payez plus que ce que le marché demande pour une référence ou pour un vin de caractéristiques équivalentes. Ce n'est pas toujours la faute du fournisseur : parfois c'est parce que vous n'avez pas comparé, parce que vous achetez au même depuis des années sans négocier, ou parce que votre volume a changé et vos conditions n'ont pas été mises à jour. Détecter le surprix demande de comparer, pas de deviner.",
      porQueImporta:
        "Parce que le surprix est invisible tant que vous ne le cherchez pas. Il n'apparaît pas comme une dépense supplémentaire dans votre compte de résultat : il réduit simplement votre marge sans que vous le sachiez. Dans un groupe de restauration avec achats centralisés, un surprix de 8 % sur 20 références peut représenter des dizaines de milliers d'euros par an.",
      queHacer: [
        "Sélectionnez vos 10 références à plus fort volume et demandez des devis à au moins 2 fournisseurs alternatifs.",
        "Comparez non seulement le prix mais les conditions : délais de paiement, minimums, transport, retours.",
        "Si vous détectez une différence > 10 %, négociez avec votre fournisseur actuel en utilisant les données comme levier.",
        "Instaurez une révision des prix au minimum semestrielle. Les marchés changent et vos conditions doivent s'adapter.",
      ],
      errores: [
        { mistake: "Ne jamais comparer parce que 'mon fournisseur est de confiance'", consequence: "La confiance n'est pas incompatible avec la comparaison. Comparer, c'est gérer." },
        { mistake: "Comparer seulement une fois par an ou au début de la relation", consequence: "Les prix changent trimestriellement. Si vous ne révisez pas, vous prenez du retard." },
        { mistake: "Changer de fournisseur uniquement pour le prix sans évaluer le service", consequence: "Un fournisseur bon marché mais peu fiable vous coûte plus cher en ruptures de stock et problèmes logistiques." },
      ],
    },
    {
      id: "decidir-entre-similares",
      title: "Comment choisir entre des références similaires",
      priority: "esta semana",
      porQueTeLoMostramos: { detected: "Winerim a détecté des paires de références qui se font concurrence dans le même segment de votre carte : même type, prix similaire.", whyMatters: "Garder deux vins redondants cannibalise les ventes, divise l'attention et double le stock. Consolider libère de l'espace et améliore les conditions d'achat.", riskIfIgnored: "Les deux se vendent mal au lieu qu'un seul se vende bien. Vous perdez marge, efficacité et l'opportunité de combler un vrai manque." },
      queSignifica:
        "Quand vous avez deux vins ou plus en concurrence dans le même segment (même type, prix similaire, profil similaire), vous avez besoin d'un critère clair pour choisir lequel reste et lequel part. Ce critère doit combiner trois variables : la marge (lequel rapporte le plus), la rotation (lequel se vend le plus) et le rôle dans la carte (lequel remplit le mieux la fonction que vous devez couvrir).",
      porQueImporta:
        "Parce que garder deux références similaires cannibalise les ventes, divise l'attention du convive et double le stock nécessaire. Chaque paire de vins redondants est une opportunité manquée de combler un vrai manque dans votre carte ou de concentrer le volume pour améliorer les conditions d'achat.",
      queHacer: [
        "Identifiez les paires ou trios de références en concurrence dans le même segment (même type, ±3 € de différence).",
        "Comparez : laquelle a une meilleure marge ? Laquelle tourne le plus ? Laquelle l'équipe de salle recommande-t-elle le plus ?",
        "Décidez laquelle reste et retirez l'autre. Si vous avez du stock de celle qui part, passez-la au verre ou en promotion.",
        "Utilisez l'espace libéré pour combler un vrai manque ou pour négocier un meilleur volume sur la référence gagnante.",
      ],
      errores: [
        { mistake: "Garder les deux 'parce qu'elles se vendent toutes les deux un peu'", consequence: "Les deux se vendent mal au lieu qu'une se vende bien. Vous perdez marge et efficacité." },
        { mistake: "Décider uniquement par la marge sans regarder la rotation", consequence: "Vous gardez la plus rentable par bouteille mais que personne ne commande." },
        { mistake: "Décider selon le goût personnel du sommelier ou du chef", consequence: "Votre carte satisfait celui qui la conçoit, pas celui qui la consomme." },
      ],
    },
    {
      id: "decision-compra-integrada",
      title: "Comment combiner rotation, marge et stock dans une décision d'achat",
      priority: "este mes",
      porQueTeLoMostramos: { detected: "Winerim croise automatiquement rotation, marge et niveau de stock pour classer chaque référence dans une matrice de décision.", whyMatters: "Regarder un seul indicateur mène à des décisions partielles. Ce n'est qu'en croisant les trois que vous voyez la réalité complète de chaque référence.", riskIfIgnored: "Vous achetez ce dont vous n'avez pas besoin, réapprovisionnez ce qui ne tourne pas et manquez de ce qui se vend." },
      queSignifica:
        "La meilleure décision d'achat ne regarde pas un seul indicateur : elle en croise trois. La rotation vous dit si le vin se vend. La marge vous dit s'il vaut la peine de le vendre. Le stock vous dit si vous en avez besoin ou si vous en avez déjà assez. Quand les trois pointent dans la même direction, la décision est claire. Quand ils se contredisent, vous devez prioriser selon votre stratégie.",
      porQueImporta:
        "Parce que regarder un seul indicateur mène à des décisions partielles. Un vin avec bonne rotation mais faible marge vous fait travailler beaucoup pour peu de gain. Un avec bonne marge mais sans rotation remplit votre cave de capital immobilisé. Et acheter davantage de ce que vous avez déjà en excès, c'est jeter de l'argent. Ce n'est qu'en croisant les trois que vous voyez la réalité complète.",
      queHacer: [
        "Avant chaque commande, classez chaque référence dans une matrice 2×2 : rotation haute/basse × marge haute/basse.",
        "Rotation haute + marge haute → réapprovisionner sans hésiter, négocier le volume.",
        "Rotation haute + marge basse → repricing ou renégocier le coût avant de réapprovisionner.",
        "Rotation basse + marge haute → pousser en salle ou au verre avant de réapprovisionner.",
        "Rotation basse + marge basse → ne pas réapprovisionner. Épuiser le stock et retirer.",
        "Ajoutez la variable stock : si vous avez déjà 3 mois d'inventaire, inutile de réapprovisionner même si ça tourne bien.",
      ],
      errores: [
        { mistake: "Baser les décisions d'achat uniquement sur la rotation", consequence: "Vous réapprovisionnez le plus vendu sans vérifier s'il génère assez de marge." },
        { mistake: "Décider uniquement par la marge", consequence: "Vous achetez ce qui rapporte le plus par bouteille mais que personne ne commande." },
        { mistake: "Ne pas vérifier le stock actuel avant de commander", consequence: "Vous doublez l'inventaire sur des références dont vous aviez déjà assez." },
      ],
    },
  ],
  nextStep: {
    label: "Évaluez votre prochain achat",
    href: "/herramientas/calculadora-compra-inteligente",
    description: "Croisez rotation, marge et stock actuel pour décider si un achat a du sens avant de le passer.",
  },
};

export default comprasReposicionFR;
