import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { generoCreacionDTO } from '../genero';
import { GenerosService } from '../generos.service';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {

  errores: string[] = [];
  //Los servicios se innyectan a traves del 
  //constructor de la clase.

  //'FormBuilder' facilita el trabajo para la validación de 
  //los campos del formulario.
  constructor(private router : Router,
    private generosService: GenerosService) { }

  guardarCambios(genero: generoCreacionDTO): void{
   //guardar los cambios 
   this.generosService.crear(genero).subscribe(() => {
    this.router.navigate(['/generos']); 
   }, (error) => this.errores = parsearErroresAPI(error));     
  }

}
