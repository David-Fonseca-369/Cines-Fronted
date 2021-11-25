import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-formulario-genero',
  templateUrl: './formulario-genero.component.html',
  styleUrls: ['./formulario-genero.component.css']
})
export class FormularioGeneroComponent implements OnInit {

  //Los servicios se innyectan a traves del 
  //constructor de la clase.

  //'FormBuilder' facilita el trabajo para la validación de 
  //los campos del formulario.
  constructor(private formBuilder : FormBuilder ) { }

  form : FormGroup; //form, representa los campos del formulario y el formGroup es un conjunto de campos.

  //Para el de editar 
  @Input()
  modelo:  generoCreacionDTO;

  @Input()
  errores: string[] = [];

  @Output()//para enviarlo el formulario al formulario padre
  onSubmit: EventEmitter<generoCreacionDTO> = new EventEmitter<generoCreacionDTO>();


  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      nombre: ['', {
        validators:[Validators.required, Validators.minLength(3), primeraLetraMayuscula()]
      }] //Indica que el campo se inicializará vacio
    });

    //si ya está definido 
    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo); //se encarga de machear las propiedades del
      //formulario con las propiedade del formulario.
    }

  }

  obtenerErrorCampoNombre(){
    var campo = this.form.get('nombre');

    if(campo.hasError('required')){
      return 'El campo nombre es requerido.';
    }

    if(campo.hasError('minlength')){
      return 'La longitud mínima es de 3 caracteres.' 
    }
    if(campo.hasError('primeraLetraMayuscula')){
      return campo.getError('primeraLetraMayuscula').mensaje;
    }

    return '';
  }

  guardarCambios(){
    //envio el valor del formulario
    this.onSubmit.emit(this.form.value);
  }

}


