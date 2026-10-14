<<<<<<< Updated upstream
import PortfolioProfile from "@/components/portfolio/PortfolioProfile";
import { categories, portfolioItems } from "@/data/portfolioItems";
=======
import PortfolioGrid from "../../components/portfolio/PortfolioGrid";
import PortfolioStyles from "../../components/portfolio/PortfolioStyles";

// Enhanced portfolio items with importance representing layout size:
// 4: 2x2 grid (takes 4 spaces)
// 3: 2x1 grid (takes 2 spaces horizontally)
// 2: 1x2 grid (takes 2 spaces vertically) - NO LONGER USED
// 1: 1x1 grid (takes 1 space)
const portfolioItems = [
  {
    id: 3,
    title: "Reservation de bureaux CCI",
    description:
      "Application professionnelle de reservation de bureaux developpee pour la Chambre de Commerce et d'Industrie France en Republique Tcheque. Integree directement dans Microsoft Teams sous forme d'onglet, elle permet aux employes de visualiser en temps reel la disponibilite des espaces de travail (bureaux individuels, salles de reunion, espaces partages), de reserver un creneau en quelques clics et de gerer leurs reservations existantes. Un panneau d'administration permet aux gestionnaires de configurer les espaces, de definir les regles de reservation et de consulter les statistiques d'occupation.",
    image: "/images/projets/Application-teams/icon.png",
    images: [
      "/images/projets/Application-teams/accueillereservbureau.png",
      "/images/projets/Application-teams/menuereservation.png",
      "/images/projets/Application-teams/reservationsalle.png",
    ],
    importance: 4,
    technologies: ["React.js", "CSS", "HTML", "Microsoft Teams"],
    client: "CCI France en Republique Tcheque",
    year: "2024",
    link: null,
    linkLabel: "Voir sur GitHub",
  },
  {
    id: 5,
    title: "Conge Chartrettes",
    description:
      "Projet complet mele hardware et software pour la mairie de Chartrettes. L'application web Next.js permet aux agents municipaux de poser leurs conges, de consulter leur solde et de visualiser le planning de l'equipe. Les responsables valident ou refusent les demandes depuis un back-office dedie. En parallele, un dispositif physique base sur un microcontroleur ESP32 programme en C++ permet le badgeage quotidien des agents. Le boitier de badgeage a ete entierement concu en 3D sur Fusion 360 puis imprime. Les donnees du badge sont synchronisees avec l'application web pour un suivi en temps reel des presences.",
    image: "/images/projets/conge-chartrettes/icon.png",
    images: [
      "/images/projets/conge-chartrettes/accueil-reservationmairie.png",
      "/images/projets/conge-chartrettes/image-mon-compte.png",
      "/images/projets/conge-chartrettes/imagemesreservation.png",
    ],
    importance: 4,
    technologies: ["Next.js", "TailwindCSS", "C++", "ESP32", "Fusion 360"],
    client: "Mairie de Chartrettes",
    year: "2024",
    link: null,
    linkLabel: "Voir sur GitHub",
  },
  {
    id: 10,
    title: "Pizzeria Chartrettes",
    description:
      "Site vitrine professionnel realise pour la pizzeria de Chartrettes, conçu pour attirer de nouveaux clients via le referencement local. Le site presente l'ensemble du menu avec les prix, les ingredients et les photos des plats, ainsi que les horaires d'ouverture, l'adresse avec integration Google Maps et un numero de telephone en click-to-call. Un formulaire de commande en ligne permet aux clients de passer commande pour la livraison ou le retrait sur place. L'optimisation SEO cible les recherches locales (pizzeria Chartrettes, pizza livraison 77) pour maximiser la visibilite sur Google.",
    image: "/images/projets/pizzeria/icon.png",
    images: [
      "/images/projets/pizzeria/accueil pizzeria.png",
      "/images/projets/pizzeria/infopizza.png",
      "/images/projets/pizzeria/menue-pizza.png",
    ],
    importance: 4,
    technologies: ["HTML", "CSS", "JavaScript", "SEO"],
    client: "Pizzeria de Chartrettes",
    year: "2023",
    link: "https://ladolcevita-pizza.fr/",
    linkLabel: "Visiter le site",
  },
  {
    id: 11,
    title: "Reservation Salles Chartrettes",
    description:
      "Application web de reservation de salles municipales developpee pour la mairie de Chartrettes. Les habitants peuvent consulter les salles disponibles (salle des fetes, salle de reunion, gymnase), visualiser les creneaux libres sur un calendrier interactif et soumettre une demande de reservation en ligne. Cote administration, le personnel municipal dispose d'un tableau de bord pour valider ou refuser les demandes, gerer les tarifs et consulter l'historique des reservations. Le systeme envoie des notifications automatiques a chaque etape du processus.",
    image: "/images/projets/reservation-chartrettes/icon.png",
    images: [
      "/images/projets/reservation-chartrettes/ecran-acueille.png",
      "/images/projets/reservation-chartrettes/ecrancalendrier.png",
      "/images/projets/reservation-chartrettes/selectionbatiment.png",
      "/images/projets/reservation-chartrettes/selectionsalle.png",
    ],
    importance: 3,
    technologies: ["Next.js", "TailwindCSS"],
    client: "Mairie de Chartrettes",
    year: "2024",
    link: null,
    linkLabel: "Voir sur GitHub",
  },
];
>>>>>>> Stashed changes

export default function Portfolio() {
  return <PortfolioProfile items={portfolioItems} categories={categories} />;
}
