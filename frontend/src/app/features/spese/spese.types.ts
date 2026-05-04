export type PeriodoFiltro = 
  | 'ultimi_7_giorni' 
  | 'ultimo_mese' 
  | 'ultimi_2_mesi' 
  | 'ultimi_6_mesi' 
  | 'ultimo_anno' 
  | 'tutte' 
  | 'personalizzato' // aggiungilo se previsto
  | undefined;

export interface CategoriaItem {
  id: string;
  nome: string;
  colore: string | null;
}

export interface SpesaCategoria {
  nome: string;
  colore: string | null;
}

export interface SpesaItem {
  id: string;
  importo: number;
  descrizione: string;
  data: string;
  categoria_id: string;
  categorie: SpesaCategoria | null;
}

export interface SpesaPayload {
  importo: number;
  descrizione: string;
  categoria_id: string;
  data: string;
}