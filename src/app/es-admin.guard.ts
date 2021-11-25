import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EsAdminGuard implements CanActivate {

  constructor(private seguridadService: SeguridadService,
    private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.seguridadService.obtenerRol() === 'admin'){
      return true;
    }

    //Si el usuario quiere entrar hacia la ruta del administrador y no tiene el rol de admin,
    //entonces lo redireccionará al login, para que se logeé.

    this.router.navigate(['/login']);
    return false;
  }
  
}
