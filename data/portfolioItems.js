// Source unique des projets du portfolio.
// Les visuels sont générés par scripts/generate-portfolio-images.py
// dans public/images/portfolio/<slug>/ (cover.webp, 01.webp…, og.jpg).

export const categories = [
  { id: "all", label: "Tout" },
  { id: "web", label: "Sites web" },
  { id: "apps", label: "Applications" },
  { id: "ia", label: "IA" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "creatif", label: "Créatif" },
];

const visuals = (slug, slides) => ({
  cover: `/images/portfolio/${slug}/cover.webp`,
  og: `/images/portfolio/${slug}/og.jpg`,
  gallery: Array.from(
    { length: slides },
    (_, i) => `/images/portfolio/${slug}/${String(i + 1).padStart(2, "0")}.webp`
  ),
});

const projects = [
  {
    id: 1,
    slug: "murder-party",
    title: "Murder Party App",
    categories: ["apps"],
    client: "Projet personnel",
    year: "2024",
    accent: "#d4a73a",
    excerpt: "Une enquête grandeur nature, orchestrée depuis le navigateur.",
    description:
      "Application web interactive conçue pour organiser et animer des murder parties entre amis. L'hôte crée un scénario complet avec personnages, indices cachés et rebondissements. Chaque participant reçoit son rôle, ses objectifs secrets et ses informations via une interface dédiée. Le jeu se déroule en temps réel avec un système de phases (enquête, accusation, révélation) et une distribution automatique des indices au bon moment.",
    challenge:
      "Concevoir une expérience de jeu fluide et immersive en temps réel, avec gestion des rôles, des indices et du déroulement du scénario pour plusieurs joueurs simultanément.",
    solution:
      "Application Next.js avec gestion d'état en temps réel, interfaces thématiques pour chaque rôle et moteur de scénario flexible.",
    results:
      "Des murder parties de 4 à 12 joueurs, avec une ambiance visuelle sombre et immersive fidèle à l'univers du jeu.",
    technologies: ["Next.js", "TailwindCSS"],
    link: "https://app-halloween-nf61.vercel.app",
    linkLabel: "Visiter le site",
    ...visuals("murder-party", 4),
  },
  {
    id: 2,
    slug: "rackoon-streaming",
    title: "Rackoon Streaming",
    categories: ["apps"],
    client: "Projet personnel",
    year: "2024",
    accent: "#d946ef",
    excerpt: "Une plateforme de streaming pensée comme les grands, en plus malin.",
    description:
      "Plateforme de streaming vidéo pensée comme une alternative moderne aux services existants. Catalogue organisé par catégories, genres et popularité, moteur de recherche avancé, filtres personnalisables, lecteur intégré avec qualité adaptative, recommandations, favoris et historique de visionnage pour chaque utilisateur.",
    challenge:
      "Créer une interface de streaming intuitive et performante, avec une navigation fluide entre les contenus et un lecteur vidéo optimisé.",
    solution:
      "Architecture React.js modulaire, composants réutilisables, lecteur vidéo sur mesure et interface responsive pour tous les écrans.",
    results:
      "Une plateforme complète — catalogue, recherche, filtres et lecture fluide — sur desktop comme sur mobile.",
    technologies: ["React.js", "TailwindCSS"],
    link: null,
    linkLabel: null,
    ...visuals("rackoon-streaming", 1),
  },
  {
    id: 3,
    slug: "cci-reservation-bureaux",
    title: "Réservation de bureaux CCI",
    categories: ["apps"],
    client: "CCI France en République tchèque",
    year: "2024",
    pinned: true,
    accent: "#6d5dfc",
    excerpt: "Réserver son bureau sans quitter Microsoft Teams.",
    description:
      "Application professionnelle de réservation de bureaux développée pour la Chambre de Commerce et d'Industrie France en République tchèque. Intégrée directement dans Microsoft Teams sous forme d'onglet, elle permet aux employés de visualiser en temps réel la disponibilité des espaces (bureaux, salles de réunion, espaces partagés), de réserver un créneau en quelques clics et de gérer leurs réservations. Un panneau d'administration permet de configurer les espaces et de suivre l'occupation.",
    challenge:
      "Intégrer un système de réservation complet dans l'écosystème Microsoft Teams tout en synchronisant les disponibilités en temps réel.",
    solution:
      "Application React.js déployée comme onglet Teams, avec une API de synchronisation des disponibilités et un plan d'étage interactif.",
    results:
      "Un outil utilisé au quotidien par les équipes de la CCI, qui a nettement simplifié la gestion des espaces de travail.",
    technologies: ["React.js", "Microsoft Teams", "HTML", "CSS"],
    link: null,
    linkLabel: null,
    ...visuals("cci-reservation-bureaux", 3),
  },
  {
    id: 4,
    slug: "lingua-gem",
    title: "Apprentissage de langues IA",
    categories: ["apps", "ia"],
    client: "Projet personnel",
    year: "2024",
    accent: "#4f46e5",
    excerpt: "Un tuteur de langues propulsé par Gemini, qui s'adapte à vous.",
    description:
      "Application d'apprentissage des langues propulsée par l'IA Gemini de Google. L'outil évalue le niveau de l'utilisateur puis génère des exercices sur mesure : traduction, grammaire, vocabulaire, expression écrite. Chaque réponse est corrigée en temps réel avec des explications détaillées, et la difficulté s'adapte progressivement aux points faibles identifiés.",
    challenge:
      "Exploiter l'API Gemini pour générer des exercices pertinents et personnalisés, avec une correction intelligente et un suivi de progression.",
    solution:
      "Intégration de Gemini dans une application Next.js avec des prompts optimisés pour générer les exercices et détailler les corrections.",
    results:
      "Génération d'exercices par IA, correction automatique et adaptation du niveau en temps réel, en plusieurs langues.",
    technologies: ["Next.js", "API Gemini", "TailwindCSS"],
    link: "https://lingua-gem.vercel.app/",
    linkLabel: "Visiter le site",
    ...visuals("lingua-gem", 3),
  },
  {
    id: 5,
    slug: "conges-chartrettes",
    title: "Congés Chartrettes",
    categories: ["apps"],
    client: "Mairie de Chartrettes",
    year: "2024",
    pinned: true,
    accent: "#2563eb",
    excerpt: "Application de congés + badgeuse IoT conçue de A à Z pour une mairie.",
    description:
      "Projet complet mêlant hardware et software pour la mairie de Chartrettes. L'application web Next.js permet aux agents de poser leurs congés, de consulter leur solde et de visualiser le planning de l'équipe ; les responsables valident les demandes depuis un back-office dédié. En parallèle, une badgeuse basée sur un ESP32 programmé en C++ — boîtier modélisé sur Fusion 360 puis imprimé en 3D — synchronise les présences avec l'application.",
    challenge:
      "Digitaliser la gestion des congés d'une collectivité avec un système hybride web + IoT, fiable et simple à utiliser.",
    solution:
      "Application Next.js pour la partie web, ESP32 programmé en C++ pour le badgeage et boîtier conçu sur Fusion 360 pour l'installation physique.",
    results:
      "Un système opérationnel utilisé par les agents de la mairie, avec un suivi en temps réel des présences et des congés.",
    technologies: ["Next.js", "TailwindCSS", "C++", "ESP32", "Fusion 360"],
    link: null,
    linkLabel: null,
    ...visuals("conges-chartrettes", 3),
  },
  {
    id: 6,
    slug: "pokemon-battle-detector",
    title: "PokémonBattleDetector",
    categories: ["ia"],
    client: "Projet personnel",
    year: "2023",
    accent: "#06b6d4",
    excerpt: "Une extension Twitch qui repère les combats Pokémon en direct.",
    description:
      "Extension Twitch qui utilise la vision par ordinateur pour analyser le flux d'un stream en direct et détecter automatiquement le début d'un combat Pokémon. Les informations visibles (Pokémon en jeu, barres de vie) sont alors affichées aux spectateurs via un overlay intégré au stream. Backend Python pour l'analyse d'images, frontend HTML/CSS/JS pour l'extension.",
    challenge:
      "Détecter en temps réel les séquences de combat dans un flux vidéo Twitch et afficher les informations utiles aux spectateurs.",
    solution:
      "Algorithme de détection d'image en Python couplé à une extension Twitch qui affiche les résultats en overlay.",
    results:
      "Une extension capable de reconnaître les écrans de combat de plusieurs générations de jeux, en direct.",
    technologies: ["Python", "Extension Twitch", "HTML", "CSS", "JS"],
    link: null,
    linkLabel: null,
    ...visuals("pokemon-battle-detector", 1),
  },
  {
    id: 7,
    slug: "ia-detection-objets",
    title: "IA Détection d'objets",
    categories: ["ia"],
    client: "Projet personnel",
    year: "2023",
    accent: "#22d3ee",
    excerpt: "Plus de 80 catégories d'objets reconnues en temps réel à la webcam.",
    description:
      "Programme d'intelligence artificielle qui détecte et identifie des objets en temps réel dans un flux vidéo. Le système s'appuie sur YOLOv3 et OpenCV pour traiter les images d'une webcam ou d'un fichier vidéo, reconnaît plus de 80 catégories (personnes, véhicules, animaux, objets du quotidien) et les encadre à l'écran avec leur label et leur score de confiance.",
    challenge:
      "Détecter plusieurs catégories d'objets simultanément, en temps réel, avec une précision suffisante sur du matériel grand public.",
    solution:
      "Modèle pré-entraîné YOLOv3 et traitement vidéo OpenCV optimisés pour tourner en direct.",
    results:
      "Plus de 80 catégories d'objets identifiées en temps réel avec un framerate confortable.",
    technologies: ["Python", "YOLOv3", "OpenCV"],
    link: null,
    linkLabel: null,
    ...visuals("ia-detection-objets", 3),
  },
  {
    id: 8,
    slug: "ia-langue-des-signes",
    title: "IA Langue des signes",
    categories: ["ia"],
    client: "Projet personnel",
    year: "2023",
    accent: "#ec4899",
    excerpt: "Traduire la langue des signes en texte, lettre après lettre.",
    description:
      "Application d'accessibilité qui reconnaît la langue des signes en temps réel. Le système capte le flux de la webcam, détecte les mains grâce à un modèle YOLO entraîné sur un dataset dédié, puis traduit chaque signe en lettre affichée à l'écran. Objectif : faciliter la communication entre personnes sourdes ou malentendantes et celles qui ne pratiquent pas la langue des signes.",
    challenge:
      "Reconnaître les gestes en temps réel avec une précision suffisante pour permettre une communication fluide.",
    solution:
      "Entraînement d'un modèle YOLO personnalisé sur un dataset de gestes, couplé à OpenCV pour le traitement vidéo.",
    results:
      "Reconnaissance des lettres et gestes courants en temps réel via webcam, avec un mode d'écriture de texte.",
    technologies: ["Python", "YOLO", "OpenCV"],
    link: null,
    linkLabel: null,
    ...visuals("ia-langue-des-signes", 2),
  },
  {
    id: 9,
    slug: "mousequetaire-shop",
    title: "MousequetaireShop",
    categories: ["ecommerce"],
    client: "Projet personnel",
    year: "2023",
    accent: "#38bdf8",
    excerpt: "Une boutique en ligne complète, du catalogue au back-office.",
    description:
      "Boutique e-commerce construite sur PrestaShop avec des modules personnalisés en Laravel/PHP. Catalogue riche avec fiches détaillées et variantes, filtres et recherche, panier intuitif et tunnel de paiement sécurisé. Le back-office permet de gérer produits, stocks, commandes et clients, avec codes promo, avis clients et suivi de livraison.",
    challenge:
      "Créer une boutique complète et performante en combinant Laravel et les fonctionnalités e-commerce de PrestaShop.",
    solution:
      "Architecture hybride : PrestaShop pour le catalogue et le panier, modules Laravel/PHP sur mesure pour les besoins spécifiques.",
    results:
      "Catalogue, panier, paiement sécurisé et tableau de bord d'administration complet.",
    technologies: ["Laravel", "PrestaShop", "PHP"],
    link: null,
    linkLabel: null,
    ...visuals("mousequetaire-shop", 3),
  },
  {
    id: 10,
    slug: "pizzeria-dolce-vita",
    title: "Pizzeria La Dolce Vita",
    categories: ["web"],
    client: "Pizzeria de Chartrettes",
    year: "2023",
    pinned: true,
    accent: "#dc2626",
    excerpt: "Un site vitrine gourmand, pensé pour le référencement local.",
    description:
      "Site vitrine réalisé pour la pizzeria de Chartrettes, conçu pour attirer de nouveaux clients grâce au référencement local. Menu complet avec prix et photos, horaires, adresse avec Google Maps et numéro en click-to-call. Le référencement cible les recherches locales (pizzeria Chartrettes, pizza livraison 77) et le design est pensé d'abord pour le smartphone.",
    challenge:
      "Créer un site attractif et bien référencé localement pour augmenter la visibilité de la pizzeria et faciliter les commandes.",
    solution:
      "Site responsive optimisé SEO local, intégration Google Maps, menu interactif et appel en un clic.",
    results:
      "Une visibilité en ligne nettement améliorée et un bon positionnement sur les recherches locales.",
    technologies: ["HTML", "CSS", "JavaScript", "SEO"],
    link: "https://ladolcevita-pizza.fr/",
    linkLabel: "Visiter le site",
    ...visuals("pizzeria-dolce-vita", 3),
  },
  {
    id: 11,
    slug: "reservation-salles-chartrettes",
    title: "Réservation de salles Chartrettes",
    categories: ["apps"],
    client: "Mairie de Chartrettes",
    year: "2024",
    accent: "#3b82f6",
    excerpt: "Les salles municipales, les conventions et les paiements au même endroit.",
    description:
      "Plateforme de réservation des salles municipales de Chartrettes (mairie, complexe sportif, espace culturel, vergers), utilisée par les associations et les habitants. Chacun choisit un bâtiment, une salle et un créneau sur un calendrier hebdomadaire, suit l'état de ses demandes et retrouve ses documents. Les associations signent leur convention annuelle en ligne et réservent leurs créneaux récurrents pour toute l'année, avec détection automatique des conflits. Côté mairie, un back-office complet gère les associations, les bâtiments et les salles, les grilles tarifaires, le règlement intérieur, les modèles de conventions, la validation des demandes, les paiements et les statistiques d'occupation.",
    challenge:
      "Remplacer un processus papier (formulaires, conventions, suivi des paiements) par un outil que les associations adoptent vraiment, tout en donnant à la mairie une vision claire de l'occupation de ses salles.",
    solution:
      "Application Next.js avec connexion par e-mail ou Google (NextAuth), vérification des comptes, base Drizzle/libSQL, calcul automatique des tarifs, conventions et règlement générés en PDF, guide d'utilisation intégré, export des données personnelles (RGPD) et tableau de bord d'administration.",
    results:
      "Un service en ligne sur chartrettes-reservation-salle.com : demandes, validations, conventions et paiements sont centralisés et mis à jour en temps réel.",
    technologies: ["Next.js", "NextAuth", "Drizzle ORM", "libSQL", "jsPDF", "TailwindCSS"],
    link: "https://chartrettes-reservation-salle.com/",
    linkLabel: "Visiter le site",
    ...visuals("reservation-salles-chartrettes", 5),
  },
  {
    id: 12,
    slug: "yodea",
    title: "Yodéa — Maison d'édition",
    categories: ["web"],
    client: "Éditions Yodéa",
    year: "2023",
    accent: "#f97316",
    excerpt: "Un catalogue d'ouvrages mis en valeur avec soin et sobriété.",
    description:
      "Site vitrine conçu pour la maison d'édition Yodéa. Le catalogue complet des ouvrages est mis en valeur, avec pour chaque livre une fiche détaillée (résumé, auteur, prix). Romans, bandes dessinées, livres jeunesse et méthodes d'hébreu sont organisés par collection, avec un design soigné, sobre et centré sur le contenu.",
    challenge:
      "Refléter l'élégance d'une maison d'édition tout en rendant son catalogue facile à explorer.",
    solution:
      "Design épuré, typographie soignée et navigation par collections pour le catalogue et les fiches ouvrages.",
    results:
      "Une présence en ligne renforcée qui facilite la découverte du catalogue par les lecteurs et les libraires.",
    technologies: ["HTML", "CSS", "JavaScript"],
    link: "https://yodea.com/",
    linkLabel: "Visiter le site",
    ...visuals("yodea", 4),
  },
  {
    id: 13,
    slug: "vektroid",
    title: "Expérience Vektroid",
    categories: ["creatif", "web"],
    client: "Projet artistique",
    year: "2023",
    accent: "#ff3cac",
    excerpt: "Une plongée 3D vaporwave, entre art numérique et musique.",
    description:
      "Expérience web artistique et immersive inspirée de l'esthétique vaporwave de Vektroid. Grâce à Three.js, le site propose une navigation libre dans un univers 3D peuplé de formes géométriques, de textures rétro et d'effets visuels réactifs, accompagnée d'une ambiance sonore interactive.",
    challenge:
      "Créer une expérience 3D immersive et performante qui capture une esthétique unique tout en restant accessible sur différents navigateurs.",
    solution:
      "Rendu 3D temps réel avec Three.js, shaders personnalisés, animations procédurales et interactions intuitives.",
    results:
      "Un univers 3D navigable, des effets visuels réactifs et une ambiance sonore interactive.",
    technologies: ["Three.js", "HTML", "CSS"],
    link: "https://projet-vektroide.vercel.app/",
    linkLabel: "Visiter le site",
    ...visuals("vektroid", 3),
  },
  {
    id: 16,
    slug: "liying-xie",
    title: "Liying Xie — Artiste contemporaine",
    categories: ["web", "creatif"],
    client: "Liying Xie",
    year: "2026",
    accent: "#c0392b",
    excerpt: "Un site-galerie trilingue pour une artiste franco-chinoise, avec son propre CMS.",
    description:
      "Site vitrine de Liying Xie, artiste contemporaine franco-chinoise née à Shanghai et installée dans la région de Fontainebleau. Le site présente son travail par médium (dessin sur papier, dessin sur tissu, gravure sur céramique, peinture, sculpture, installations), sa biographie, une frise chronologique de ses expositions personnelles et collectives, la presse, ses ateliers et un formulaire de contact. Tout le contenu existe en français, en anglais et en chinois, avec un sélecteur de langue.",
    challenge:
      "Mettre en valeur des œuvres très matérielles (sculptures, installations, dessins à l'encre) avec une mise en page sobre, et permettre à l'artiste de tout mettre à jour elle-même, dans trois langues.",
    solution:
      "Site sur mesure piloté par un fichier de contenu, avec un mini-CMS maison : une page d'administration protégée pour modifier chaque texte en FR / EN / 中文, ajouter des œuvres, des expositions ou des articles de presse et téléverser des images, redimensionnées et optimisées automatiquement. Le formulaire de contact envoie les messages par e-mail.",
    results:
      "Une galerie en ligne sobre et élégante, que l'artiste met à jour en autonomie au fil de ses expositions.",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "Sharp", "Nodemailer"],
    link: "https://liying-xie.com/",
    linkLabel: "Visiter le site",
    ...visuals("liying-xie", 5),
  },
  {
    id: 17,
    slug: "fleurs-de-lysandre",
    title: "Les Fleurs de Lysandre",
    categories: ["web"],
    client: "Les Fleurs de Lysandre",
    year: "2026",
    accent: "#d4af37",
    excerpt: "Le site d'une fleuriste artisanale, aussi délicat que ses bouquets.",
    description:
      "Site de la boutique Les Fleurs de Lysandre, fleuriste artisanale à Chartrettes depuis 2009, tenue par Marie-Neige Vilain, médaillée d'Excellence Artisanale. Le site raconte l'histoire de la boutique et de son atelier, présente les prestations (bouquets sur mesure, mariages et événementiel, compositions de deuil) avec des galeries photo, et donne toutes les infos pratiques : adresse, horaires, accès et plan. Un formulaire de demande de devis permet de préparer un événement en ligne.",
    challenge:
      "Traduire l'univers raffiné et végétal d'une artisane fleuriste sur le web, tout en restant simple pour la clientèle locale qui cherche surtout un horaire, une adresse ou un devis.",
    solution:
      "Site Next.js à l'ambiance vert profond et doré, défilement fluide (Lenis) et animations d'apparition (GSAP, Motion), pages dédiées par prestation, formulaire de devis envoyé par e-mail et espace d'administration pour mettre à jour textes et photos.",
    results:
      "Une vitrine à l'image de la boutique, avec un parcours clair vers la demande de devis pour les mariages et les événements.",
    technologies: ["Next.js", "React", "TailwindCSS", "GSAP", "Motion", "Lenis", "Nodemailer"],
    link: "https://les-fleurs-de-lysandre.com/",
    linkLabel: "Visiter le site",
    ...visuals("fleurs-de-lysandre", 5),
  },
  {
    id: 18,
    slug: "ariane-thomas-psychomotricienne",
    title: "L'Instant Psychomot'",
    categories: ["web"],
    client: "Ariane Thomas, psychomotricienne",
    year: "2026",
    accent: "#22c55e",
    excerpt: "Un site chaleureux et rassurant pour un cabinet de psychomotricité.",
    description:
      "Site du cabinet L'Instant Psychomot' d'Ariane Thomas, psychomotricienne diplômée d'État à Fontainebleau, qui accompagne les enfants dans le développement de leurs compétences motrices, émotionnelles et relationnelles. Le site présente son parcours et ses formations, explique la psychomotricité et le déroulé d'un suivi, affiche les tarifs en toute transparence et met en avant les ateliers PEHP (guidance parentale méthode Barkley) avec inscription. Les parents trouvent en un coup d'œil l'adresse, le plan et le téléphone pour prendre rendez-vous.",
    challenge:
      "Rendre une spécialité paramédicale compréhensible par les parents, inspirer confiance dès la première visite et ressortir sur les recherches locales (psychomotricienne Fontainebleau, bilan psychomoteur, TDAH).",
    solution:
      "Site léger en HTML/CSS/JavaScript, typographie manuscrite et palette douce, contenus en accordéons, frise de l'expérience professionnelle, carte intégrée et optimisation SEO locale.",
    results:
      "Un site rapide et rassurant qui présente clairement le cabinet, ses tarifs et les ateliers PEHP, et facilite la prise de rendez-vous.",
    technologies: ["HTML", "CSS", "JavaScript", "SEO"],
    link: "https://ariane-thomas-psychomotricienne.com/",
    linkLabel: "Visiter le site",
    ...visuals("ariane-thomas-psychomotricienne", 5),
  },
  {
    id: 15,
    slug: "site-mousequetaire",
    title: "Site Mousequetaire",
    categories: ["web", "creatif"],
    client: "Mousequetaire",
    year: "2025",
    accent: "#38bdf8",
    excerpt: "Notre propre vitrine — celle que vous êtes en train de visiter.",
    description:
      "Le site officiel de l'agence, pensé comme une démonstration de notre savoir-faire : animations GSAP pour les transitions et le scroll, micro-interactions, présentation des services, grille tarifaire, équipe, portfolio façon Instagram et formulaire de contact. Un design sombre aux accents bleus pour une identité forte et mémorable.",
    challenge:
      "Concevoir un site d'agence qui soit lui-même une vitrine, avec des animations fluides sans sacrifier les performances.",
    solution:
      "Next.js, animations GSAP, design system sur mesure avec TailwindCSS et optimisation des images.",
    results:
      "Un site moderne et rapide qui présente nos compétences… en les utilisant.",
    technologies: ["Next.js", "TailwindCSS", "GSAP"],
    link: "https://mousequetaire.com",
    linkLabel: "Visiter le site",
    ...visuals("site-mousequetaire", 4),
  },
];

// Ordre d'affichage façon Instagram : épinglés d'abord, puis du plus récent
// au plus ancien.
export const portfolioItems = [...projects].sort(
  (a, b) =>
    (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) ||
    Number(b.year) - Number(a.year) ||
    b.id - a.id
);

export const getProject = (id) =>
  portfolioItems.find((item) => item.id === Number(id)) || null;
