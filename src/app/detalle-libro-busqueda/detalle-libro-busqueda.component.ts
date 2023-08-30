import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-detalle-libro-busqueda',
  templateUrl: './detalle-libro-busqueda.component.html',
  styleUrls: ['./detalle-libro-busqueda.component.css']
})
export class DetalleLibroBusquedaComponent {
  @Input() libro: any;
  @Output() cerrarModal = new EventEmitter<void>();

  constructor() {}

  cerrar(): void {
    this.cerrarModal.emit();
  }

  agregar(): void {
  console.log("Estamos usando el boton agregar");

    const storedBooks = JSON.parse(localStorage.getItem('storedBooks') || '[]');

    const bookToAdd = { titulo: this.libro.titulo, portada: this.libro.portada };
    storedBooks.push(bookToAdd);


    localStorage.setItem('storedBooks', JSON.stringify(storedBooks));


    this.cerrar();
  }
}
