import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import Swal from 'sweetalert2';
import { usuarioDTO } from '../formulario-autenticacion/seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {

  constructor(private seguridadService: SeguridadService) { }

  @ViewChild('table')
  table: MatTable<any>;

  usuarios: usuarioDTO[];
  columnasAMostrar  = ['nombre', 'acciones'];

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
    this.seguridadService.obtenerUsuarios(pagina,cantidadElementosAMostrar)
    .subscribe((respuesta: HttpResponse<usuarioDTO[]>) => {
      this.usuarios = respuesta.body;
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

  hacerAdmin(usuarioId: string){
    this.seguridadService.hacerAdmin(usuarioId)
    .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }

  removerAdmin(usuarioId: string){
    this.seguridadService.removerAdmin(usuarioId)
    .subscribe(() => Swal.fire('Exitoso', 'La operación se ha realizado', 'success'));
  }

}
