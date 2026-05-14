import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core'; // Aggiunto ViewChild
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'; // Aggiunto MatMenuTrigger
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ui-color-field',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatButtonModule, MatIconModule],
  templateUrl: './ui-color-field.html',
  styleUrls: ['./ui-color-field.scss'],
})
export class UiColorField {
  // Cattura il trigger del menu definito nel template
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  @Input() label = 'Colore';
  @Input() value = '';
  @Input() hint = '';
  @Input() error = '';
  @Input() required = false;

  @Output() valueChange = new EventEmitter<string>();

  readonly palette = [
    { hex: '#ef4444', name: 'Rosso' }, { hex: '#f43f5e', name: 'Rosa' }, 
    { hex: '#ec4899', name: 'Fucsia' }, { hex: '#d946ef', name: 'Viola' },
    { hex: '#a855f7', name: 'Ametista' }, { hex: '#8b5cf6', name: 'Lavanda' }, 
    { hex: '#6366f1', name: 'Indaco' }, { hex: '#3b82f6', name: 'Blu' }, 
    { hex: '#0ea5e9', name: 'Azzurro' }, { hex: '#06b6d4', name: 'Ciano' },
    { hex: '#14b8a6', name: 'Teal' }, { hex: '#10b981', name: 'Smeraldo' }, 
    { hex: '#22c55e', name: 'Verde' }, { hex: '#84cc16', name: 'Lime' }, 
    { hex: '#eab308', name: 'Giallo' }, { hex: '#f59e0b', name: 'Ambra' }, 
    { hex: '#f97316', name: 'Arancio' }, { hex: '#795548', name: 'Marrone' }, 
    { hex: '#64748b', name: 'Ardesia' }, { hex: '#1e293b', name: 'Notte' }
  ];

  get selectedColorName(): string {
    const found = this.palette.find(c => c.hex.toLowerCase() === this.value?.toLowerCase());
    return found ? found.name : '';
  }

  // Metodo per aprire il menu dal TS
  openPalette(): void {
    this.menuTrigger.openMenu();
  }

  onChange(hex: string): void {
    this.valueChange.emit(hex);
    // Chiude automaticamente il menu palette dopo la scelta
    try {
      this.menuTrigger?.closeMenu();
    } catch (e) {
      // ignore
    }
  }
}