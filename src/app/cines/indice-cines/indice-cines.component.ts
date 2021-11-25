import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-indice-cines',
  templateUrl: './indice-cines.component.html',
  styleUrls: ['./indice-cines.component.css']
})
export class IndiceCinesComponent implements OnInit {

  constructor(private cinesService: CinesService){}
  cines: cineDTO[];
  columnasAMostrar  = ['id', 'nombre', 'acciones'];

  //paginacion
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {    

  this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);

    //me debo suscribir para ejecutar la función del observable
    // this.generosService.obtenerTodos()
    // .subscribe(generos => {
    //   this.generos = generos;
    // }, error => console.error(error));    


  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.cinesService.obtenerTodos(pagina,cantidadElementosAMostrar)
    .subscribe((respuesta: HttpResponse<cineDTO[]>) => {
      this.cines = respuesta.body;
      //leer la cabecera
      //este nombre de cabecera se crea en el backend
      console.log(respuesta.headers.get("cantidadTotalRegistros"));
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));      
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  borrar(id: number){
    this.cinesService.borrar(id)
    .subscribe(() => {
      this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
    }, error => console.error(error));
  }

  public saveFile(fileName: string): void {
    // ... save file
  }

  public handleDenial(): void {
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

  public handleDismiss(dismissMethod: string): void {
    // dismissMethod can be 'cancel', 'overlay', 'close', and 'timer'
    // ... do something
  }

}
