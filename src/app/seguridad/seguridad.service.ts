import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion, usuarioDTO } from './formulario-autenticacion/seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient: HttpClient) { }

  apiURL = environment.apiURL + 'cuentas';
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';
  private readonly campoRol = 'role';


  obtenerUsuarios(pagina: number, recordsPorPagina: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());

    return this.httpClient.get<usuarioDTO[]>(`${this.apiURL}/listadousuarios`,
    {observe: 'response', params});
  }

  hacerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiURL}/hacerAdmin`, JSON.stringify(usuarioId), {headers});
  }

  removerAdmin(usuarioId: string){
    const headers = new HttpHeaders('Content-Type: application/json');//al enviar string damos formato json por que por defecto se va como texto plano.
    return this.httpClient.post(`${this.apiURL}/removerAdmin`, JSON.stringify(usuarioId), {headers});
  }



  public estaLogueado(): boolean{

    const token = localStorage.getItem(this.llaveToken); //traigo el token del localStorage.

    if(!token){
      return false; //si no hay token no está logeado
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion); //si hay token, entonces traigo la expiración.
    const expiracionFecha = new Date(expiracion); //convierto la expoeracion a fecha 

    if(expiracionFecha <= new Date()){ //verifico que aun este vigente
        //Si ya pasó la expiración del token, hago un logout
        this.logout();
        return false;
    }

    return true; //el token sigue vigente
  }

  logout(){

    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);

  }

  obtenerRol(): string{
    return  this.obtenerCampoJWT(this.campoRol);
  }

  public obtenerCampoJWT(campo: string):string {
    const token = localStorage.getItem(this.llaveToken);
    if(!token){return '';}

    var dataToken = JSON.parse(atob(token.split('.')[1])); //se divide en 3, y el 1 es el de la data.
    return dataToken[campo];
  }

  registrar(credenciales: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/crear', credenciales);
  }

  login(credenciales: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/login', credenciales);
  }

  //Guardar informacion en localStorage
  guardarToken(respuestaAutenticacion: respuestaAutenticacion){
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }

  obtenerToken(){
    return localStorage.getItem(this.llaveToken);
  }


}
