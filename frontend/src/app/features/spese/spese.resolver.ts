import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { supabase } from '../../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SpeseResolver implements Resolve<any[]> {
  async resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<any[]> {
    // Carica di default le spese del mese corrente
    const oggi = new Date();
    const to = oggi.toISOString().slice(0, 10);
    const start = new Date(oggi.getFullYear(), oggi.getMonth(), 1);  // Primo del mese corrente
    const from = start.toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from('spese')
      .select(`
        id,
        importo,
        descrizione,
        data,
        tipo,
        categoria_id,
        categorie ( nome, colore )
      `)
      .gte('data', from)
      .lte('data', to)
      .order('data', { ascending: false });

    return error ? [] : (data as any[]) || [];
  }
}