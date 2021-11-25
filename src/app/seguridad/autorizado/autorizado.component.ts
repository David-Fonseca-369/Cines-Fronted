import { Component, Input, OnInit } from '@angular/core';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-autorizado',
  templateUrl: './autorizado.component.html',
  styleUrls: ['./autorizado.component.css']
})
export class AutorizadoComponent implements OnInit {

  constructor( private seguridadService: SeguridadService) { }

  @Input()
  rol: string;

  ngOnInit(): void {
  }

  estaAutorizado(): boolean{

    if(this.rol){ //si hay rol definido
      return this.seguridadService.obtenerRol() === this.rol;
      
    } else{ //si no hay rol definido 
      return this.seguridadService.estaLogueado();
    }
  }

}
