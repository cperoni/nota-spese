import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

export interface UiSelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-ui-select-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './ui-select-field.html',
  styleUrls: ['./ui-select-field.scss'],
})
export class UiSelectField {
  @Input() label = 'Seleziona';
  @Input() value = '';
  @Input() options: UiSelectOption[] = [];
  @Input() required = false;

  @Output() valueChange = new EventEmitter<string>();

  onChange(next: string): void {
    this.valueChange.emit(next);
  }
}