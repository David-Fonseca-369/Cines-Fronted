import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RatingComponent } from '../utilidades/rating/rating.component';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css']
})
export class CicloDeVidaComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {



  //No es un evento del ciclo de vida de un componente
  //los constructores por ejemplo sirven para inyectar servicios
  constructor(private changesDetectorRef: ChangeDetectorRef) { }

  @Input()
  titulo: string; 

  //Para seleciconar un elemento de la plantilla
  @ViewChild(RatingComponent)
  ratingComponent: RatingComponent;

  //Guardar la referencia del timer
  timer: ReturnType<typeof setInterval>;

  //Onchanges no se ejecuta, hasta que decoras con un input, por ejemplo.
  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');
    console.log(changes);
  }
  ngOnDestroy(): void {
    console.log('on destroy');
    //Limpiar los recursos del timer
    //De esta manera evitamos memory lics o fugas de memoria
    clearInterval(this.timer);
  }
  ngDoCheck(): void {
    console.log('do check');
  }
  ngAfterViewInit(): void {
    console.log('on after view init');
    // this.ratingComponent.ratingSeleccionado = 3;
    //para detectar cambios, solo en desarrollo
    // this.changesDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    console.log('on init');
    // this.ratingComponent.ratingSeleccionado = 3;
    //Aquí da error para hacer cambio al componente rating, porque lo carga
    //antes de que se inicialice la vista, es por ello que está on after view init

    this.timer = setInterval(() => console.log(new Date()), 1000);
  }

}
