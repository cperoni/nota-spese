import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { MatDateFormats } from '@angular/material/core';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: unknown): string {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};