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

  //avisa al componente el filtro de cine que se esta haciendo
  onSelectChange() {
    this.selectionChange.emit(this.selectedValue);
    console.log(this.selectedValue);
  }
}
