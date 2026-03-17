import { Package } from "lucide-react";
import type { DeepAreaContent } from "./margenesPricing";

const stockRotacionFR: DeepAreaContent = {
  name: "Stock et rotation",
  tagline: "Détectez ce qui ne bouge pas avant qu'il ne soit trop tard",
  intro: "Cette section vous aide à identifier les vins stagnants, quantifier le capital immobilisé et prendre des décisions concrètes : pousser, passer au verre, retirer ou liquider. Ce n'est pas de la théorie d'inventaire. Il s'agit de faire en sorte que chaque bouteille en cave ait un plan.",
  icon: Package,
  accent: "text-emerald-500",
  bg: "bg-emerald-500/10",
  audiences: ["sala", "compras-fb", "direccion"],
  topErrors: [
    { error: "Garder des références lentes « parce qu'elles se vendront un jour »", porQueOcurre: "Parce que retirer un vin revient à reconnaître une erreur d'achat. Il est plus confortable d'attendre.", consecuencia: "Le capital reste immobilisé, le vin perd de la valeur avec le temps et occupe une place sur la carte qui pourrait générer des ventes réelles." },
    { error: "Ne pas quantifier le coût réel du stock mort", porQueOcurre: "Parce que le stock mort n'apparaît pas comme une charge dans le compte de résultat. Vous ne le voyez que lorsque vous le déclassez.", consecuencia: "Vous ne ressentez pas l'urgence. 20 bouteilles à 12 € de coût, c'est 240 € qui pourraient être investis dans des références qui tournent." },
    { error: "Pousser une référence sans mesurer le résultat", porQueOcurre: "Parce qu'on dit à l'équipe « recommandez-le » mais personne ne fait le suivi. Sans mesure, pas d'apprentissage.", consecuencia: "Vous ne savez pas si l'action a fonctionné. Vous répétez le cycle : pousser sans mesurer, attendre sans données, retirer trop tard." },
    { error: "Réapprovisionner automatiquement tout ce qui s'épuise", porQueOcurre: "Parce que le réapprovisionnement est en pilote automatique. La même commande part chaque semaine sans vérifier si la demande a changé.", consecuencia: "Vous financez du stock qui va rester immobile. Les commandes devraient se baser sur la rotation réelle, pas sur la liste du mois dernier." },
    { error: "Confondre « vin cher » et « stock mort »", porQueOcurre: "Parce qu'un vin à 60 € qui met du temps à se vendre ressemble à du stock mort, mais il peut jouer un rôle d'image ou de ticket élevé.", consecuencia: "Vous retirez des vins stratégiques qui remplissent une fonction et les remplacez par davantage de la même gamme moyenne déjà saturée." },
  ],
  links: [
    { label: "Calculateur de stock mort", href: "/herramientas/calculadora-stock-muerto", description: "Quantifiez le capital immobilisé dans les références sans ventes", type: "tool" },
    { label: "Checklist : Détection des vins morts", href: "/recursos/checklist-deteccion-vinos-muertos", description: "Processus étape par étape pour identifier et agir sur le stock stagnant", type: "resource" },
    { label: "Scorecard mensuel", href: "/recursos/scorecard-mensual", description: "Surveillez la santé de votre stock chaque mois avec des métriques clés", type: "resource" },
    { label: "Winerim Core", href: "/producto/winerim-core", description: "Le moteur analytique qui détecte la faible rotation automatiquement", type: "product" },
    { label: "Winerim Supply", href: "/producto/winerim-supply", description: "Reliez la rotation aux décisions d'achat et de réapprovisionnement", type: "product" },
    { label: "Blog : Comment détecter le stock mort", href: "/article/como-detectar-stock-muerto-carta-vinos", description: "Signaux d'alerte et processus pour identifier les vins sans rotation", type: "article" },
    { label: "Blog : Quels vins méritent d'être réapprovisionnés", href: "/article/que-vinos-merece-la-pena-reponer", description: "Critères pour décider ce qui reste et ce qui sort de la prochaine commande", type: "article" },
  ],
  miniCases: [
    {
      profile: "Restaurant d'hôtel avec 90 références",
      situation: "22 références n'avaient enregistré aucune vente depuis plus de 90 jours. Capital immobilisé : 3 400 €.",
      action: "A retiré 15 références de la carte. En a passé 5 au verre avec un pricing agressif. Les 2 restantes ont été retournées au fournisseur.",
      result: "A libéré 2 800 € de capital réinvestis dans 8 nouvelles références à demande validée. Le stock mort est passé de 24 % à 6 %.",
    },
    {
      profile: "Bistrot urbain avec 28 références",
      situation: "Ne regardait que les ventes hebdomadaires. N'a pas remarqué que 6 vins n'avaient pas tourné depuis 45 jours parce qu'« un s'est vendu récemment ».",
      action: "A configuré une alerte automatique dans Winerim à 30 jours sans vente. Chaque lundi, il révise la liste et décide : pousser, verre ou retirer.",
      result: "En 3 mois, est passé de 6 vins morts à 1. La rotation moyenne de la carte s'est améliorée de 18 %.",
    },
  ],
  subtopics: [
    {
      id: "stock-muerto",
      title: "Qu'est-ce que le stock mort",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim a identifié des références sur votre carte avec 0 vente depuis plus de 60 jours.",
        whyMatters: "Entre 10 % et 25 % de la carte d'un restaurant moyen est du stock mort sans le savoir. C'est du capital qui ne travaille pas.",
        riskIfIgnored: "Chaque mois qui passe, cet argent reste inactif. Ça ne s'améliore pas avec le temps : ça ne fait que s'accumuler.",
      },
      queSignifica:
        "Le stock mort est toute référence qui n'a enregistré aucune vente depuis plus de 60 jours et qui n'a pas de justification stratégique claire (réserve spéciale, vin conservé pour un événement, etc.). Ce n'est pas la même chose que du stock lent : un vin qui vend 2 bouteilles par mois est lent mais vivant. Un qui n'a pas bougé depuis 3 mois est mort. La distinction compte car l'action à prendre est différente.",
      porQueImporta:
        "Parce que chaque bouteille inactive est de l'argent qui ne travaille pas. Un restaurant moyen a entre 10 % et 25 % de sa carte en stock mort sans le savoir. Si vous avez 20 références mortes à un coût moyen de 8 €, avec 3 bouteilles en moyenne, ce sont 480 € immobilisés qui pourraient générer de la marge dans des références qui tournent.",
      queHacer: [
        "Filtrez toutes les références avec 0 vente au cours des 60 derniers jours.",
        "Séparez celles qui ont une justification stratégique (événement, réserve client) de celles qui sont simplement oubliées.",
        "Pour les oubliées, décidez maintenant : pousser en salle, verre, remise ou retrait ?",
        "Établissez une règle : toute référence sans vente en 60 jours entre automatiquement en révision.",
      ],
      errores: [
        { mistake: "Penser que « stock mort » ne signifie que des vins vieux ou détériorés", consequence: "Le stock mort le plus coûteux est généralement du vin parfaitement buvable que personne ne commande." },
        { mistake: "Ne pas distinguer stock mort et stock stratégique", consequence: "Vous retirez des vins que vous devriez garder ou gardez ceux qui devraient partir." },
        { mistake: "Attendre que le problème se résolve de lui-même", consequence: "Le vin ne s'améliore pas avec le temps dans la cave d'un restaurant. Le capital reste inactif." },
      ],
    },
    {
      id: "capital-inmovilizado",
      title: "Comment détecter le capital immobilisé",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim a calculé la valeur totale des bouteilles sans vente dans votre cave.",
        whyMatters: "C'est de l'argent réel investi qui ne génère aucun retour. Invisible dans le compte de résultat mais très réel dans votre trésorerie.",
        riskIfIgnored: "Sans action, le capital immobilisé augmente chaque mois avec chaque nouvelle commande non ajustée à la demande.",
      },
      queSignifica:
        "Le capital immobilisé est la valeur totale d'achat de toutes les bouteilles que vous avez en cave et qui ne se vendent pas. Ce n'est pas un chiffre abstrait : ce sont de vrais euros que vous avez investis et qui ne génèrent aucun retour. Pour le calculer, multipliez le coût d'achat de chaque référence sans ventes par le nombre de bouteilles en stock.",
      porQueImporta:
        "Parce que c'est de l'argent invisible. Il n'apparaît pas comme une charge dans votre compte de résultat, mais il ne génère pas non plus de revenus. C'est la manière la plus silencieuse de perdre de la rentabilité. Un groupe de restauration peut avoir des milliers d'euros immobilisés sans que personne ne le sache.",
      queHacer: [
        "Calculez la valeur totale du stock sans ventes au cours des 60 derniers jours (coût × unités).",
        "Classez du plus élevé au plus bas : les 5 premières références concentrent probablement 50 % du problème.",
        "Fixez un objectif : réduire le capital immobilisé de 30 % dans les 60 prochains jours.",
        "Établissez un indicateur mensuel : capital immobilisé en % du stock total.",
      ],
      errores: [
        { mistake: "Ne jamais calculer le capital immobilisé", consequence: "Vous ne savez pas combien d'argent vous avez qui dort. On ne peut pas améliorer ce qu'on ne mesure pas." },
        { mistake: "Compter uniquement les unités, pas la valeur en euros", consequence: "20 bouteilles à 3 € ne sont pas la même chose que 20 bouteilles à 25 €. L'impact est radicalement différent." },
        { mistake: "Vérifier le stock total sans séparer ce qui tourne de ce qui ne tourne pas", consequence: "Votre inventaire semble raisonnable, mais à l'intérieur il y a une couche de capital mort que vous ne voyez pas." },
      ],
    },
    {
      id: "cuando-impulsar",
      title: "Quand pousser une référence",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim a trouvé des vins avec une bonne marge et une bonne évaluation mais une faible rotation : ils ne se vendent pas, mais ils pourraient.",
        whyMatters: "Beaucoup de vins ne se vendent pas par manque de visibilité, pas de qualité. Une poussée de 7-14 jours peut les réactiver.",
        riskIfIgnored: "Vous retirez des vins potentiellement rentables sans leur avoir donné une vraie chance de vente.",
      },
      queSignifica:
        "Pousser signifie donner une seconde chance active à un vin qui ne se vend pas mais qui a du potentiel. Ce n'est pas attendre : c'est mettre l'équipe de salle à travailler avec cette référence pendant une période définie (7-14 jours) et mesurer si elle répond. Si le vin est bon, bien positionné et que le client ne le connaît simplement pas, une poussée en salle peut le réactiver.",
      porQueImporta:
        "Parce que beaucoup de vins ne se vendent pas par manque de visibilité, pas de qualité. Si l'équipe de salle ne le connaît pas, elle ne le recommande pas. Si elle ne le recommande pas, il ne se vend pas. Et s'il ne se vend pas, vous le retirez sans savoir s'il avait vraiment une demande.",
      queHacer: [
        "Sélectionnez 2-3 références avec une faible rotation mais une bonne marge et un bon rapport qualité-prix.",
        "Formez l'équipe de salle : faites-leur goûter, qu'ils sachent le décrire et aient un argument de vente clair.",
        "Définissez une période de poussée (7-14 jours) et un objectif minimum de ventes.",
        "Si à la fin de la période ça n'a pas répondu, passez au niveau suivant : verre ou retrait.",
      ],
      errores: [
        { mistake: "Pousser tout en même temps", consequence: "L'équipe ne peut pas recommander 10 nouveaux vins simultanément. Concentrez-vous." },
        { mistake: "Pousser sans former l'équipe", consequence: "Si le serveur ne sait pas quoi dire, la poussée ne fonctionne pas." },
        { mistake: "Ne pas fixer de date limite pour la poussée", consequence: "Sans deadline, la « poussée » devient un espoir éternel." },
      ],
    },
    {
      id: "cuando-sacar-por-copa",
      title: "Quand passer au verre",
      priority: "esta semana",
      porQueTeLoMostramos: {
        detected: "Winerim a trouvé des références lentes qui pourraient fonctionner au verre pour accélérer la rotation.",
        whyMatters: "Le verre abaisse la barrière d'entrée du client et vous permet de récupérer du capital en jours plutôt qu'en mois.",
        riskIfIgnored: "Le stock reste inactif jusqu'à ce qu'il se détériore ou que vous le liquidiez à perte.",
      },
      queSignifica:
        "Passer une référence lente au verre est une stratégie de sauvetage : au lieu d'attendre que quelqu'un commande la bouteille, vous la proposez au verre pour accélérer la rotation et récupérer au moins une partie de l'investissement. Ça fonctionne bien avec des vins qui sont bons mais que le client n'ose pas commander en bouteille (prix élevé, cépage méconnu, région peu familière).",
      porQueImporta:
        "Parce que le verre abaisse la barrière d'entrée du client. Un vin que personne ne commande en bouteille à 35 € peut facilement se vendre à 8 € le verre. De plus, le verre vous permet de récupérer du capital en jours plutôt qu'en mois. Mais cela ne fonctionne que si le vin a une rotation suffisante au verre pour finir la bouteille avant qu'elle ne s'oxyde.",
      queHacer: [
        "Évaluez si le vin tient 24-48 h une fois ouvert sans perdre en qualité (sinon, écartez-le du verre).",
        "Calculez le prix au verre en incluant la casse réelle (minimum 20-25 % de perte sur la bouteille).",
        "Communiquez à l'équipe de salle que c'est une référence prioritaire à recommander au verre.",
        "Si en 2 semaines vous n'avez pas vendu au moins 2-3 verres par semaine, retirez-la et libérez l'espace.",
      ],
      errores: [
        { mistake: "Mettre au verre un vin qui ne tient pas une fois ouvert", consequence: "Vous servez un vin oxydé, perdez la confiance du client et gaspillez la bouteille." },
        { mistake: "Ne pas ajuster le prix au verre pour couvrir la casse", consequence: "Vous vendez au verre mais perdez de l'argent car la bouteille ne se finit jamais." },
        { mistake: "Garder trop de verres actifs de vins lents", consequence: "Vous ouvrez 8 bouteilles, vendez 2 verres de chacune et jetez le reste." },
      ],
    },
    {
      id: "cuando-retirar",
      title: "Quand retirer une référence",
      priority: "inmediato",
      porQueTeLoMostramos: {
        detected: "Winerim a identifié des références qui n'ont répondu ni à la poussée ni au verre : candidates évidentes au retrait.",
        whyMatters: "Chaque référence sans justification prend de l'espace physique et mental à une autre qui pourrait réellement vendre.",
        riskIfIgnored: "Vous maintenez du stock mort indéfiniment, accumulant capital inactif et complexité sans retour.",
      },
      queSignifica:
        "Retirer est la dernière option, mais parfois la meilleure. Un vin doit quitter la carte quand : il est passé par la poussée et le verre sans résultat, sa marge ne justifie pas l'effort, ou il ne correspond tout simplement plus à votre concept. Retirer n'est pas un échec : c'est de la gestion. Le pire que vous puissiez faire est de garder une référence qui occupe de l'espace sans rien générer.",
      porQueImporta:
        "Parce que chaque référence que vous gardez sans justification prend de la place (physique et mentale) à une autre qui pourrait vendre. Votre carte a un nombre optimal de références, et le dépasser dilue l'attention du client, complique l'exploitation et augmente le coût de gestion.",
      queHacer: [
        "Si une référence n'a pas répondu à la poussée ni au verre en 30 jours, retirez-la.",
        "Décidez quoi faire du stock restant : liquider, retourner au fournisseur ou consommation interne.",
        "Mettez à jour la carte et informez l'équipe que la référence n'est plus disponible.",
        "Documentez la décision pour ne pas la racheter à l'avenir.",
      ],
      errores: [
        { mistake: "La garder « au cas où quelqu'un la demanderait »", consequence: "Personne ne va la demander. En attendant, elle occupe de l'espace et du capital." },
        { mistake: "Retirer sans documenter la raison", consequence: "Le prochain sommelier ou acheteur risque de la racheter." },
        { mistake: "Ne pas avoir de processus de retrait clair", consequence: "Les décisions sont repoussées indéfiniment et le stock mort s'accumule." },
      ],
    },
    {
      id: "evolucion-stock",
      title: "Comment lire l'évolution du stock",
      priority: "este mes",
      porQueTeLoMostramos: {
        detected: "Winerim surveille la tendance de votre stock mois après mois : capital immobilisé, références sans ventes et faible rotation.",
        whyMatters: "Ce qui compte n'est pas la photo d'aujourd'hui mais si la tendance s'améliore ou se dégrade.",
        riskIfIgnored: "Un stock qui se dégrade chaque mois devient une crise. Si vous ne regardez pas la tendance, vous ne réagissez que lorsqu'il est trop tard.",
      },
      queSignifica:
        "L'évolution du stock n'est pas une photo : c'est une tendance. Ce qui compte n'est pas combien de stock vous avez aujourd'hui, mais comment il a évolué par rapport au mois dernier. Le capital immobilisé a-t-il augmenté ? De nouvelles références sans ventes sont-elles apparues ? Le pourcentage de la carte à faible rotation s'améliore-t-il ou se dégrade-t-il ? Lire l'évolution vous permet d'anticiper les problèmes avant qu'ils ne deviennent des crises.",
      porQueImporta:
        "Parce qu'un stock qui se dégrade chaque mois est le signe que quelque chose ne fonctionne pas dans votre processus d'achat, votre carte ou votre équipe de salle. Si vous ne regardez pas la tendance, vous ne réagissez que lorsque le problème est déjà important. Si vous la regardez, vous pouvez corriger le cap avant que le capital immobilisé ne s'envole.",
      queHacer: [
        "Comparez 3 indicateurs chaque mois : capital immobilisé total, nombre de références sans ventes en 60 jours et % de la carte avec rotation < 1/mois.",
        "Si l'un des trois augmente par rapport au mois précédent, investiguer la cause avant qu'elle ne s'accumule.",
        "Corrélez l'évolution du stock avec vos décisions d'achat : achetez-vous plus que vous ne vendez ?",
        "Fixez un objectif trimestriel d'amélioration et révisez-le avec votre équipe chaque mois.",
      ],
      errores: [
        { mistake: "Ne regarder que le stock total sans le décomposer par rotation", consequence: "Votre inventaire peut sembler stable tandis que le stock mort grandit à l'intérieur." },
        { mistake: "Ne vérifier le stock que lorsqu'il y a un problème visible", consequence: "Quand vous le voyez, vous avez déjà perdu des mois de capital immobilisé." },
        { mistake: "Ne pas relier l'évolution du stock aux décisions d'achat", consequence: "Vous continuez à acheter ce qui ne se vend pas parce que personne ne croise les données." },
      ],
    },
  ],
  nextStep: {
    label: "Détecter le stock mort avec le calculateur",
    href: "/herramientas/calculadora-stock-muerto",
    description: "Quantifiez le capital immobilisé dans les références sans ventes et décidez quoi retirer en premier.",
  },
};

export default stockRotacionFR;
