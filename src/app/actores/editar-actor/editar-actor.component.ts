import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import Swal from 'sweetalert2';
import { actorCreacionDTO, actorDTO } from '../actor';
import { ActoresService } from '../actores.service';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  //Con el servicio de ActivatedRoute, podemos obtener información
  //de la ruta en la que se encunetra el usuario.

  constructor(private router : Router,
    private actoresService : ActoresService,
    //activated router para poder extraer las variables de ruta de la URL
    private activatedRoute: ActivatedRoute) { }

  modelo : actorDTO;
  errores : string[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.actoresService.obtenerPorId(params.id)
      .subscribe(genero => {
        this.modelo = genero;
      }, () => this.router.navigate(['/actores']))
      //En caso de no encontrar al generp, retornará un notfound, por lo que regresará a
      //generos, es por ello que no se captura nigún error.
    })


  }

  guardarCambios(actor: actorCreacionDTO): void{
    
    this.actoresService.editar(this.modelo.id, actor)
    .subscribe(() => {

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Editado correctamente!',
        showConfirmButton: false,
        timer: 1500
      });
       this.router.navigate(['/actores']);
    }, error => this.errores = parsearErroresAPI(error));       
  }

}
