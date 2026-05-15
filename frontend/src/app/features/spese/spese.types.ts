export type PeriodoFiltro = 'ultimi_7_giorni' | 'mese_corrente' | 'ultimi_6_mesi' | 'anno_corrente';

export type TipoMovimento = 'spesa' | 'entrata';

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
  tipo: TipoMovimento;
  categorie: SpesaCategoria | null;
}

export interface SpesaPayload {
  importo: number;
  descrizione: string;
  categoria_id: string;
  data: string;
  tipo: TipoMovimento;
}
