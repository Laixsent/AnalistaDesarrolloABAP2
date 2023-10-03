import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ApiServiceService } from '../../service/api-service.service';
interface Registro {
  id?: string;
  protocolo?: string;
  nombre?: string;
  ip?: string;
  base?: string;
  ruta?: string;
}

@Component({
  selector: 'app-registrar-unis',
  templateUrl: './registrar-unis.component.html',
  styleUrls: ['./registrar-unis.component.css']
})
export class RegistrarUnisComponent {
  registros: Registro[] = [];
  mensajeError: string = '';
  registro: Registro = {};
  modoEdicion: boolean = true; // Indicador para el modo de edición

  constructor(private router: Router, private apiService: ApiServiceService) {

  }

  ngOnInit(): void {
    if (sessionStorage.getItem('sesionIniciada') === "false") {
      this.router.navigate(['/login']);
    }
    this.mostrar();
  }

  mostrar() {
    this.apiService.obtenerRutas().subscribe(
      (response) => {          
        console.log(response);
        this.registros = response.data;
      },
      (error) => {
        console.error('Error al obtener los libros', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
  }

  guardar() {
    // console.log(this.registro);
    this.apiService.registrarUniversidad(this.registro).subscribe(
      (response) => {
        this.registro = {};
        this.mostrar();
      },
      (error) => {
        console.error('Error al registrar', error);
        this.mensajeError = 'Error al registrar. Inténtalo de nuevo más tarde.';
      }
    );
    
  }

  editar(reg: any){
    if (reg) {      
      this.registro = {};
      this.registro = {... reg} as Registro      
      this.modoEdicion = false;
    }
  }

  cancelarEditar() {
    // Reiniciar el objeto libroForm y desactivar el modo de edición
    this.registro = {};
    this.modoEdicion = true;
  }

  actualizar(){
    this.apiService.actualizarUniversidad(this.registro).subscribe(
      (response) => {        
        this.registro = {};
        this.modoEdicion = true;
        this.mostrar();
      },
      (error) => {
        console.error('Error al actualizar', error);
        this.mensajeError = 'Error al actualizar. Inténtalo de nuevo más tarde.';
      }
    );
  }

  eliminar(reg: any) {
    if (reg) {      
      this.apiService.eliminarUniversidad({id: reg.id}).subscribe(
        (response) => {
          this.mostrar();
        },
        (error) => {
          console.error('Error al actualizar', error);
          this.mensajeError = 'Error al actualizar. Inténtalo de nuevo más tarde.';
        }
      );
    }
  }

}
