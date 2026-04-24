import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { UI_ICONS } from '../../../../shared/config/ui-icons';
import { CategoriaItem } from '../../categorie.types';

@Component({
  selector: 'app-categorie-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, EmptyStateComponent],
  templateUrl: './categorie-list.html',
  styleUrls: ['./categorie-list.scss'],
})
export class CategorieList {
  @Input({ required: true }) icons!: typeof UI_ICONS;
  @Input() categorie: CategoriaItem[] = [];

  @Output() editClicked = new EventEmitter<CategoriaItem>();
  @Output() deleteClicked = new EventEmitter<CategoriaItem>();
  @Output() emptyActionClicked = new EventEmitter<void>();
}