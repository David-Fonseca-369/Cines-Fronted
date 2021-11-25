import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import Swal from 'sweetalert2';
import { generoCreacionDTO, generoDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private router : Router,
    private generosService : GenerosService,
    //activated router para poder extraer las variables de ruta de la URL
    private activatedRoute: ActivatedRoute) { }

  modelo : generoDTO;
  errores : string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.generosService.obtenerPorId(params.id)
      .subscribe(genero => {
        this.modelo = genero;
      }, () => this.router.navigate(['/generos']))
      //En caso de no encontrar al generp, retornará un notfound, por lo que regresará a
      //generos, es por ello que no se captura nigún error.
    })


  }

  guardarCambios(genero: generoCreacionDTO): void{
    
    this.generosService.editar(this.modelo.id, genero)
    .subscribe(() => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Editado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
       this.router.navigate(['/generos']);
    }, error => this.errores = parsearErroresAPI(error));       
  }

}
