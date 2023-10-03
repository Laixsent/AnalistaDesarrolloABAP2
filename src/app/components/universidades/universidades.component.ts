import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-universidades',
  templateUrl: './universidades.component.html',
  styleUrls: ['./universidades.component.css']
})
export class UniversidadesComponent {
  libros: any[] = [];
  mensajeError: string = '';
  constructor(private router: Router, private apiService: ApiServiceService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('sesionIniciada') === "false") {
      this.router.navigate(['/login']);
    }    
    this.apiService.mostrarLibrosOtros().subscribe(
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

}
