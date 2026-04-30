import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UI_ICONS } from '../../../../shared/config/ui-icons';
import { CategoriaFormModel } from '../../categorie.types';
import { UiTextField } from '../../../../shared/ui/ui-text-field/ui-text-field';
import { UiColorField } from '../../../../shared/ui/ui-color-field/ui-color-field';

@Component({
  selector: 'app-categorie-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatIconModule, 
    UiTextField, 
    UiColorField
  ],
  templateUrl: './categorie-form.html',
  styleUrls: ['./categorie-form.scss'],
})
export class CategorieForm {
  @Input({ required: true }) icons!: typeof UI_ICONS;
  @Input() model: CategoriaFormModel = { nome: '', colore: '#000000' };
  @Input() editingId: string | null = null;

  @Output() submitClicked = new EventEmitter<void>();
  @Output() cancelClicked = new EventEmitter<void>();
  @Output() modelChange = new EventEmitter<CategoriaFormModel>();
}