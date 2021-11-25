import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
//El intereceptor se debe configurar en providers, provide del app.module.
export class SeguridadInterceptorService implements HttpInterceptor {

  constructor(private seguridadService: SeguridadService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.seguridadService.obtenerToken();

    if(token){//si token existe
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    } 

    return next.handle(req);
  }
}
