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
      container.innerHTML = '';
      var pdfObject = document.createElement('object');
      pdfObject.style.width = '100%';
      pdfObject.style.height = '550pt';
      pdfObject.type = 'application/pdf';
      pdfObject.data = base64Data;
      container.appendChild(pdfObject);
    }
    window.open(base64Data, '_blank');
  }  

  
  // descargarPdf(base64Data: string): void {
  //   const blob = new Blob([base64Data], {type: 'application/pdf'});
  //   const link = document.createElement('a');
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = 'archivo.pdf';
  //   link.click();
  // }
  descargarPdf(base64Data: string): void {
    const blob = new Blob([base64Data], { type: 'application/pdf' });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    // Crea un objeto <object> para abrir el PDF en una nueva ventana
    const pdfObject = document.createElement('object');
    pdfObject.style.display = 'none'; // Oculta el objeto
    pdfObject.type = 'application/pdf';
    pdfObject.data = blobUrl;
  
    // Agrega el objeto al cuerpo del documento
    document.body.appendChild(pdfObject);
  
    // Abre el archivo en una nueva pestaña del navegador
    window.open(base64Data, '_blank');
  
    // Limpia el objeto después de abrirlo
    pdfObject.onload = () => {
      link.href = window.URL.createObjectURL(blob);
      // document.body.removeChild(pdfObject);
      link.download = blobUrl;
      link.click();
    };
    
  }

}
