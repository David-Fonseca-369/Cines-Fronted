import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';

import Swal from 'sweetalert2';
import { generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-indice-generos',
  templateUrl: './indice-generos.component.html',
  styleUrls: ['./indice-generos.component.css']
})
export class IndiceGenerosComponent implements OnInit {

  constructor(private generosService: GenerosService) { }

  @ViewChild('table')
  table: MatTable<any>;

  generos: generoDTO[];
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
    this.generosService.obtenerPaginado(pagina,cantidadElementosAMostrar)
    .subscribe((respuesta: HttpResponse<generoDTO[]>) => {
      this.generos = respuesta.body;
      //leer la cabecera
      //este nombre de cabecera se crea en el backend
      
      this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));      
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;

    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  borrar(id: number){
    this.generosService.borrar(id)
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
