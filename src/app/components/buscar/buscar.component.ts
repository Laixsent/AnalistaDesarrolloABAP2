// buscar.component.ts
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

  constructor(private apiServiceService: ApiServiceService) {}

  ngOnInit(): void {
    // this.obtenerlibros(); // Llamar al método para obtener los libros al inicializar el componente
  }

  public obtenerlibros(): void {
    this.apiServiceService.buscar(this.buscador).subscribe(
      (data: any) => {
        console.log(data.docs);
        this.librosBuscados = data.docs.map((libroData: any) => {
          return {
            idPortada: libroData.cover_i,
            titulo: libroData.title,
            author_name: libroData.author_name ? libroData.author_name[0] : 'Unknown Author',
            first_publish_year: libroData.first_publish_year,
            portada: ''
          };
        });

        this.obtenerPortadasParaLibros(); // Obtener la información de la portada para cada libro
      },
      error => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  private obtenerPortadasParaLibros(): void {
    // console.log(this.librosBuscados);
    const observables = this.librosBuscados
    .filter((libro) => libro.idPortada)
      .map((libro) => this.apiServiceService.obtenerPortada(libro.idPortada));

    // console.log(observables[0]);  
    if (observables.length === 0) return; // No hay portadas que obtener

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
}
