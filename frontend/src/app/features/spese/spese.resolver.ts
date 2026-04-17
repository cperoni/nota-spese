import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { supabase } from '../../core/supabase.client';

@Injectable({
  providedIn: 'root',
})
export class SpeseResolver implements Resolve<any[]> {
  // Carica di default le spese degli ultimi 7 giorni
  async resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<any[]> {
    const oggi = new Date();
    const to = oggi.toISOString().slice(0, 10);
    const start = new Date(oggi);
    start.setDate(start.getDate() - 6);
    const from = start.toISOString().slice(0, 10);

    const { data, error } = await supabase
      .from('spese')
      .select(`
        id,
        importo,
        descrizione,
        data,
        categoria_id,
        categorie ( nome, colore )
      `)
      .gte('data', from)
      .lte('data', to)
      .order('data', { ascending: false });

    return error ? [] : (data as any[]) || [];
  }
}
