import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Cinema, Genre } from '../interfaces/interfaces.js';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent {
  @Input({ required: true }) filter: string = '';
  @Input({ required: true }) items: any[] = [];
  @Input({ required: true }) placeholder: string = '';
  @Output() itemSelected = new EventEmitter<any>();
  selectedItem: string | null = null;
  dropdownOpen: boolean = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  clearFilter() {
    this.selectedItem = null;
    this.toggleDropdown();
    this.itemSelected.emit({ clear: this.filter });
  }
  selectItem(item: Cinema | Genre): void {
    const { name } = item;
    this.selectedItem = name;
    this.toggleDropdown();
    this.itemSelected.emit(item);
  }
}
