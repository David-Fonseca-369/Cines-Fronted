import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  

  duplicarNumero(valor: number) : number{
    return valor * 2;
  }

  //El evento que se dispara por medio del output del rated de rating
  manejarRated(voto: number): void{
    alert(voto);
  }
  
}
