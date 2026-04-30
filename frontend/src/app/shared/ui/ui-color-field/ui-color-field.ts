import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ui-color-field',
  standalone: true,
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatMenuModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './ui-color-field.html',
  styleUrls: ['./ui-color-field.scss'],
})
export class UiColorField {
  @Input() label = 'Colore';
  @Input() value = '#3b82f6';
  @Input() hint = '';

  @Output() valueChange = new EventEmitter<string>();

  // Palette estesa a 20 colori vibranti e moderni
  readonly palette = [
    '#ef4444', '#f43f5e', '#ec4899', '#d946ef', '#a855f7',
    '#8b5cf6', '#6366f1', '#3b82f6', '#0ea5e9', '#06b6d4',
    '#14b8a6', '#10b981', '#22c55e', '#84cc16', '#eab308',
    '#f59e0b', '#f97316', '#795548', '#64748b', '#1e293b'
  ];

  onChange(v: string): void {
    this.valueChange.emit(v);
  }
}