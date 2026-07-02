export interface Deployment {
  id: string;
  name: string;
  robots: number;
  date: string;
  type: string;
  lat: number;
  lng: number;
}

export const deployments: Deployment[] = [
  {
    id: "defense",
    name: "La Défense, Paris",
    robots: 30,
    date: "Octobre 2026",
    type: "Flotte propre",
    lat: 48.89,
    lng: 2.24,
  },
  {
    id: "nice",
    name: "Aéroport Nice",
    robots: 2,
    date: "Juin 2026",
    type: "Contrat pilote",
    lat: 43.66,
    lng: 7.21,
  },
  {
    id: "croix",
    name: "Croix (Lille)",
    robots: 5,
    date: "Septembre 2026",
    type: "Retail / Grande distribution",
    lat: 50.67,
    lng: 3.15,
  },
  {
    id: "centerparcs",
    name: "Center Parcs",
    robots: 3,
    date: "2026",
    type: "Location",
    lat: 46.8,
    lng: 4.88,
  },
  {
    id: "belambra",
    name: "Belambra",
    robots: 3,
    date: "2026",
    type: "Location",
    lat: 44.5,
    lng: 5.9,
  },
];

export const TOTAL_ROBOTS = deployments.reduce((sum, d) => sum + d.robots, 0);
export const TOTAL_SITES = deployments.length;
