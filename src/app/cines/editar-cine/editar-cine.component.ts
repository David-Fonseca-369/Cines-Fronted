import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import Swal from 'sweetalert2';
import { cineCreacionDTO, cineDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private router : Router,
    private cinesService : CinesService,
    //activated router para poder extraer las variables de ruta de la URL
    private activatedRoute: ActivatedRoute) { }

  modelo : cineDTO;
  errores : string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.cinesService.obtenerPorId(params.id)
      .subscribe(cine => {
        this.modelo = cine;
      }, () => this.router.navigate(['/cines']))
      //En caso de no encontrar al generp, retornará un notfound, por lo que regresará a
      //generos, es por ello que no se captura nigún error.
    })


  }

  guardarCambios(cine: cineCreacionDTO): void{
    
    this.cinesService.editar(this.modelo.id, cine)
    .subscribe(() => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Editado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
       this.router.navigate(['/cines']);
    }, error => this.errores = parsearErroresAPI(error));       
  }

}
