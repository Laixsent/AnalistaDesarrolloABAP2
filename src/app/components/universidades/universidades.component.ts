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
  endpointArray: any[] = [];

  constructor(private router: Router, private apiService: ApiServiceService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('sesionIniciada') === "false") {
      this.router.navigate(['/login']);
    }
    this.obtenerApis();    
    // this.mostrar();
  }

  obtenerApis(){
    this.apiService.obtenerRutas().subscribe(
      (response) => {          
        // console.log(response.data);
        for (const key in response.data) {
          let endpoint
          if(response.data[key].puerto){
            endpoint = response.data[key].protocolo+"://"+response.data[key].ip+":"+response.data[key].puerto+"/"+response.data[key].base+"/"+response.data[key].ruta+"/";            
          }else{
            endpoint = response.data[key].protocolo+"://"+response.data[key].ip+"/"+response.data[key].base+"/"+response.data[key].ruta;
          }
          // console.log(endpoint);
          this.endpointArray.push(endpoint);
        }
        for (let endpoint of this.endpointArray) {
          this.mostrar(endpoint);          
        }       
        console.log(this.libros);
      },
      (error) => {
        console.error('Error al obtener los libros', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
  }

  mostrar(endpoint: string){
    console.log(endpoint);    
    this.apiService.mostrarLibrosOtros(endpoint).subscribe(
      (response) => {       
        for (const iterator of response.data) {
          this.libros.push(iterator);
        }   
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

}
