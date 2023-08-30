import { Component } from '@angular/core';
import { ApiServiceService } from "../../service/api-service.service";
import { libro } from 'src/app/modelos/libro';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  topBooks: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  public bookIds!: any[];
  public coversIds: string[];
  selectedLibro: any | null = null;

  ngOnInit() {
    this.getTopBooks();

  }
  constructor(
    private apiServiceService: ApiServiceService
    ){
    this.bookIds = [
      'OL9155299M',
      'OL9117315M',
      'OL37468678M',
      'OL9199218M',
      'OL32186077M'
    ];
    this.coversIds = [];
  }


  getTopBooks() {
    const observables = this.bookIds.map(bookId =>
      this.apiServiceService.obtenerTopLibros(bookId)
    );

    forkJoin(observables).subscribe(
      (results: any[]) => {
        const transformedBooks = results.map(book => ({
          editorial: book.publishers ? book.publishers.join(', ') : 'N/A',
          title: book.title,
          isbn: book.isbn_13 ? book.isbn_13[0] : 'N/A',
          formatoFisico: book.physical_format || 'N/A',
          fechaPublicacion: book.publish_date ? book.publish_date : 'N/A',
          portada: book.covers ? this.apiServiceService.obtenerPortada(book.covers[0]) : '',
        }));


        this.topBooks = transformedBooks;
        this.loading = false;
        this.obtenerPortadasParaLibros();
      },
      error => {
        console.error('Error al obtener los libros:', error);
        this.loading = false;
        this.error = 'Ocurrió un error al obtener los libros.';
      }
    );
  }


  private obtenerPortadasParaLibros(): void {
    const observables = this.topBooks
      .filter((libro) => libro.covers)
      .map((libro) => this.apiServiceService.obtenerPortada(libro.covers[0]));

    if (observables.length === 0) return;

    forkJoin(observables).subscribe(
      (urls: string[]) => {
        this.topBooks.forEach((libro, index) => {
          if (libro.covers) { // Verifica si el libro tiene portadas
            libro.portada = observables[index];

          }
        });
      },
      (error: any) => {
        console.error('Error al obtener las portadas de los libros:', error);
      }
    );
  }

 openDetalleLibroModal(libro: any): void {
    this.selectedLibro = libro;

  }


}
