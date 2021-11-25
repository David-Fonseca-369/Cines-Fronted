import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { actorPeliculaDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor(private actoresService: ActoresService) { }

  //Nos permite manejar un campo de un formulario de manera individual
  //En vez de utilizar un form group, solo se utiliza directamente un contorl
  //Esto porque solo se utilizara un control en el formulario.  
  control: FormControl = new FormControl;

  @Input() //pasar los actores selecionados, cuando se este en modo de edición.
  actoresSeleccionados : actorPeliculaDTO[] = [];
  
  actoresAMostrar : actorPeliculaDTO[] = [];
  
  columnasAMostrar = ['imagen', 'nombre', 'personaje', 'acciones'];

  //debemos poner un render, para que la tabla se actualice cada que se agregue algo
  //Por lo que se toma la referencia de la tabla por medio de un viewChild  
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    //Para crear un observable y este pueda estar alpendiente de cambios  
    //cada vez que el usuario escriba en el textbox, se disparará este metodo.
    this.control.valueChanges.subscribe(nombre => {
      if (typeof nombre === 'string' && nombre){
        this.actoresService.obtenerPorNombre(nombre).subscribe(actores => {
          this.actoresAMostrar = actores;
        })
      }
    });
  }
  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);

    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue(''); //limpia la opción selecionada

    //Si table no es nula
    if(this.table !== undefined){
      this.table.renderRows();
    }
  
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre === actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>){
    //reordena los elementos que se arrastran

    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    )

    //lo proporciona ngular, para intercambiar los elementos de un arreglo.
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }



}
