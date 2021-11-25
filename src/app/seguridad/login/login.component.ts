import { Component, OnInit } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { credencialesUsuario } from '../formulario-autenticacion/seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private seguridadService: SeguridadService,
    private router : Router) { }

    errores: string[] = [];

  ngOnInit(): void {
  }

  login(crendenciales: credencialesUsuario){
    this.seguridadService.login(crendenciales)
    .subscribe(respuesta => {
      this.seguridadService.guardarToken(respuesta);
      this.router.navigate(['/']);
    }, errores => this.errores = parsearErroresAPI(errores));
  }

}
