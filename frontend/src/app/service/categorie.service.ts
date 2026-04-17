import { Injectable } from '@angular/core';
import { supabase } from '../core/supabase.client';

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
  getCategorie() {
    return supabase.from('categorie').select('*').order('created_at', { ascending: false });
  }

  addCategoria(categoria: Categoria) {
    return supabase.from('categorie').insert([categoria]);
  }

  updateCategoria(id: string, categoria: Partial<Categoria>) {
    return supabase.from('categorie').update(categoria).eq('id', id);
  }

  deleteCategoria(id: string) {
    return supabase.from('categorie').delete().eq('id', id);
  }
}
