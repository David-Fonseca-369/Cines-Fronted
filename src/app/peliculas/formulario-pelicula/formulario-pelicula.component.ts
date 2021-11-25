import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup

  @Input()
  errores: string[] = [];

  //para recibir el modelo de editar
  @Input()
  modelo: PeliculaDTO;

  //El modelo que se va ha emitir 
  @Output()
  //Este Onsubmit es el que se pone en el componenete que lo emite
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados: MultipleSelectorModel[];

  @Input()
  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: MultipleSelectorModel [];

  @Input()
  cinesSeleccionados: MultipleSelectorModel[] = [];  

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  imagenCambiada = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo : ['', {validators: [Validators.required]}],
      resumen : '',
      enCines : false,
      trailer : '',
      fechaLanzamiento: '',
      poster : '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    });

    //si ya hay un modelo, en el caso de editar
    if(this.modelo !== undefined){
      //Le pasamos el modelo al formulario
      this.form.patchValue(this.modelo);
    }

  }
  guardarCambios(){
    console.log(this.generosSeleccionados);

    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosIds);
    
    
    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje};
    }); 

    //Paso los actores
    this.form.get('actores').setValue(actores);

    if(!this.imagenCambiada){
      this.form.patchValue({'poster': null}); //Para que no envíe la imagen si no se ha modificado.
    }

    this.OnSubmit.emit(this.form.value);

  }

  //Para que se agregue el contenido emitido de la imagen al la porpiedad 'poster'
  archivoSeleccionado(archivo: File){    
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  //Para que se agregue el  contenido emmiido del markdown al la propiedad 'resumen'
  changeMarkdown(texto){
    this.form.get('resumen').setValue(texto);
  }

}
