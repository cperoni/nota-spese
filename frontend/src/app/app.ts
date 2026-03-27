import { Component, OnInit } from '@angular/core';
import { supabase } from '../lib/supabase.client';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<h1>Controlla console 👀</h1>`
})
export class App implements OnInit {

  async ngOnInit() {
    const { data, error } = await supabase
      .from('spese')
      .select('*');

    console.log('DATA:', data);
    console.log('ERROR:', error);
  }
}