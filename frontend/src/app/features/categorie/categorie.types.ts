export interface CategoriaItem {
    id: string;
    nome: string;
    colore: string;
    created_at?: string;
    numeroSpese?: number;
  }
  
  export interface CategoriaFormModel {
    nome: string;
    colore: string;
  }