import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorCreacionDTO, actorDTO } from '../actor';

@Component({
  selector: 'app-formulario-actores',
  templateUrl: './formulario-actores.component.html',
  styleUrls: ['./formulario-actores.component.css']
})
export class FormularioActoresComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form:  FormGroup;

  //Para recibir el modelo emitido por el componente editar-actores
  @Input()
  modelo: actorDTO;


  @Input()
  errores: string[] = [];
  //Vamos a emitir hacia el componente padre
  //es decir se lo compartirá al componente crear-actor.html
  @Output()
  OnSubmit: EventEmitter<actorCreacionDTO> = new EventEmitter<actorCreacionDTO>();

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', {validators: [Validators.required]}],
      fechaNacimiento: '',
      foto: '',
      biografia: ''
    });

    //si es para editar
    if(this.modelo !== undefined){
      //actualizamos el formulario
      this.form.patchValue(this.modelo);

      //lo pasamos por medio de la plantilla del componente-editar
    }
  }

  archivoSeleccionado(file){
    //Agrego valor al campo foto
    this.imagenCambiada = true;
    this.form.get('foto').setValue(file);
  }

  cambioMarkdown(texto: string){
    this.form.get('biografia').setValue(texto);
  }
  onSubmit(){
    if(!this.imagenCambiada){
      this.form.patchValue({'foto': null});
      //no enviamos foto, si nouestro usuario nunca edita la foto.
    }
    this.OnSubmit.emit(this.form.value);
    // console.log(this.form.value);
  }



}
