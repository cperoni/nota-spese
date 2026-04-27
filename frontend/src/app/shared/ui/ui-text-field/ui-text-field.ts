import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ui-text-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './ui-text-field.html',
  styleUrls: ['./ui-text-field.scss'],
})
export class UiTextField {
  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() required = false;
  @Input() type: 'text' | 'email' | 'password' | 'search' = 'text';
  @Input() inputmode: 'text' | 'decimal' | 'numeric' | 'email' | 'search' = 'text';
  @Input() name = '';
  @Input() hint = '';
  @Input() error = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() blurEvent = new EventEmitter<void>();

  onChange(v: string): void {
    this.valueChange.emit(v);
  }

  onBlur(): void {
    this.blurEvent.emit();
  }
}