import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from "../../service/api-service.service";
import { libro } from 'src/app/modelos/libro';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public buscador: string = '';
  public librosBuscados: libro[] = [];
  selectedLibro: any | null = null;



  constructor(
    private apiServiceService: ApiServiceService
    ){
  }

  ngOnInit(): void {
     this.obtenerlibros(); // Llamar al método para obtener los libros al inicializar el componente

  }

  realizarBusqueda() {
    if (this.buscador && this.buscador.length >= 3) {
      this.obtenerlibros();
    } else {
      this.librosBuscados = [];
    }
  }

  public obtenerlibros(): void {
    this.apiServiceService.buscar(this.buscador).subscribe(
      (data: any) => {
        this.librosBuscados = data.docs.map((libroData: any) => {
          // console.log("Esto es de busqueda cuando se asignan parametros",libroData);
          return {
            idPortada: libroData.cover_i,
            editorial: libroData.publisher ? libroData.publisher.join(', ') : 'N/A',
            titulo: libroData.title,
            author_name: libroData.author_name ? libroData.author_name[0] : 'Unknown Author',
            isbn: libroData.isbn ? libroData.isbn[0] : 'N/A',
            formatoFisico: libroData.number_of_pages_median || 'N/A',
            first_publish_year: libroData.first_publish_year,
            portada: ''
          };
        });

        this.obtenerPortadasParaLibros();
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }


  private obtenerPortadasParaLibros(): void {
    const observables = this.librosBuscados
      .filter((libro) => libro.idPortada)
      .map((libro) => this.apiServiceService.obtenerPortada(libro.idPortada));

    if (observables.length === 0) return;

    forkJoin(observables).subscribe(
      (urls: string[]) => {
        this.librosBuscados.forEach((libro, index) => {
          if (libro.idPortada) {
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
