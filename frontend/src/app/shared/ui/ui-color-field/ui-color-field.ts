import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ui-color-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './ui-color-field.html',
  styleUrls: ['./ui-color-field.scss'],
})
export class UiColorField {
  @Input() label = 'Colore';
  @Input() value = '#000000';
  @Input() hint = '';

  @Output() valueChange = new EventEmitter<string>();

  onChange(v: string): void {
    this.valueChange.emit(v || '#000000');
  }
}