import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UI_ICONS } from '../../../../shared/config/ui-icons';

@Component({
  selector: 'app-categorie-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './categorie-header.html',
  styleUrls: ['./categorie-header.scss'],
})
export class CategorieHeader {
  @Input({ required: true }) icons!: typeof UI_ICONS;
  @Output() addClicked = new EventEmitter<void>();
}