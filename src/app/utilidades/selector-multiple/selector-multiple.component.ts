import { Component, Input, OnInit } from '@angular/core';
import { MultipleSelectorModel } from './MultipleSelectorModel';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input()
  Seleccionados: MultipleSelectorModel[] = [];

  @Input()
  NoSeleccionados: MultipleSelectorModel[] = [];

  ngOnInit(): void {
  }

  seleccionar(item: MultipleSelectorModel, index: number){
    //Agregamos al arreglo de seleccionados
    this.Seleccionados.push(item);

    //Quitamos del arreglo de deseleccionados
    this.NoSeleccionados.splice(index,1);

  }

  deseleccionar(item: MultipleSelectorModel, index: number ){
     //Agregamos al arreglo de seleccionados
     this.NoSeleccionados.push(item);

     //Quitamos del arreglo de deseleccionados
     this.Seleccionados.splice(index,1);
  }

  seleccionarTodo(){
    //Paso todo al otro arreglo
    this.Seleccionados.push(...this.NoSeleccionados);

    this.NoSeleccionados = [];
  }

  deseleccionarTodo(){
    this.NoSeleccionados.push(...this.Seleccionados);
    this.Seleccionados = [];
  }

}
