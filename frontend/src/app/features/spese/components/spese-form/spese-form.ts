import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UI_ICONS } from '../../../../shared/config/ui-icons';
import { UiDateField } from '../../../../shared/ui/ui-date-field/ui-date-field';
import {
  UiSelectField,
  UiSelectOption,
} from '../../../../shared/ui/ui-select-field/ui-select-field';
import { UiTextField } from '../../../../shared/ui/ui-text-field/ui-text-field';
import { CategoriaItem } from '../../../categorie/categorie.types';

@Component({
  selector: 'app-spese-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    UiDateField,
    UiSelectField,
    UiTextField
  ],
  templateUrl: './spese-form.html',
  styleUrls: ['./spese-form.scss'],
})
export class SpeseForm {
  @Input({ required: true }) icons!: typeof UI_ICONS;
  @Input() editingId: string | null = null;
  @Input() categorie: CategoriaItem[] = [];
  @Input() importoStr = '';
  @Input() importoError = '';
  @Input() data = '';
  @Input() descrizione = '';
  @Input() categoria_id = '';

  @Output() submitClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();
  @Output() importoStrChange = new EventEmitter<string>();
  @Output() importoBlur = new EventEmitter<void>();
  @Output() dataChange = new EventEmitter<string>();
  @Output() descrizioneChange = new EventEmitter<string>();
  @Output() categoriaIdChange = new EventEmitter<string>();

  categoriaOptions: UiSelectOption[] = [];

  ngOnChanges(): void {
    this.categoriaOptions = this.categorie.map(c => ({
      value: c.id,
      label: c.nome,
    }));
  }
}