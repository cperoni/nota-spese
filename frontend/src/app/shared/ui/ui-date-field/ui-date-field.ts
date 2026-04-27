import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDatepickerModule, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ui-date-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './ui-date-field.html',
  styleUrls: ['./ui-date-field.scss'],
})
export class UiDateField implements OnChanges {
  @Input() label = 'Data';
  @Input() value = ''; // yyyy-MM-dd
  @Input() placeholder = 'Seleziona data';
  @Input() required = false;

  @Output() valueChange = new EventEmitter<string>();

  internalDate: Date | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      const next = this.parseIsoDate(this.value);
      const currIso = this.toIsoDate(this.internalDate);
      const nextIso = this.toIsoDate(next);
      if (currIso !== nextIso) {
        this.internalDate = next;
      }
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>): void {
    const next = event.value ?? null;
    const nextIso = this.toIsoDate(next);

    if (this.toIsoDate(this.internalDate) !== nextIso) {
      this.internalDate = next;
      this.valueChange.emit(nextIso);
    }
  }

  private parseIsoDate(iso: string): Date | null {
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  private toIsoDate(date: Date | null): string {
    if (!date) return '';
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
}