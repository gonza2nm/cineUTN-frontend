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
  @Input({ required: true })selectedValue: any = null;

  //avisa al componente padre si se cambio un valor de genero o de cine
  onSelectChange() {
    if (!this.selectedValue) {
      //devuelve obj con un atributo clear que indica que filtro se esta limpiando
      this.selectionChange.emit({ clear: this.filter });
    } else {
      //devuelve el obj sin especificar el tipo
      this.selectionChange.emit(this.selectedValue);
    }
  }
}
