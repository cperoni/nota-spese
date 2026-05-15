import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SpeseService {
  getSpese() {
    return supabase.from('spese').select('*').order('created_at', { ascending: false });
  }

  addSpesa(spesa: { importo: number; descrizione: string; data: Date; categoria_id: number }) {
    return supabase.from('spese').insert([spesa]);
  }

  deleteSpesa(id: string) {
    return supabase.from('spese').delete().eq('id', id);
  }

  async getTotalsByCategory(fromDate?: string) {
    let query = supabase.from('spese').select(`
      categoria_id,
      importo,
      categorie (
        id,
        nome,
        colore
      )
    `);

    if (fromDate) {
      query = query.gte('data', fromDate);
    }

    const { data, error } = await query;

    if (error) {
      return {
        data: [],
        error,
      };
    }

    const grouped = (data || []).reduce<
      Record<
        string,
        {
          id?: string;
          nome: string;
          colore?: string;
          total: number;
        }
      >
    >((acc, item: any) => {
      const category = item.categorie;

      if (!category) {
        return acc;
      }

      if (!acc[category.id]) {
        acc[category.id] = {
          id: category.id,
          nome: category.nome,
          colore: category.colore,
          total: 0,
        };
      }

      acc[category.id].total += Number(item.importo);

      return acc;
    }, {});

    return {
      data: Object.values(grouped),
      error: null,
    };
  }
}
