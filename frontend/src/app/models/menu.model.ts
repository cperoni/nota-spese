type MenuItem = {
  label: string;
  route: string;
  icon?: string;
};

export const menuItems: MenuItem[] = [
  {
    label: "Elenco Spese",
    route: "/spese",
    icon: "receipt"
  },
  {
    label: "Categorie",
    route: "/categorie",
    icon: "category"
  }
];