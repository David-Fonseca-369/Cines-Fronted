import { Location } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculaDTO, PeliculaPostGet } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  //Inyectamos un formBuilder
  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private activatedRoute : ActivatedRoute,
    private generosService: GenerosService,
    private peliculasService: PeliculasService) { }


  form: FormGroup;

  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;

  generos: generoDTO[] = [];

  peliculas: PeliculaDTO[]; //por defecto será indefinido
    
  formularioOriginal = 
  {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  };


  ngOnInit(): void {
    
    this.generosService.obtenerTodos()
    .subscribe(generos => {
      this.generos = generos; 
      
      //Inicializa el formulario
      this.form = this.formBuilder.group(this.formularioOriginal);

      //leer valores, en caso de que haya algun filtro 
      this.leerValoresURL();

      //busco las peliculas con los nuevos valores del formulario
      this.buscarPeliculas(this.form.value);      

      //Este valueChanges retorna un observable
      //Un observable nos va a permitir suscribirnos a 
      //una secuencia de eventos que se van a desiparar en el tiempo
      //cada vez que haya un cambio en el formulario se va disparar un evento 
      //y se ocupará este evento.
      //Reacciona a culaquier cambio que ocurra en el formulario
      this.form.valueChanges
      .subscribe(valores =>{
        // console.log(valores); //Se pueden ver los cambio del formgroup de cada propiedad del obejto
        // this.peliculas = this.peliculasOriginal; //resetear el filtro, para que aparesca algo al quitar texto, por ejemplo.
        this.buscarPeliculas(valores);
        this.escribirParametrosBusquedaEnURL();
      });
    })

  
  }

  private leerValoresURL(){
    //manejar url con activatedRoute
    this.activatedRoute.queryParams.subscribe((params) => {
      var objeto: any = {};
      
      if(params.titulo){
        objeto.titulo = params.titulo;
      }

      if(params.generoId){
        objeto.generoId = Number(params.generoId);
      }

      if(params.proximosEstrenos){
        objeto.proximosEstrenos = params.proximosEstenos;        
      }

      if(params.enCines){
        objeto.enCines = params.enCines;
      }

      //Actualizamos el formulario con el patch
      this.form.patchValue(objeto);

    });
  }


  //para que se muestren los filtros en la URL
  //se llaman queryStrings, por ejemplo se puede compartir la 
  //URL y contendra ya los filtros.
  private escribirParametrosBusquedaEnURL(){
    var  queryStrings = [];

    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if(valoresFormulario.generoId != '0'){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`)
    }

    if(valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);      
    }

    if(valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    //location permite escribir la URL
    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));

  }
 
  buscarPeliculas(valores: any){

    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;

    this.peliculasService.filtrar(valores).subscribe(response => {
      this.peliculas = response.body;
      this.escribirParametrosBusquedaEnURL();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    })

    //operación en memoria 
    // if(valores.titulo){
    //   //si lo que sea que el usuario haya escrito se enmcuentra en el titula de una pelicula del listado de peliculas 
    //   this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    // }

    // if(valores.generoId !== 0){
    //   this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    // }

    // if(valores.proximosEstrenos){
    //   this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    // }
    // if(valores.enCines){
    //   this.peliculas = this.peliculas.filter(pelicula => pelicula.encines);
    // }


  }

  limpiar():void{
    //para actualizar el formario 'patch'
      this.form.patchValue(this.formularioOriginal);
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }

}
