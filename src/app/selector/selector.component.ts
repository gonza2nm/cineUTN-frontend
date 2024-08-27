import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css'],
})
export class SelectorComponent {
  @Input({ required: true }) filter: string = '';
  @Input({ required: true }) items: any[] = [];
  @Input({ required: true }) placeholder: string = '';
  @Output() selectionChange: EventEmitter<any> = new EventEmitter<any>();
  selectedValue: any = null;

  //avisa al componente home si se esta filtrando o limpiando el filtro de genero o cine
  onSelectChange() {
    if (!this.selectedValue) {
      this.selectionChange.emit({ clear: this.filter });
    } else {
      this.selectionChange.emit(this.selectedValue);
    }
    console.log(this.selectedValue);
  }
}
