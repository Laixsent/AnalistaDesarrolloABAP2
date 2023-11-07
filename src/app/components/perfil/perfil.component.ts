import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  @Input() libro: any;
  storedBooks: any[] = [];
  editingBook: any | null = null;
  editingValue: number | null = null; // Agrega esta propiedad

  constructor(
    private router: Router
    ){}

  ngOnInit(): void {
    if (!sessionStorage.getItem('sesionIniciada')) {
      this.router.navigate(['/login']);
    }else{
      const storedBooks = JSON.parse(localStorage.getItem('storedBooks') || '[]');
      this.storedBooks = storedBooks;
    }

  }

  saveEdit(book: any): void {

    console.log("estamos guardando los datos del guardar ");

    book.value = this.editingValue; // Guarda el valor editado en el libro
    book.editing = false;
    this.editingBook = null;

  }

  cancelEdit(): void {
    this.editingBook = null;
    this.editingValue = null; // Resetea el valor de edición
  }



formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + '%';
    }

    return `${value}`;
  }

  editBook(book: any): void {
    this.editingBook = book;
    this.editingValue = book.value; // Establece el valor actual del libro en edición
  }



  deleteBook(book: any): void {
    const index = this.storedBooks.indexOf(book);
    if (index !== -1) {
      this.storedBooks.splice(index, 1);
      localStorage.setItem('storedBooks', JSON.stringify(this.storedBooks));
    }
  }

  setRating(book: any, rating: number): void {
    book.rating = rating;
    // Guarda el valor de la calificación en localStorage o donde prefieras
  }

}
