import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent {

  errores: string[] = [];
  //Los servicios se innyectan a traves del 
  //constructor de la clase.

  //'FormBuilder' facilita el trabajo para la validación de 
  //los campos del formulario.
  constructor(private router : Router,
    private cinesService: CinesService) { }

  guardarCambios(cine: cineCreacionDTO): void{
   //guardar los cambios 
   this.cinesService.crear(cine).subscribe(() => {
    this.router.navigate(['/cines']); 
   }, (error) => this.errores = parsearErroresAPI(error));     
  }

}
