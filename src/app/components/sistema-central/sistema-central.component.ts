import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiServiceService } from '../../service/api-service.service';
interface Registro {
  filtro?: string;
}

@Component({
  selector: 'app-sistema-central',
  templateUrl: './sistema-central.component.html',
  styleUrls: ['./sistema-central.component.css']
})
export class SistemaCentralComponent {
  registros: Registro[] = [];
  mensajeError: string = '';
  registro: Registro = {};
  modoEdicion: boolean = true; // Indicador para el modo de edición
  libros: any[] = [];

  constructor(private router: Router, private apiService: ApiServiceService) {

  }

  ngOnInit(): void {
    if (sessionStorage.getItem('sesionIniciada') === "false") {
      this.router.navigate(['/login']);
    }
    this.mostrar();
  }

  autocompleteCentral(){
    // alert(this.registro.filtro);
    let filtro = {
      filtro: this.registro.filtro
    }
    this.apiService.autoCompleteCentral(filtro).subscribe(
      (response) => {
        this.libros = [];
        this.libros = response;
        
      },
      (error) => {
        console.error('Error al filtrar', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
  }

  mostrar(){
    
    this.apiService.mostrarCentral().subscribe(
      (response) => {
        this.libros = response;
        // console.log(this.libros);
        
      },
      (error) => {
        console.error('Error al filtrar', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
  }

  recuperarCentral(libro: any){

    let recuperar = {
      "universidad_id": libro.universidad_id,
      "universidad_libro_id": libro.universidad_libro_id
    };
    console.log("vamos a recuperar");
    
    this.apiService.recuperarCentral(recuperar).subscribe(
      (response) => {
        console.log(response);        
        
      },
      (error) => {
        console.error('Error al filtrar', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
  }

}
