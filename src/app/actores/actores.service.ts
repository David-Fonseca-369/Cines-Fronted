import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { actorCreacionDTO, actorDTO, actorPeliculaDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + 'actores';

  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{

    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    //debe llamarse como en la propiedad de 'PaginacionDTO' del backend    
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());

    return this.http.get<actorDTO[]>(this.apiURL, {observe: 'response', params});
  }

  public obtenerPorId(id: number): Observable<actorDTO>{
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  public obtenerPorNombre(nombre: string): Observable<actorPeliculaDTO[]>{
   //Cuando se envía un string, Angular lo convierte a texto plano, por lo que se agrega esto, para evitarlo
    const headers = new HttpHeaders('Content-Type: application/json');

    return this.http.post<actorPeliculaDTO[]>(`${this.apiURL}/buscarPorNombre`, 
    JSON.stringify(nombre), {headers});
    //stringify convierte de string a formato json.

  }



  public crear(actor : actorCreacionDTO){  
    const formData = this.construirFormData(actor);
    return  this.http.post(this.apiURL, formData);
  }


  public editar(id: number, actor : actorCreacionDTO){  
    const formData = this.construirFormData(actor);
    return  this.http.put(`${this.apiURL}/${id}`, formData);
  }
  
  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }





  private construirFormData(actor: actorCreacionDTO) : FormData{

    const formData = new FormData();
    formData.append('nombre', actor.nombre);

    //si existe biografia
    if(actor.biografia){
      formData.append('biografia', actor.biografia);
    }
    
    //si existe fecha
    if(actor.fechaNacimiento){
      formData.append('fechaNacimiento', formatearFecha(actor.fechaNacimiento));      
    }

    if(actor.foto){
      formData.append('foto', actor.foto);
    }

    return formData;
  }
}
