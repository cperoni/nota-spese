import { Injectable } from '@angular/core';
import { supabase } from '../supabase.client';
import { Subject, Observable } from 'rxjs';

export interface Categoria {
  id?: string;
  nome: string;
  colore: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategorieService {
  private _refresh$ = new Subject<void>();

  get refresh(): Observable<void> {
    return this._refresh$.asObservable();
  }

  getCategorie() {
    return supabase.from('categorie').select('*').order('created_at', { ascending: false });
  }

  async addCategoria(categoria: Categoria) {
    const res = await supabase.from('categorie').insert([categoria]);
    if (!res.error) this._refresh$.next();
    return res;
  }

  async updateCategoria(id: string, categoria: Partial<Categoria>) {
    const res = await supabase.from('categorie').update(categoria).eq('id', id);
    if (!res.error) this._refresh$.next();
    return res;
  }

  async deleteCategoria(id: string) {
    const res = await supabase.from('categorie').delete().eq('id', id);
    if (!res.error) this._refresh$.next();
    return res;
  }
}
