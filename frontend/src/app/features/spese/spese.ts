import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../core/supabase.client';

@Component({
  selector: 'app-spese',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './spese.html',
  styleUrl: './spese.css',
})
export class Spese implements OnInit {

  spese: any[] = [];
  categorie: any[] = [];

  importo = 0;
  descrizione = '';
  categoria_id = '';
  data: string = '';

  async ngOnInit() {

    this.data = new Date().toISOString().substring(0, 10);
    await this.loadCategorie();
    await this.loadSpese();
  }

  async loadCategorie() {
    const { data } = await supabase
      .from('categorie')
      .select('*')
      .order('nome');

    this.categorie = data ?? [];

    if (this.categorie.length > 0) {
      this.categoria_id = this.categorie[0].id;
    }
  }

  async loadSpese() {
    const { data } = await supabase
      .from('spese')
      .select(`
        id,
        importo,
        descrizione,
        categorie ( nome, colore )
      `)
      .order('data', { ascending: false });

    this.spese = data ?? [];
  }

  async add() {
    if (!this.importo || !this.categoria_id) return;

    await supabase.from('spese').insert([
      {
        importo: this.importo,
        descrizione: this.descrizione,
        categoria_id: this.categoria_id,
        data: this.data || new Date().toISOString().split('T')[0], // Usa la data selezionata o quella odierna se non è stata selezionata
      },
    ]);

    this.importo = 0;
    this.descrizione = '';
      this.data = '';

    await this.loadSpese();
  }

  async delete(id: string) {
    await supabase.from('spese').delete().eq('id', id);
    await this.loadSpese();
  }
}