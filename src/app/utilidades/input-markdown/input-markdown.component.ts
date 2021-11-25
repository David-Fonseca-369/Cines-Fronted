import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {

  //lo hacemos parámetro
  @Input()
  contenidoMarkdown = '';

  //para recibir el placeholder del textarea
  @Input()
  placeHolderTextarea: string = 'Texto';

  //Para enviar el contenido del markdown al componente padre
  //lo emito desde el html.
  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  // inputTextArea(texto: string){
  //   // console.log(texto);
  //   this.contenidoMarkdown = texto;
  //   this.changeMarkdown.emit(texto);
  // }
}
