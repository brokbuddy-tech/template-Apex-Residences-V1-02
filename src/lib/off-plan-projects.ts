
export interface OffPlanProject {
  id: string;
  title: string;
  type: string;
  developer: string;
  image: string;
  exclusive?: boolean;
}

export const OFF_PLAN_PROJECTS: OffPlanProject[] = [
  {
    id: "farm-gardens-2",
    title: "Farm Gardens 2",
    type: "Residences",
    developer: "Emaar Properties",
    image: "https://picsum.photos/seed/off1/800/1000",
    exclusive: true,
  },
  {
    id: "the-oasis",
    title: "The Oasis",
    type: "Villas",
    developer: "Emaar Properties",
    image: "https://picsum.photos/seed/off2/800/1000",
  },
  {
    id: "burj-azizi",
    title: "Burj Azizi",
    type: "Ultra-Luxury",
    developer: "Azizi Developments",
    image: "https://picsum.photos/seed/off3/800/1000",
    exclusive: true,
  },
  {
    id: "sobha-one",
    title: "Sobha One",
    type: "Apartments",
    developer: "Sobha Realty",
    image: "https://picsum.photos/seed/off4/800/1000",
  },
  {
    id: "vela-viento",
    title: "Vela Viento",
    type: "Penthouses",
    developer: "Omniyat",
    image: "https://picsum.photos/seed/off5/800/1000",
  },
  {
    id: "mercure-residences",
    title: "Mercure Residences",
    type: "Studios & 1BR",
    developer: "Damac Properties",
    image: "https://picsum.photos/seed/off6/800/1000",
  },
  {
    id: "khalifa-gardens",
    title: "Khalifa Gardens",
    type: "Boutique",
    developer: "Select Group",
    image: "https://picsum.photos/seed/off7/800/1000",
  },
  {
    id: "palm-flower",
    title: "Palm Flower",
    type: "Mansions",
    developer: "Nakheel",
    image: "https://picsum.photos/seed/off8/800/1000",
    exclusive: true,
  },
];
