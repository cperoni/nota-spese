export interface CategoriaItem {
    id: string;
    nome: string;
    colore: string;
    created_at?: string;
  }
  
  export interface CategoriaFormModel {
    nome: string;
    colore: string;
  }