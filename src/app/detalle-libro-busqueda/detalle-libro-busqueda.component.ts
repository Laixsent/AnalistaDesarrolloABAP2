import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-detalle-libro-busqueda',
  templateUrl: './detalle-libro-busqueda.component.html',
  styleUrls: ['./detalle-libro-busqueda.component.css']
})
export class DetalleLibroBusquedaComponent {
  @Input() libro: any;
  @Output() cerrarModal = new EventEmitter<void>();



  constructor
  (private _snackBar: MatSnackBar
    ){

    }
  cerrar(): void {
    this.cerrarModal.emit();
  }

  agregar(): void {
    const storedBooks = JSON.parse(localStorage.getItem('storedBooks') || '[]');

    // Verificar si el libro ya está en la lista
    const isBookAlreadyAdded = storedBooks.some((book: { titulo: string, portada: string }) => book.titulo === this.libro.titulo);

    if (!isBookAlreadyAdded) {
      const bookToAdd = { titulo: this.libro.titulo, portada: this.libro.portada };
      storedBooks.push(bookToAdd);
      localStorage.setItem('storedBooks', JSON.stringify(storedBooks));

      this._snackBar.open('Libro agregado correctamente', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this._snackBar.open('El libro ya ha sido agregado anteriormente', 'Cerrar', {
        duration: 3000,
      });
    }

    this.cerrar();
  }

}
