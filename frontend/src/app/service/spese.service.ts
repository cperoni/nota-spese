import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

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
}