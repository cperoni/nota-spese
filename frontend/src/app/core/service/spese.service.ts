import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SpeseService {

  getSpese() {
    return supabase
      .from('spese')
      .select('*')
      .order('created_at', { ascending: false });
  }

  addSpesa(spesa: {
    importo: number;
    descrizione: string;
    data: Date;
    categoria_id: number;
  }) {
    return supabase.from('spese').insert([spesa]);
  }

  deleteSpesa(id: string) {
    return supabase.from('spese').delete().eq('id', id);
  }

  async getTotalsByCategory() {
    const { data: categories, error: catErr } = await supabase.from('categorie').select('*');
    if (catErr) return { data: null, error: catErr };

    const { data: spese, error: spErr } = await supabase.from('spese').select('categoria_id, importo');
    if (spErr) return { data: null, error: spErr };

    const totals = new Map<string, number>();
    (spese || []).forEach((s: any) => {
      const id = s.categoria_id;
      const imp = Number(s.importo) || 0;
      totals.set(id, (totals.get(id) || 0) + imp);
    });

    const result = (categories || []).map((c: any) => ({
      id: c.id,
      nome: c.nome,
      colore: c.colore,
      total: totals.get(c.id) || 0,
    }));

    return { data: result, error: null };
  }
}