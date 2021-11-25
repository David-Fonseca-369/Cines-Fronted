import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { toBase64 } from '../utilidades';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {

  constructor() { }

  imagenBase64: string;

  //Para recibir la URL de la imagen en edición
  @Input()
  urlImagenActual : string
  //emitimos un archivo seleccionado a formulario-actores
  @Output()
  archivoSeleccionado : EventEmitter<File> = new EventEmitter<File>();



  ngOnInit(): void {
  }

  change(event){
    if(event.target.files.length > 0){ //verififca que se haya seleccionado algo
      const file: File = event.target.files[0]; //obtengo el archivo seleccionado
      //pasamos el archivo y obtenemos el valor
      toBase64(file).then((value: string) => this.imagenBase64 = value)
      .catch(error => console.log("error"+ error));

      //emitimos el archivo
      this.archivoSeleccionado.emit(file);
      //Si selecciona nueva imagen, para que no se duplique
      this.urlImagenActual = null;
    }
  }

}
