type MenuItem = {
  label: string;
  route: string;
  icon?: string;
};

export const menuItems: MenuItem[] = [
  {
    label: "Home",
    route: "/",
    icon: "receipt"
  },
  {
    label: "Categorie",
    route: "/categorie",
    icon: "category"
  },
  {
    label: "Analisi",
    route: "/analisi",
    icon: "bar_chart"
  }
];
