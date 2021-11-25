import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { SeguridadService } from 'src/app/seguridad/seguridad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
  maximoRating = 5;
  @Input()
  ratingSeleccionado = 0;

  maximoRatingArr = [];
  votado = false;
  ratingAnterior;

  @Output() //Para indicar que queremos disparar un evento 
  rated: EventEmitter<number> = new EventEmitter<number>(); //indico el tipo de dato a emitir


  constructor(private seguridadService: SeguridadService) { }

  ngOnInit(): void {
    this.maximoRatingArr = Array(this.maximoRating).fill(0);
  }

  manejarMouseEnter(index: number): void{
    this.ratingSeleccionado = index + 1;

  
  }
  manejarMouseLeave(): void{
    if(this.ratingAnterior !== 0){
      this.ratingSeleccionado = this.ratingAnterior;
    }else{
      this.ratingSeleccionado = 0;
    }
    
  }

  rate(index : number) : void{

    if(this.seguridadService.estaLogueado()){
        this.ratingSeleccionado = index + 1; 
        this.votado = true;
        this.ratingAnterior = this.ratingSeleccionado;
        //para que dispare evento con el numero a emitir
        this.rated.emit(this.ratingSeleccionado);
    }else{
      Swal.fire('Debe loguearse', "No puede realizar esta acción", "error");
    }
    
  }

}
