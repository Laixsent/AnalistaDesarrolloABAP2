import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  @Input() libro: any;
  storedBooks: any[] = [];

  ngOnInit(): void {
    const storedBooks = JSON.parse(localStorage.getItem('storedBooks') || '[]');
    this.storedBooks = storedBooks;
  }

  editBook(book: any): void {
    // Implement your edit functionality here
  }

  deleteBook(book: any): void {
    const index = this.storedBooks.indexOf(book);
    if (index !== -1) {
      this.storedBooks.splice(index, 1);
      localStorage.setItem('storedBooks', JSON.stringify(this.storedBooks));
    }
  }
}
