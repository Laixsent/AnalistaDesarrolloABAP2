import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent {
  mensajeError: string = '';
  libros: any[] = [];

  constructor(private apiService: ApiServiceService) {}

  ngOnInit(): void {
    this.apiService.mostrarLibros().subscribe(
      (response) => {          
        console.log(response);
        this.libros = response.data;
      },
      (error) => {
        console.error('Error al obtener los libros', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
  }

  abrirPdf(base64Data: string): void {
    const container = document.getElementById('pdf-container'); 
  
      if (container) {
        // Limpiar cualquier contenido previo en el contenedor
    container.innerHTML = '';

    // Crear un objeto <object> para mostrar el PDF
    var pdfObject = document.createElement('object');
    pdfObject.style.width = '100%';
    pdfObject.style.height = '550pt';
    pdfObject.type = 'application/pdf';
    pdfObject.data = base64Data;

    // Agregar el objeto al contenedor del modal
    container.appendChild(pdfObject);
      }

  }  

  

//   function cargarPDFEnModal(base64) {
    
//     var containerPDF = document.getElementById('containerPDF');

//     // Limpiar cualquier contenido previo en el contenedor
//     containerPDF.innerHTML = '';

//     // Crear un objeto <object> para mostrar el PDF
//     var pdfObject = document.createElement('object');
//     pdfObject.style.width = '100%';
//     pdfObject.style.height = '550pt';
//     pdfObject.type = 'application/pdf';
//     pdfObject.data = base64;

//     // Agregar el objeto al contenedor del modal
//     containerPDF.appendChild(pdfObject);
// }
  
  
}
